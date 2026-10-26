import type { Source } from "@/components/pages/blocks";

/*
 * "What is RAG?" page. Short texts, each claim backed by a numbered source.
 * Sources checked on 2026-10-26. `see` points to the demo or method page
 * where the idea is put to work.
 */

type See = { demo: string } | { method: string } | { page: "demos" };

const sources: Source[] = [
  {
    authors: "Lewis et al. (Facebook AI Research)",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    date: "2020",
    url: "https://arxiv.org/abs/2005.11401",
  },
  {
    authors: "Gao et al.",
    title: "Retrieval-Augmented Generation for Large Language Models: A Survey",
    date: "2023",
    url: "https://arxiv.org/abs/2312.10997",
  },
  {
    authors: "Liu et al.",
    title: "Lost in the Middle: How Language Models Use Long Contexts",
    date: "2023",
    url: "https://arxiv.org/abs/2307.03172",
  },
  {
    authors: "Anthropic",
    title: "Introducing Contextual Retrieval",
    date: "2024",
    url: "https://www.anthropic.com/news/contextual-retrieval",
  },
  {
    authors: "Joren et al.",
    title: "Sufficient Context: A New Lens on Retrieval Augmented Generation Systems",
    date: "2024",
    url: "https://arxiv.org/abs/2411.06037",
  },
  {
    authors: "Es et al.",
    title: "Ragas: Automated Evaluation of Retrieval Augmented Generation",
    date: "2023",
    url: "https://arxiv.org/abs/2309.15217",
  },
  {
    authors: "Singh et al.",
    title: "Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG",
    date: "2025, rev. 2026",
    url: "https://arxiv.org/abs/2501.09136",
  },
];

