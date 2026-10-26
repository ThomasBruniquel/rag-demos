/*
 * "Data engineering for AI": the public version of docs/04. A RAG pipeline in
 * seven stages, what breaks when each is neglected, the AWS services used,
 * then the four domains of the AWS Data Engineer certification.
 */

const fr = {
  eyebrow: "Le pipeline avant le modèle",
  claim: "Le modèle ne voit que ce que le pipeline lui donne.",
  claimText: "Un passage mal extrait, un document périmé ou un droit d'accès oublié produit une mauvaise réponse, quel que soit le modèle. La qualité d'un RAG se joue en amont.",
  stagesTitle: "Sept étapes, de la source à la réponse",
  risk: "Si c'est négligé :",
  stages: [
    { label: "Collecter", text: "Rassembler les documents là où ils vivent : partages, outils métier, bases.", risk: "Des documents manquent, l'assistant répond « je ne sais pas » à tort.", aws: ["S3", "EventBridge"] },
    { label: "Extraire", text: "Texte, tableaux, figures, audio : chaque format a son extracteur.", risk: "Tableaux aplatis, colonnes mélangées : les chiffres deviennent faux.", aws: ["Textract", "Transcribe", "Lambda"] },
    { label: "Découper et enrichir", text: "Passages cohérents, avec titre, date, auteur et droits d'accès.", risk: "Passages coupés au milieu d'une phrase, sans contexte ni filtre possible.", aws: ["Lambda", "Glue"] },
    { label: "Vectoriser", text: "Calculer les embeddings, en lot quand le volume le permet.", risk: "Coût multiplié, ou index incohérent après un changement de modèle.", aws: ["Bedrock"] },
    { label: "Stocker et indexer", text: "Vecteurs, textes et métadonnées, chacun au bon endroit.", risk: "Base surdimensionnée et coûteuse, ou recherche lente.", aws: ["S3 Vectors", "Aurora pgvector", "DynamoDB"] },
    { label: "Mettre à jour", text: "Ajouts, modifications, suppressions : sans tout recalculer.", risk: "Réponses tirées d'une version périmée ou d'un document supprimé.", aws: ["Step Functions", "EventBridge Scheduler", "SQS"] },
    { label: "Gouverner et surveiller", text: "Droits, chiffrement, traçabilité, coûts et qualité suivis dans le temps.", risk: "Fuite de données entre services, facture qui dérive sans alerte.", aws: ["IAM", "KMS", "Lake Formation", "CloudWatch"] },
  ],
  domainsEyebrow: "Certification AWS Data Engineer",
  domainsTitle: "Quatre domaines, appliqués au RAG",
  domainsLead: "Les quatre domaines de la certification AWS Certified Data Engineer – Associate (en préparation) couvrent exactement ce qu'il faut pour un RAG fiable.",
  domains: [
    { name: "Ingestion et transformation", share: "34 %", text: "Charger en lot ou en continu, découper, vectoriser, orchestrer et rejouer.", demos: ["04", "05", "09"] },
    { name: "Gestion des stockages", share: "26 %", text: "Choisir où ranger vecteurs, textes et métadonnées ; formats, partitions, catalogue.", demos: ["02", "04"] },
    { name: "Opérations et support", share: "22 %", text: "Superviser les pipelines, gérer les erreurs, suivre qualité et coûts.", demos: ["04", "07"] },
    { name: "Sécurité et gouvernance", share: "18 %", text: "Qui voit quel document, masquage des données personnelles, chiffrement, traçabilité.", demos: ["04", "08"] },
  ],
  domainsDemos: "Démos :",
  servicesTitle: "Les services AWS de chaque démo",
  servicesLead: "Chaque démo justifie ses services : rien n'est ajouté pour la vitrine.",
  principlesTitle: "Règles suivies dans tous les pipelines",
  principles: [
    "Rejouable : relancer une ingestion donne le même résultat, sans doublon.",
    "Incrémental : seuls les documents nouveaux ou modifiés sont retraités.",
    "Mesuré : volumes, durées et coût de chaque étape sont publiés sur la page de la démo.",
    "Économe : services sans coût fixe, journaux à durée de conservation limitée.",
    "Décrit en code : toute l'infrastructure est en Terraform, dans le dépôt public.",
  ],
  cta: { title: "Vos données ne sont pas prêtes pour l'IA ?", text: "C'est souvent là que tout se joue. Parlons de vos sources et de leur mise à jour.", contact: "Discuter d'un projet", demos: "Voir les démos" },
};

