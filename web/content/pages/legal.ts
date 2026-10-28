/*
 * Legal notice and privacy policy. Owner details come from site.config.ts;
 * values still marked [À COMPLÉTER] there are highlighted on the page.
 * Retention periods: see D-015 in docs/06-decisions.md.
 */

const fr = {
  legal: {
    publisherTitle: "Éditeur",
    labels: { name: "Nom", status: "Statut", address: "Adresse", siret: "SIRET", email: "E-mail", director: "Directeur de la publication" },
    status: "Entrepreneur individuel",
    hostingTitle: "Hébergement",
    hosts: [
      { role: "Site", name: "Netlify, Inc.", address: "101 2nd Street, San Francisco, CA 94105, États-Unis", url: "https://www.netlify.com" },
    ],
    ipTitle: "Propriété intellectuelle",
    ip: [
      "Les textes, illustrations et personnages du site sont la propriété de l'éditeur.",
      "Le code source des réalisations est publié sur GitHub, sous la licence indiquée dans le dépôt.",
      "Les données utilisées dans les réalisations sont publiques ou fictives ; elles restent soumises à leur licence d'origine, indiquée sur chaque page de réalisation.",
      "Les noms de produits et de services cités appartiennent à leurs propriétaires. Leur mention n'implique aucun partenariat.",
    ],
  },
  privacy: {
    principlesTitle: "En résumé",
    principles: [
      "Aucun cookie de suivi, aucune mesure d'audience.",
      "Les polices sont servies par le site lui-même : aucune requête vers Google.",
      "Le choix du thème clair ou sombre reste dans votre navigateur.",
      "Vous ne déposez aucun document et ne posez aucune question sur ce site : les sessions affichées sont des enregistrements, rejoués dans votre navigateur.",
    ],
    controllerTitle: "Responsable du traitement",
    tableTitle: "Données traitées",
    columns: ["Traitement", "Données", "Pourquoi", "Base légale", "Durée"],
    rows: [
      ["Formulaire de contact", "Nom, e-mail, entreprise, message", "Répondre à votre demande", "Mesures précontractuelles", "3 ans après le dernier échange"],
      ["Démo en direct sur rendez-vous", "Questions posées pendant la séance ; documents, si vous choisissez d'en montrer", "Vous montrer la réalisation sur votre cas", "Votre demande (mesures précontractuelles)", "Effacés à la fin de la séance"],
      ["Journaux de l'hébergeur", "Adresse IP, page demandée, date", "Sécurité et diagnostic du site", "Intérêt légitime", "Selon Netlify"],
    ],
    liveTitle: "Démo en direct sur rendez-vous",
    live: [
      "Les réalisations ne tournent pas en permanence. Pour une démo en direct, l'éditeur lance la réalisation sur son poste ou la déploie temporairement sur un compte cloud qu'il contrôle (AWS, Azure ou Google Cloud, en région européenne quand le service le permet), le temps de la séance.",
      "Les questions posées et les documents que vous choisissez de montrer ne servent qu'à cette séance. Ils sont effacés à la fin, avec les index et les journaux créés pour l'occasion. Rien n'est réutilisé pour entraîner un modèle.",
      "Selon la réalisation montrée, les questions et les extraits de documents passent par le fournisseur du modèle d'IA utilisé (voir « Prestataires »). Pour des documents confidentiels, la séance peut se faire avec des modèles ouverts exécutés localement, sans aucun envoi à un fournisseur d'IA.",
    ],
    adviceTitle: "Un conseil",
    advice: "Pour une démo en direct, préférez des documents publics ou anonymisés. Si vos documents contiennent des données personnelles, parlons-en avant la séance : variante locale, masquage des données ou accord de traitement.",
    processorsTitle: "Prestataires",
    processors: [
      { name: "Netlify", role: "Hébergement du site et du formulaire de contact", place: "États-Unis" },
      { name: "Amazon Web Services, Microsoft Azure, Google Cloud", role: "Uniquement pendant une démo en direct, selon la réalisation montrée : calcul et modèles d'IA (Bedrock, Azure OpenAI, Gemini)", place: "Union européenne (région choisie)" },
      { name: "Mistral AI", role: "Uniquement pendant une démo en direct, si la réalisation montrée l'utilise par API", place: "Union européenne" },
    ],
    transfers: "Les transferts hors de l'Union européenne sont encadrés par les garanties prévues par le RGPD (clauses contractuelles types de la Commission européenne ou cadre de protection des données UE–États-Unis).",
    rightsTitle: "Vos droits",
    rights: "Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, leur portabilité, ou vous opposer à leur traitement, en écrivant à l'adresse ci-dessus. Réponse sous un mois. Vous pouvez aussi adresser une réclamation à la CNIL.",
    cnil: "cnil.fr",
  },
  updated: "Dernière mise à jour : 28 octobre 2026",
};

