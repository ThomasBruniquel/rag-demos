/*
 * Services page: four mission formats (same steps as the home page process),
 * working principles and FAQ. No prices on the site: each project is quoted
 * after a first call.
 */

const fr = {
  eyebrow: "Travailler ensemble",
  offersTitle: "Quatre formats de mission",
  deliverables: "Livrables",
  youProvide: "De votre côté :",
  fit: "Pour vous si :",
  offers: [
    {
      name: "Cadrage",
      duration: "2 à 3 jours",
      fit: "Vous avez un besoin, mais pas encore de méthode ni de budget.",
      deliverables: [
        "Analyse d'un échantillon de vos documents et de 20 à 30 vraies questions",
        "Méthode et architecture recommandées, avec les alternatives écartées",
        "Coût de mise en place et coût mensuel chiffrés",
      ],
      youProvide: "Un échantillon de documents et une personne qui connaît le métier.",
    },
    {
      name: "Prototype",
      duration: "1 à 2 semaines",
      fit: "Vous voulez voir le résultat sur vos documents avant d'investir.",
      deliverables: [
        "Un RAG qui fonctionne sur vos documents, testable par vos équipes",
        "Un jeu d'évaluation et les premiers scores mesurés",
        "Le code, documenté, dans votre dépôt",
      ],
      youProvide: "Les documents du périmètre et des retours sur les réponses.",
    },
    {
      name: "Mise en production",
      duration: "3 à 6 semaines",
      fit: "Le prototype convainc : il faut le rendre fiable, sûr et maintenable.",
      deliverables: [
        "Infrastructure en Terraform sur votre compte AWS",
        "Pipeline d'ingestion et de mise à jour automatique",
        "Droits d'accès, chiffrement, journalisation, suivi des coûts et de la qualité",
      ],
      youProvide: "Un accès à votre compte cloud et un interlocuteur technique.",
    },
    {
      name: "Audit et amélioration",
      duration: "1 à 3 semaines",
      fit: "Vous avez déjà un RAG, mais ses réponses déçoivent ou coûtent trop cher.",
      deliverables: [
        "Mesure de la qualité actuelle sur vos vraies questions",
        "Diagnostic : extraction, découpage, recherche, consignes au modèle",
        "Améliorations priorisées, mesurées avant et après",
      ],
      youProvide: "Un accès au système existant et à quelques exemples de questions.",
    },
  ],
  principlesTitle: "Comment je travaille",
  principles: [
    { title: "Mesuré", text: "Chaque choix est évalué sur vos questions, avant et après. Pas de « ça a l'air mieux »." },
    { title: "Chez vous", text: "Le code et l'infrastructure vivent dans votre dépôt et votre compte cloud. Rien ne vous enferme." },
    { title: "Chiffré", text: "Coût de mise en place, coût par question, coût mensuel : connus avant de décider." },
    { title: "Franc", text: "Si un RAG n'est pas la bonne réponse, je vous le dis au cadrage." },
  ],
  priceTitle: "Tarifs",
  priceText: "Chaque mission fait l'objet d'un devis forfaitaire après un premier échange de 30 minutes, sans engagement.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      q: "Mes documents quittent-ils mon entreprise ?",
      a: "Avec AWS Bedrock, vos documents et vos questions restent dans la région AWS choisie (Paris par exemple) et ne servent pas à entraîner les modèles. Pour les données les plus sensibles, des modèles ouverts peuvent tourner entièrement chez vous : c'est le sujet de la réalisation 08.",
    },
    {
      q: "Faut-il être sur AWS ?",
      a: "AWS est mon cloud principal (certification Data Engineer en cours). Les réalisations couvrent aussi Azure, GCP et l'installation sur vos serveurs, avec ou sans framework (LangChain, LlamaIndex, Haystack). Le cadrage choisit selon votre existant.",
    },
    {
      q: "Combien coûte un RAG à faire tourner ?",
      a: "De quelques euros à quelques centaines d'euros par mois, selon le volume de documents et de questions. Chaque réalisation de ce site affiche son coût mesuré ; le cadrage chiffre le vôtre.",
    },
    {
      q: "Combien de temps avant un premier résultat ?",
      a: "Un prototype sur vos documents en une à deux semaines après le cadrage, si les documents sont disponibles dès le départ.",
    },
    {
      q: "Travaillez-vous à distance, et en anglais ?",
      a: "Oui. Les missions se font à distance, en français ou en anglais.",
    },
  ],
  cta: { title: "Un projet en tête ?", text: "Décrivez vos documents et vos contraintes en quelques lignes.", contact: "Discuter d'un projet", demos: "Voir les réalisations" },
};

