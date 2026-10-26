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
  research: { fr: "Recherche et pharma", en: "Research and pharma" },
  industry: { fr: "Industrie et maintenance", en: "Industry and maintenance" },
  saas: { fr: "SaaS et e-commerce", en: "SaaS and e-commerce" },
  insurance: { fr: "Assurance et qualité", en: "Insurance and quality" },
  regulated: { fr: "RH, banque, santé", en: "HR, banking, healthcare" },
  public: { fr: "Formation et collectivités", en: "Training and public sector" },
} as const satisfies Record<string, Labels>;
export type Sector = keyof typeof sectors;

export const keysOf = <T extends object>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];