const en: typeof fr = {
  eyebrow: "The pipeline before the model",
  claim: "The model only sees what the pipeline feeds it.",
  claimText: "A badly extracted passage, an outdated document or a forgotten access right leads to a wrong answer, whatever the model. RAG quality is decided upstream.",
  stagesTitle: "Seven stages, from source to answer",
  risk: "If neglected:",
  stages: [
    { label: "Collect", text: "Gather documents where they live: shared drives, business tools, databases.", risk: "Documents go missing; the assistant wrongly answers \"I don't know\".", aws: ["S3", "EventBridge"] },
    { label: "Extract", text: "Text, tables, figures, audio: each format has its own extractor.", risk: "Flattened tables, mixed-up columns: the figures turn wrong.", aws: ["Textract", "Transcribe", "Lambda"] },
    { label: "Chunk and enrich", text: "Coherent passages, with title, date, author and access rights.", risk: "Passages cut mid-sentence, with no context and nothing to filter on.", aws: ["Lambda", "Glue"] },
    { label: "Embed", text: "Compute embeddings, in batch when the volume allows.", risk: "Costs multiply, or the index breaks after a model change.", aws: ["Bedrock"] },
    { label: "Store and index", text: "Vectors, text and metadata, each in the right place.", risk: "An oversized, costly database, or slow search.", aws: ["S3 Vectors", "Aurora pgvector", "DynamoDB"] },
    { label: "Update", text: "Additions, edits, deletions: without recomputing everything.", risk: "Answers drawn from an outdated version or a deleted document.", aws: ["Step Functions", "EventBridge Scheduler", "SQS"] },
    { label: "Govern and monitor", text: "Access rights, encryption, audit trail, costs and quality tracked over time.", risk: "Data leaking between teams, a bill drifting with no alert.", aws: ["IAM", "KMS", "Lake Formation", "CloudWatch"] },
  ],
  domainsEyebrow: "AWS Data Engineer certification",
  domainsTitle: "Four domains, applied to RAG",
  domainsLead: "The four domains of the AWS Certified Data Engineer – Associate exam (in preparation) cover exactly what a reliable RAG system needs.",
  domains: [
    { name: "Ingestion and transformation", share: "34%", text: "Load in batch or streaming, chunk, embed, orchestrate and replay.", demos: ["04", "05", "09"] },
    { name: "Data store management", share: "26%", text: "Decide where vectors, text and metadata live; formats, partitions, catalogue.", demos: ["02", "04"] },
    { name: "Operations and support", share: "22%", text: "Monitor pipelines, handle errors, track quality and costs.", demos: ["04", "07"] },
    { name: "Security and governance", share: "18%", text: "Who sees which document, masking personal data, encryption, audit trail.", demos: ["04", "08"] },
  ],
  domainsDemos: "Demos:",
  servicesTitle: "The AWS services behind each demo",
  servicesLead: "Every demo justifies its services: nothing is added for show.",
  principlesTitle: "Rules followed in every pipeline",
  principles: [
    "Replayable: rerunning an ingestion gives the same result, with no duplicates.",
    "Incremental: only new or changed documents are processed again.",
    "Measured: volumes, durations and the cost of each stage are published on the demo page.",
    "Frugal: no fixed-cost services, logs with limited retention.",
    "Written as code: all infrastructure is Terraform, in the public repository.",
  ],
  cta: { title: "Is your data not ready for AI?", text: "That is often where it all happens. Let's talk about your sources and how they change.", contact: "Discuss a project", demos: "See the demos" },
};

export const dataEngineering = { fr, en };