const fr = {
  eyebrow: "Comprendre le RAG",
  problem: {
    title: "Seul, un modèle d'IA ne connaît pas vos documents",
    items: [
      { title: "Il ignore vos données", text: "Il a appris sur des textes publics, arrêtés à une date donnée. Vos contrats, procédures et rapports n'en font pas partie." },
      { title: "Il comble les trous", text: "Faute d'information, il produit une réponse plausible plutôt qu'un « je ne sais pas »." },
      { title: "Il ne cite rien", text: "Sans source, impossible de vérifier une réponse avant de s'en servir." },
    ],
    answer:
      "Le RAG (retrieval-augmented generation, ou génération augmentée par la recherche) place une recherche documentaire devant le modèle : il répond à partir des passages retrouvés, et les cite.",
  },
  circuits: {
    title: "Deux circuits",
    lead: "Le premier prépare vos documents à l'avance. Le second répond à chaque question en quelques secondes.",
    indexing: {
      label: "Préparation",
      when: "Une fois, puis à chaque mise à jour",
      steps: [
        { label: "Collecter", text: "PDF, pages web, tickets, bases de données, vidéos." },
        { label: "Extraire", text: "Texte, tableaux et figures ; OCR pour les scans." },
        { label: "Découper", text: "En passages de quelques paragraphes, avec leur contexte." },
        { label: "Indexer", text: "Chaque passage devient un vecteur qui capture son sens." },
      ],
    },
    answering: {
      label: "Réponse",
      when: "À chaque question",
      steps: [
        { label: "Question", text: "Posée en langage courant." },
        { label: "Recherche", text: "Par le sens et par les mots-clés, en parallèle." },
        { label: "Reclassement", text: "Un second modèle garde les passages vraiment utiles." },
        { label: "Réponse sourcée", text: "Rédigée à partir de ces passages, chacun cité." },
      ],
    },
  },
  glossary: {
    title: "Six mots pour suivre une discussion technique",
    items: [
      { term: "Passage (chunk)", text: "Morceau de document de quelques paragraphes : l'unité que l'on retrouve et que l'on cite." },
      { term: "Embedding", text: "Suite de nombres qui représente le sens d'un texte. Deux textes proches ont des vecteurs proches." },
      { term: "Base vectorielle", text: "Index qui retrouve en quelques millisecondes les passages les plus proches d'une question." },
      { term: "Recherche hybride", text: "Recherche par le sens, combinée à une recherche par mots exacts (références, noms propres)." },
      { term: "Reranker", text: "Modèle qui relit les meilleurs candidats et les reclasse, plus finement que la première recherche." },
      { term: "Fenêtre de contexte", text: "Ce que le modèle lit en une fois : la question, les consignes et les passages retrouvés." },
    ],
  },
  research: {
    eyebrow: "État de l'art",
    title: "Ce que montre la recherche récente",
    lead: "Cinq résultats publiés qui guident la construction d'un RAG fiable, et où les voir à l'œuvre sur ce site.",
    seeLabel: "Sur ce site :",
    items: [
      {
        key: "−67 % d'échecs",
        title: "Chercher de deux façons, puis reclasser",
        text: "Ajouter à chaque passage une phrase de contexte, combiner recherche par le sens et par mots-clés, puis reclasser : 67 % d'échecs de recherche en moins dans les tests publiés.",
        source: [4],
        see: { demo: "02" } as See,
      },
      {
        key: "Perdu au milieu",
        title: "Moins de passages, mieux choisis",
        text: "Les modèles exploitent mal une information noyée au milieu d'un long contexte. Quelques passages pertinents valent mieux que tout le corpus.",
        source: [3],
        see: { method: "cag" } as See,
      },
      {
        key: "Contexte suffisant",
        title: "Savoir dire « je ne sais pas »",
        text: "Quand les passages ne suffisent pas, les grands modèles répondent souvent faux au lieu de s'abstenir. Il faut le vérifier avant de répondre.",
        source: [5],
        see: { method: "groundedness-check" } as See,
      },
      {
        key: "Évaluation",
        title: "Mesurer plutôt que deviner",
        text: "Fidélité aux sources, pertinence de la réponse, pertinence des passages : des métriques automatiques permettent de comparer deux réglages.",
        source: [6],
        see: { page: "demos" } as See,
      },
      {
        key: "RAG agentique",
        title: "Du RAG simple au RAG qui raisonne",
        text: "Après le RAG « naïf », les architectures sont devenues modulaires, puis agentiques : le système décide quand chercher, où, et s'il doit recommencer.",
        source: [2, 7],
        see: { demo: "06" } as See,
      },
    ],
  },
  choose: {
    title: "RAG ou autre chose ?",
    lead: "Dire quand un RAG n'est pas la bonne réponse fait partie du travail.",
    columns: ["Votre situation", "La bonne approche", "Pourquoi"],
    rows: [
      { situation: "Quelques dizaines de pages, qui changent peu", answer: "Tout donner au modèle (CAG)", why: "Pas d'index à maintenir ; le cache rend les questions suivantes moins chères.", rag: false, see: { method: "cag" } as See },
      { situation: "Des milliers de documents, mis à jour souvent", answer: "RAG", why: "Seuls les passages utiles sont lus : précision et coût maîtrisés.", rag: true, see: { page: "demos" } as See },
      { situation: "Un ton, un format ou un jargon à respecter", answer: "Ajustement du modèle (fine-tuning)", why: "Il change la façon d'écrire, pas les connaissances. Souvent combiné à un RAG.", rag: false, see: null },
      { situation: "Retrouver un document, pas une réponse", answer: "Moteur de recherche", why: "Plus simple et moins cher quand personne n'a besoin d'une synthèse.", rag: false, see: null },
      { situation: "Des chiffres dans une base de données", answer: "Text-to-SQL", why: "Le modèle écrit la requête, la base fait le calcul : pas d'erreur d'arithmétique.", rag: false, see: { demo: "04" } as See },
    ],
  },
  limits: {
    title: "Les limites à connaître",
    items: [
      "Documents mal extraits, réponses médiocres : l'extraction compte autant que le modèle.",
      "Les droits d'accès doivent suivre les documents : un passage confidentiel ne doit pas apparaître dans la réponse d'un autre service.",
      "Un RAG s'entretient : documents ajoutés ou retirés, évaluation régulière.",
      "Chaque question a un coût. Il se mesure, et se réduit : cache, petits modèles, moins de passages.",
    ],
  },
  sourcesTitle: "Sources",
  cta: {
    title: "Voir ces idées en action",
    text: "Neuf démos, chacune centrée sur une méthode, comparée au RAG classique avec des scores mesurés.",
    demos: "Tester les démos",
    methods: "Parcourir les méthodes",
  },
};