const en: typeof fr = {
  eyebrow: "Working together",
  offersTitle: "Four mission formats",
  deliverables: "Deliverables",
  youProvide: "On your side:",
  fit: "For you if:",
  offers: [
    {
      name: "Scoping",
      duration: "2 to 3 days",
      fit: "You have a need, but no method or budget yet.",
      deliverables: [
        "Review of a sample of your documents and 20 to 30 real questions",
        "Recommended method and architecture, with the options ruled out",
        "Set-up cost and monthly running cost, in figures",
      ],
      youProvide: "A sample of documents and someone who knows the business.",
    },
    {
      name: "Prototype",
      duration: "1 to 2 weeks",
      fit: "You want to see results on your own documents before investing.",
      deliverables: [
        "A working RAG system on your documents, for your teams to test",
        "An evaluation set and the first measured scores",
        "Documented code, in your repository",
      ],
      youProvide: "The documents in scope and feedback on the answers.",
    },
    {
      name: "Production rollout",
      duration: "3 to 6 weeks",
      fit: "The prototype works: now it must be reliable, secure and maintainable.",
      deliverables: [
        "Infrastructure as Terraform code in your AWS account",
        "Ingestion pipeline with automatic updates",
        "Access control, encryption, logging, cost and quality monitoring",
      ],
      youProvide: "Access to your cloud account and a technical contact.",
    },
    {
      name: "Audit and improvement",
      duration: "1 to 3 weeks",
      fit: "You already run a RAG system, but its answers disappoint or cost too much.",
      deliverables: [
        "Quality measured on your real questions",
        "Diagnosis: extraction, chunking, retrieval, model instructions",
        "Prioritised fixes, measured before and after",
      ],
      youProvide: "Access to the existing system and a few sample questions.",
    },
  ],
  principlesTitle: "How I work",
  principles: [
    { title: "Measured", text: "Every choice is evaluated on your questions, before and after. No \"it looks better\"." },
    { title: "Yours", text: "Code and infrastructure live in your repository and your cloud account. No lock-in." },
    { title: "Costed", text: "Set-up cost, cost per question, monthly cost: known before you decide." },
    { title: "Straight", text: "If RAG is not the answer, you will hear it during scoping." },
  ],
  priceTitle: "Pricing",
  priceText: "Each mission is quoted at a fixed price after a free 30-minute call, with no commitment.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "Do my documents leave my company?",
      a: "With AWS Bedrock, your documents and questions stay in the AWS region you choose (Paris, for example) and are not used to train the models. For the most sensitive data, open models can run entirely on your side: that is what project 08 shows.",
    },
    {
      q: "Do I need to be on AWS?",
      a: "AWS is my main cloud (Data Engineer certification in progress). The projects also cover Azure, GCP and running on your own servers, with or without a framework (LangChain, LlamaIndex, Haystack). Scoping picks what fits your existing setup.",
    },
    {
      q: "How much does a RAG system cost to run?",
      a: "From a few euros to a few hundred euros a month, depending on how many documents and questions. Every project on this site shows its measured cost; scoping puts a figure on yours.",
    },
    {
      q: "How soon is there a first result?",
      a: "A prototype on your documents one to two weeks after scoping, provided the documents are available from the start.",
    },
    {
      q: "Do you work remotely, and in English?",
      a: "Yes. Missions are carried out remotely, in French or English.",
    },
  ],
  cta: { title: "Have a project in mind?", text: "Describe your documents and constraints in a few lines.", contact: "Discuss a project", demos: "See the projects" },
};

export const services = { fr, en };
