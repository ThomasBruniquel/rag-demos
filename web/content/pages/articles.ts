/*
 * Articles page. Until the first write-up is out, it lists the planned
 * articles: one per demo, published when the demo goes live.
 */

const fr = {
  eyebrow: "Programme de publication",
  plannedTitle: "Neuf articles prévus, un par démo",
  plannedLead: "Chaque article sort avec sa démo. Il raconte la méthode, ce qui a été écarté, et les mesures face au RAG classique.",
  soon: "À paraître",
  versus: "face au RAG classique",
  outline: ["Le problème client", "La méthode et ses alternatives", "Les mesures", "Le coût"],
  outlineTitle: "Chaque article suit le même plan",
};

const en: typeof fr = {
  eyebrow: "Publishing plan",
  plannedTitle: "Nine planned articles, one per demo",
  plannedLead: "Each article comes out with its demo. It covers the method, what was ruled out, and the measurements against classic RAG.",
  soon: "Coming soon",
  versus: "versus classic RAG",
  outline: ["The client problem", "The method and its alternatives", "The measurements", "The cost"],
  outlineTitle: "Every article follows the same outline",
};

export const articles = { fr, en };
