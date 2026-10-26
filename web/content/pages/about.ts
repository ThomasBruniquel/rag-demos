/*
 * About page. Facts only: the detailed career path lives on LinkedIn.
 */

const fr = {
  eyebrow: "À propos",
  bio: [
    "Développeur Python confirmé, je conçois des assistants IA qui répondent à partir des documents d'une entreprise, et les pipelines de données qui les alimentent, sur AWS.",
    "Ce site est mon portfolio : neuf situations clients, chacune construite, mesurée et chiffrée, avec le code en accès libre.",
  ],
  conviction: "Un RAG utile est d'abord un bon pipeline de données. Et une réponse, ça se mesure.",
  proofsTitle: "Ce que vous pouvez vérifier",
  proofs: [
    { title: "Le code", text: "Chaque démo, son infrastructure et ses tests sont publics sur GitHub.", link: "github" },
    { title: "Les mesures", text: "Chaque démo publie ses scores d'évaluation et son coût réel.", link: "demos" },
    { title: "Le parcours", text: "Expériences et recommandations sur LinkedIn.", link: "linkedin" },
  ] as { title: string; text: string; link: "github" | "demos" | "linkedin" }[],
  linkLabels: { github: "Voir le dépôt", demos: "Voir les démos", linkedin: "Voir le profil" },
  skillsTitle: "Boîte à outils",
  skills: [
    { group: "RAG et modèles", items: ["AWS Bedrock", "Mistral", "OpenAI", "LangGraph", "LlamaIndex", "Recherche hybride", "Reranking", "Évaluation (Ragas)"] },
    { group: "Données sur AWS", items: ["S3 et S3 Vectors", "Lambda", "Step Functions", "Glue", "Athena", "Lake Formation", "DynamoDB", "Aurora pgvector"] },
    { group: "Développement", items: ["Python", "FastAPI", "pytest", "uv et ruff", "Terraform", "TypeScript", "Next.js"] },
  ],
  factsTitle: "En bref",
  facts: [
    { label: "Certification", value: "AWS Certified Data Engineer – Associate (en préparation)" },
    { label: "Langues", value: "Français, anglais" },
    { label: "Missions", value: "À distance, en freelance" },
  ],
  cta: { title: "Parlons de vos documents", text: "Quelques lignes suffisent pour un premier avis.", contact: "Me contacter", services: "Voir les offres" },
};

const en: typeof fr = {
  eyebrow: "About",
  bio: [
    "An experienced Python developer, I build AI assistants that answer from a company's own documents, and the data pipelines that feed them, on AWS.",
    "This site is my portfolio: nine client scenarios, each one built, measured and costed, with the code open to all.",
  ],
  conviction: "A useful RAG system starts with a sound data pipeline. And an answer can be measured.",
  proofsTitle: "What you can check",
  proofs: [
    { title: "The code", text: "Every demo, its infrastructure and its tests are public on GitHub.", link: "github" },
    { title: "The measurements", text: "Every demo publishes its evaluation scores and real running cost.", link: "demos" },
    { title: "The track record", text: "Experience and recommendations on LinkedIn.", link: "linkedin" },
  ],
  linkLabels: { github: "See the repository", demos: "See the demos", linkedin: "See the profile" },
  skillsTitle: "Toolbox",
  skills: [
    { group: "RAG and models", items: ["AWS Bedrock", "Mistral", "OpenAI", "LangGraph", "LlamaIndex", "Hybrid search", "Reranking", "Evaluation (Ragas)"] },
    { group: "Data on AWS", items: ["S3 and S3 Vectors", "Lambda", "Step Functions", "Glue", "Athena", "Lake Formation", "DynamoDB", "Aurora pgvector"] },
    { group: "Development", items: ["Python", "FastAPI", "pytest", "uv and ruff", "Terraform", "TypeScript", "Next.js"] },
  ],
  factsTitle: "In short",
  facts: [
    { label: "Certification", value: "AWS Certified Data Engineer – Associate (in preparation)" },
    { label: "Languages", value: "French, English" },
    { label: "Missions", value: "Remote, as a freelancer" },
  ],
  cta: { title: "Let's talk about your documents", text: "A few lines are enough for a first opinion.", contact: "Get in touch", services: "See the services" },
};

export const about = { fr, en };