const en: typeof fr = {
  legal: {
    publisherTitle: "Publisher",
    labels: { name: "Name", status: "Status", address: "Address", siret: "SIRET (French business ID)", email: "Email", director: "Publication director" },
    status: "Sole trader (entrepreneur individuel)",
    hostingTitle: "Hosting",
    hosts: [
      { role: "Website", name: "Netlify, Inc.", address: "101 2nd Street, San Francisco, CA 94105, USA", url: "https://www.netlify.com" },
    ],
    ipTitle: "Intellectual property",
    ip: [
      "The texts, illustrations and characters on this site belong to the publisher.",
      "The source code of the projects is published on GitHub, under the licence stated in the repository.",
      "The data used in the projects is public or fictional; it remains under its original licence, stated on each project page.",
      "Product and service names mentioned belong to their owners. Mentioning them implies no partnership.",
    ],
  },
  privacy: {
    principlesTitle: "In short",
    principles: [
      "No tracking cookies, no audience measurement.",
      "Fonts are served by the site itself: no request to Google.",
      "Your light or dark theme choice stays in your browser.",
      "You upload no document and ask no question on this site: the sessions shown are recordings, replayed in your browser.",
    ],
    controllerTitle: "Data controller",
    tableTitle: "Data processed",
    columns: ["Processing", "Data", "Why", "Legal basis", "Kept for"],
    rows: [
      ["Contact form", "Name, email, company, message", "Replying to your request", "Pre-contractual steps", "3 years after the last exchange"],
      ["Live demo, by appointment", "Questions asked during the session; documents, if you choose to show some", "Showing you the project on your case", "Your request (pre-contractual steps)", "Erased at the end of the session"],
      ["Host logs", "IP address, page requested, date", "Site security and troubleshooting", "Legitimate interest", "As set by Netlify"],
    ],
    liveTitle: "Live demo, by appointment",
    live: [
      "The projects do not run permanently. For a live demo, the publisher starts the project on their own computer or deploys it temporarily to a cloud account they control (AWS, Azure or Google Cloud, in a European region where the service allows it), for the length of the session.",
      "The questions asked and the documents you choose to show are used for that session only. They are erased at the end, together with the indexes and logs created for it. Nothing is reused to train a model.",
      "Depending on the project shown, questions and document excerpts go through the provider of the AI model in use (see \"Service providers\"). For confidential documents, the session can run on open models executed locally, with nothing sent to an AI provider.",
    ],
    adviceTitle: "A word of advice",
    advice: "For a live demo, prefer public or anonymised documents. If yours contain personal data, let's talk before the session: a local variant, data masking or a data processing agreement.",
    processorsTitle: "Service providers",
    processors: [
      { name: "Netlify", role: "Website and contact form hosting", place: "United States" },
      { name: "Amazon Web Services, Microsoft Azure, Google Cloud", role: "Only during a live demo, depending on the project shown: computing and AI models (Bedrock, Azure OpenAI, Gemini)", place: "European Union (chosen region)" },
      { name: "Mistral AI", role: "Only during a live demo, if the project shown calls it through its API", place: "European Union" },
    ],
    transfers: "Transfers outside the European Union rely on the safeguards provided by the GDPR (European Commission standard contractual clauses or the EU–US Data Privacy Framework).",
    rightsTitle: "Your rights",
    rights: "You can ask to access, correct, erase or port your data, or object to its processing, by writing to the address above. You will get a reply within one month. You may also lodge a complaint with the CNIL, the French data protection authority.",
    cnil: "cnil.fr",
  },
  updated: "Last updated: 28 October 2026",
};

export const legal = { fr, en };
