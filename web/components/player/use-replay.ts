"use client";

import { useEffect, useRef, useState } from "react";
import { idleAnswer, reduceAnswer, runningAnswer, type AnswerState } from "@/lib/player/state";
import type { Recording } from "@/lib/player/types";

/** Replay speeds: real time, twice as fast, or everything at once. */
export const speeds = [1, 2, Infinity] as const;
export type Speed = (typeof speeds)[number];

/**
 * Re-emits the events of a recording with their original spacing (`t`),
 * scaled by `speed`. A new `run` number (re)starts the replay; changing the
 * speed applies from the next frame. Frames pause in a hidden tab, and so
 * does the replay.
 */
export function useReplay(recording: Recording | null, run: number, speed: Speed): AnswerState {
  const [state, setState] = useState<AnswerState>(idleAnswer);
  const speedRef = useRef<Speed>(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (!recording || run === 0) return;
    const events = recording.events;
    let current = runningAnswer;
    let index = 0;
    let elapsed = 0;
    let last: number | null = null;
    let frame = 0;

    const tick = (now: number) => {
      const step = last === null ? 0 : now - last;
      last = now;
      elapsed = speedRef.current === Infinity ? Infinity : elapsed + step * speedRef.current;
      let next = current;
      while (index < events.length && events[index].t <= elapsed) next = reduceAnswer(next, events[index++]);
      if (next !== current) {
        current = next;
        setState(current);
      }
      if (index < events.length) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame((now) => {
      setState(runningAnswer);
      tick(now);
    });
    return () => cancelAnimationFrame(frame);
  }, [recording, run]);

  return state;
}
