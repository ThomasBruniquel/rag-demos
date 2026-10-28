import type { Locale } from "@/lib/i18n/config";

type Labels = Record<Locale, string>;

/**
 * Method families. Each family has its colour and its character silhouette
 * (components/characters). "classic" is the grey reference character.
 */
export const families = {
  search: { fr: "Recherche", en: "Retrieval" },
  structure: { fr: "Structure", en: "Structure" },
  verification: { fr: "Vérification", en: "Verification" },
  agents: { fr: "Agents", en: "Agents" },
  sovereignty: { fr: "Souveraineté", en: "Sovereignty" },
  multimodal: { fr: "Multimodal", en: "Multimodal" },
  classic: { fr: "Référence", en: "Baseline" },
} as const satisfies Record<string, Labels>;
export type Family = keyof typeof families;

export const badges = {
  recent: { fr: "Récent", en: "Recent" },
  proven: { fr: "Éprouvé", en: "Proven" },
} as const satisfies Record<string, Labels>;
export type Badge = keyof typeof badges;

// --- Catalogue filters (shared by the catalogue and the home page selector) ---

export const docTypes = {
  text: { fr: "Textes, pages web, contrats", en: "Text, web pages, contracts" },
  pdf: { fr: "PDF complexes (tableaux, scans, schémas)", en: "Complex PDFs (tables, scans, diagrams)" },
  data: { fr: "Données structurées (tables, bases)", en: "Structured data (tables, databases)" },
  media: { fr: "Audio et vidéo", en: "Audio and video" },
} as const satisfies Record<string, Labels>;
export type DocType = keyof typeof docTypes;

export const volumes = {
  small: { fr: "Quelques milliers de documents", en: "A few thousand documents" },
  medium: { fr: "Des dizaines de milliers de pages", en: "Tens of thousands of pages" },
  large: { fr: "Des millions d'éléments", en: "Millions of items" },
} as const satisfies Record<string, Labels>;
export type Volume = keyof typeof volumes;

export const constraints = {
  confidentiality: { fr: "Confidentialité", en: "Confidentiality" },
  budget: { fr: "Budget serré", en: "Tight budget" },
  time: { fr: "Délai court", en: "Short timeline" },
  reliability: { fr: "Fiabilité critique", en: "Accuracy is critical" },
} as const satisfies Record<string, Labels>;
export type Constraint = keyof typeof constraints;

export const sectors = {
  smb: { fr: "PME, tous secteurs", en: "SMEs, any sector" },
  legal: { fr: "Juridique", en: "Legal" },
  finance: { fr: "Finance et audit", en: "Finance and audit" },
  data: { fr: "Équipes data", en: "Data teams" },
  industry: { fr: "Industrie et maintenance", en: "Industry and maintenance" },
  saas: { fr: "SaaS et e-commerce", en: "SaaS and e-commerce" },
  insurance: { fr: "Assurance et qualité", en: "Insurance and quality" },
  regulated: { fr: "RH, banque, santé", en: "HR, banking, healthcare" },
  public: { fr: "Formation et collectivités", en: "Training and public sector" },
} as const satisfies Record<string, Labels>;
export type Sector = keyof typeof sectors;

// --- Stack keywords (D-022): the badges shown on cards, project pages and the Skills page ---
// Source of truth: the keyword matrix in docs/02-catalogue-rag.md. Each demo.yaml lists
// keyword ids per category; labels are text only (no brand logos).

export const stackCategories = {
  cloud: { fr: "Cloud / exécution", en: "Cloud / runtime" },
  framework: { fr: "Framework", en: "Framework" },
  models: { fr: "Modèles", en: "Models" },
  vectorStores: { fr: "Base vectorielle", en: "Vector store" },
  integrations: { fr: "Intégrations", en: "Integrations" },
  compliance: { fr: "Conformité", en: "Compliance" },
} as const satisfies Record<string, Labels>;
export type StackCategory = keyof typeof stackCategories;

/** One-word names, for the badge rows of the cards (one line each). */
export const stackCategoriesShort = {
  cloud: { fr: "Cloud", en: "Cloud" },
  framework: { fr: "Framework", en: "Framework" },
  models: { fr: "Modèles", en: "Models" },
  vectorStores: { fr: "Vecteurs", en: "Vectors" },
  integrations: { fr: "Intégrations", en: "Integrations" },
  compliance: { fr: "Conformité", en: "Compliance" },
} as const satisfies Record<StackCategory, Labels>;

const same = (label: string): Labels => ({ fr: label, en: label });

export const keywords = {
  cloud: {
    aws: same("AWS"),
    azure: same("Azure"),
    gcp: same("GCP"),
    local: { fr: "Poste local (Docker, GPU)", en: "Local (Docker, GPU)" },
    "on-premises": { fr: "Sur site", en: "On-premises" },
  },
  framework: {
    langchain: same("LangChain"),
    langgraph: same("LangGraph"),
    llamaindex: same("LlamaIndex"),
    haystack: same("Haystack"),
    lightrag: same("LightRAG"),
    "no-framework": { fr: "Sans framework (SDK natifs)", en: "No framework (native SDKs)" },
  },
  models: {
    claude: same("Claude"),
    gpt: same("GPT"),
    mistral: same("Mistral"),
    llama: same("Llama"),
    gemini: same("Gemini"),
    cohere: same("Cohere"),
    granite: same("Granite"),
    whisper: same("Whisper"),
  },
  vectorStores: {
    "s3-vectors": same("S3 Vectors"),
    weaviate: same("Weaviate"),
    faiss: same("FAISS"),
    pgvector: same("pgvector"),
    qdrant: same("Qdrant"),
    neo4j: same("Neo4j"),
    "azure-ai-search": same("Azure AI Search"),
  },
  integrations: {
    "web-pages": { fr: "Pages web publiques", en: "Public web pages" },
    "pdf-upload": { fr: "Dépôt de PDF", en: "PDF upload" },
    athena: same("Athena"),
    glue: same("Glue"),
    "lake-formation": same("Lake Formation"),
    sharepoint: same("SharePoint / Microsoft 365"),
    "google-drive": same("Google Drive"),
  },
  compliance: {
    rgpd: { fr: "RGPD", en: "GDPR" },
    "ai-act": same("AI Act"),
    sovereignty: { fr: "Souveraineté", en: "Data sovereignty" },
    "data-governance": { fr: "Gouvernance des données", en: "Data governance" },
    guardrails: { fr: "Garde-fous, passage à un humain", en: "Guardrails, human handoff" },
  },
} as const satisfies Record<StackCategory, Record<string, Labels>>;

export type Keyword = { [C in StackCategory]: keyof (typeof keywords)[C] & string }[StackCategory];

/** Every keyword with its category, in display order. */
export function allKeywords(): { id: Keyword; category: StackCategory; labels: Labels }[] {
  return (Object.keys(keywords) as StackCategory[]).flatMap((category) =>
    Object.entries(keywords[category]).map(([id, labels]) => ({ id: id as Keyword, category, labels: labels as Labels })),
  );
}

export const keysOf =<T extends object>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];