const en: typeof fr = {
  eyebrow: "Understanding RAG",
  problem: {
    title: "On its own, an AI model doesn't know your documents",
    items: [
      { title: "It has never seen your data", text: "It learned from public text, frozen at a given date. Your contracts, procedures and reports were not part of it." },
      { title: "It fills the gaps", text: "Missing information gets a plausible answer rather than an \"I don't know\"." },
      { title: "It cites nothing", text: "Without a source, there is no way to check an answer before acting on it." },
    ],
    answer:
      "RAG (retrieval-augmented generation) puts a document search in front of the model: it answers from the passages it found, and cites them.",
  },
  circuits: {
    title: "Two circuits",
    lead: "The first prepares your documents ahead of time. The second answers each question in a few seconds.",
    indexing: {
      label: "Preparation",
      when: "Once, then on every update",
      steps: [
        { label: "Collect", text: "PDFs, web pages, tickets, databases, videos." },
        { label: "Extract", text: "Text, tables and figures; OCR for scans." },
        { label: "Split", text: "Into passages of a few paragraphs, with their context." },
        { label: "Index", text: "Each passage becomes a vector that captures its meaning." },
      ],
    },
    answering: {
      label: "Answer",
      when: "On every question",
      steps: [
        { label: "Question", text: "Asked in plain language." },
        { label: "Search", text: "By meaning and by keywords, side by side." },
        { label: "Rerank", text: "A second model keeps the passages that really help." },
        { label: "Answer with sources", text: "Written from those passages, each one cited." },
      ],
    },
  },
  glossary: {
    title: "Six words to follow a technical conversation",
    items: [
      { term: "Chunk", text: "A piece of a document, a few paragraphs long: the unit that gets retrieved and cited." },
      { term: "Embedding", text: "A list of numbers representing the meaning of a text. Similar texts get similar vectors." },
      { term: "Vector database", text: "An index that finds the passages closest to a question in milliseconds." },
      { term: "Hybrid search", text: "Search by meaning, combined with exact-word search (references, names)." },
      { term: "Reranker", text: "A model that rereads the top candidates and reorders them, more carefully than the first search." },
      { term: "Context window", text: "What the model reads at once: the question, the instructions and the retrieved passages." },
    ],
  },
  research: {
    eyebrow: "State of the art",
    title: "What recent research shows",
    lead: "Five published findings that shape a reliable RAG system, and where to see them at work on this site.",
    seeLabel: "On this site:",
    items: [
      {
        key: "67% fewer failures",
        title: "Search two ways, then rerank",
        text: "Give each passage a line of context, combine meaning and keyword search, then rerank: 67% fewer failed retrievals in the published tests.",
        source: [4],
        see: { demo: "02" },
      },
      {
        key: "Lost in the middle",
        title: "Fewer passages, better chosen",
        text: "Models make poor use of information buried in the middle of a long context. A few relevant passages beat the whole corpus.",
        source: [3],
        see: { method: "cag" },
      },
      {
        key: "Sufficient context",
        title: "Knowing when to say \"I don't know\"",
        text: "When the passages are not enough, large models often answer wrongly instead of abstaining. That has to be checked before answering.",
        source: [5],
        see: { method: "groundedness-check" },
      },
      {
        key: "Evaluation",
        title: "Measure, don't guess",
        text: "Faithfulness to sources, answer relevance, passage relevance: automatic metrics make it possible to compare two settings.",
        source: [6],
        see: { page: "demos" },
      },
      {
        key: "Agentic RAG",
        title: "From simple RAG to RAG that reasons",
        text: "After \"naive\" RAG, architectures became modular, then agentic: the system decides when to search, where, and whether to try again.",
        source: [2, 7],
        see: { demo: "06" },
      },
    ],
  },
  choose: {
    title: "RAG or something else?",
    lead: "Saying when RAG is not the answer is part of the job.",
    columns: ["Your situation", "The right approach", "Why"],
    rows: [
      { situation: "A few dozen pages that rarely change", answer: "Give it all to the model (CAG)", why: "No index to maintain; caching makes follow-up questions cheaper.", rag: false, see: { method: "cag" } },
      { situation: "Thousands of documents, updated often", answer: "RAG", why: "Only the useful passages are read: accuracy and cost under control.", rag: true, see: { page: "demos" } },
      { situation: "A tone, format or jargon to follow", answer: "Fine-tuning", why: "It changes how the model writes, not what it knows. Often combined with RAG.", rag: false, see: null },
      { situation: "Finding a document, not an answer", answer: "A search engine", why: "Simpler and cheaper when nobody needs a summary.", rag: false, see: null },
      { situation: "Figures in a database", answer: "Text-to-SQL", why: "The model writes the query, the database does the maths: no arithmetic slips.", rag: false, see: { demo: "04" } },
    ],
  },
  limits: {
    title: "Limits worth knowing",
    items: [
      "Poorly extracted documents mean poor answers: extraction matters as much as the model.",
      "Access rights must follow the documents: a confidential passage must not show up in another team's answer.",
      "A RAG system needs upkeep: documents added or removed, regular evaluation.",
      "Every question has a cost. It can be measured, and reduced: caching, smaller models, fewer passages.",
    ],
  },
  sourcesTitle: "Sources",
  cta: {
    title: "See these ideas at work",
    text: "Nine demos, each built around one method and compared with classic RAG on measured scores.",
    demos: "Try the demos",
    methods: "Browse the methods",
  },
};

export const whatIsRag = { fr, en, sources };
export type { See };
