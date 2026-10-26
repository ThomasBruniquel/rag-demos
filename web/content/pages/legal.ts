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
      { role: "Démos (API)", name: "Amazon Web Services EMEA SARL", address: "38 avenue John F. Kennedy, L-1855 Luxembourg", url: "https://aws.amazon.com" },
    ],
    ipTitle: "Propriété intellectuelle",
    ip: [
      "Les textes, illustrations et personnages du site sont la propriété de l'éditeur.",
      "Le code source des démos est publié sur GitHub, sous la licence indiquée dans le dépôt.",
      "Les documents utilisés dans les démos restent soumis à leur licence d'origine, indiquée sur chaque page de démo.",
      "Les noms de produits et de services cités appartiennent à leurs propriétaires. Leur mention n'implique aucun partenariat.",
    ],
  },
  privacy: {
    principlesTitle: "En résumé",
    principles: [
      "Aucun cookie de suivi, aucune mesure d'audience.",
      "Les polices sont servies par le site lui-même : aucune requête vers Google.",
      "Le choix du thème clair ou sombre reste dans votre navigateur.",
      "Les documents déposés dans une démo sont supprimés sous une heure.",
    ],
    controllerTitle: "Responsable du traitement",
    tableTitle: "Données traitées",
    columns: ["Traitement", "Données", "Pourquoi", "Base légale", "Durée"],
    rows: [
      ["Formulaire de contact", "Nom, e-mail, entreprise, message", "Répondre à votre demande", "Mesures précontractuelles", "3 ans après le dernier échange"],
      ["Questions posées aux démos", "Texte de la question et de la réponse, coût", "Faire fonctionner la démo, mesurer sa qualité", "Intérêt légitime", "30 jours"],
      ["Quotas d'usage", "Empreinte (hachage) de l'adresse IP", "Limiter les abus et les coûts", "Intérêt légitime", "48 heures"],
      ["Documents déposés (démo 01)", "Les fichiers envoyés", "Répondre aux questions sur ces fichiers", "Votre demande", "Moins d'une heure"],
      ["Vérification anti-robot", "Signaux techniques du navigateur", "Distinguer un humain d'un robot", "Intérêt légitime", "Selon Cloudflare"],
      ["Journaux techniques", "Requêtes et erreurs", "Sécurité et diagnostic", "Intérêt légitime", "14 jours"],
    ],
    demosNote: "Les démos ne sont pas encore en ligne : les traitements qui les concernent s'appliqueront à leur ouverture.",
    adviceTitle: "Un conseil",
    advice: "Ne saisissez ni ne déposez de données personnelles ou confidentielles dans les démos : elles sont faites pour être testées avec des documents publics.",
    processorsTitle: "Prestataires",
    processors: [
      { name: "Netlify", role: "Hébergement du site et du formulaire de contact", place: "États-Unis" },
      { name: "Amazon Web Services", role: "API des démos et modèles d'IA (Bedrock)", place: "Union européenne" },
      { name: "Cloudflare", role: "Vérification anti-robot (Turnstile)", place: "États-Unis" },
      { name: "Mistral AI", role: "Modèle d'IA de la démo 08", place: "Union européenne" },
      { name: "OpenAI", role: "Modèle d'IA, en option, dans la démo 06", place: "États-Unis" },
    ],
    transfers: "Les transferts hors de l'Union européenne sont encadrés par les garanties prévues par le RGPD (clauses contractuelles types de la Commission européenne ou cadre de protection des données UE–États-Unis).",
    rightsTitle: "Vos droits",
    rights: "Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, leur portabilité, ou vous opposer à leur traitement, en écrivant à l'adresse ci-dessus. Réponse sous un mois. Vous pouvez aussi adresser une réclamation à la CNIL.",
    cnil: "cnil.fr",
  },
  updated: "Dernière mise à jour : 26 octobre 2026",
};

const en: typeof fr = {
  legal: {
    publisherTitle: "Publisher",
    labels: { name: "Name", status: "Status", address: "Address", siret: "SIRET (French business ID)", email: "Email", director: "Publication director" },
    status: "Sole trader (entrepreneur individuel)",
    hostingTitle: "Hosting",
    hosts: [
      { role: "Website", name: "Netlify, Inc.", address: "101 2nd Street, San Francisco, CA 94105, USA", url: "https://www.netlify.com" },
      { role: "Demos (API)", name: "Amazon Web Services EMEA SARL", address: "38 avenue John F. Kennedy, L-1855 Luxembourg", url: "https://aws.amazon.com" },
    ],
    ipTitle: "Intellectual property",
    ip: [
      "The texts, illustrations and characters on this site belong to the publisher.",
      "The source code of the demos is published on GitHub, under the licence stated in the repository.",
      "The documents used in the demos remain under their original licence, stated on each demo page.",
      "Product and service names mentioned belong to their owners. Mentioning them implies no partnership.",
    ],
  },
  privacy: {
    principlesTitle: "In short",
    principles: [
      "No tracking cookies, no audience measurement.",
      "Fonts are served by the site itself: no request to Google.",
      "Your light or dark theme choice stays in your browser.",
      "Documents uploaded to a demo are deleted within one hour.",
    ],
    controllerTitle: "Data controller",
    tableTitle: "Data processed",
    columns: ["Processing", "Data", "Why", "Legal basis", "Kept for"],
    rows: [
      ["Contact form", "Name, email, company, message", "Replying to your request", "Pre-contractual steps", "3 years after the last exchange"],
      ["Questions asked to the demos", "Question and answer text, cost", "Running the demo, measuring its quality", "Legitimate interest", "30 days"],
      ["Usage quotas", "Hashed IP address", "Limiting abuse and costs", "Legitimate interest", "48 hours"],
      ["Uploaded documents (demo 01)", "The files you send", "Answering questions about those files", "Your request", "Under one hour"],
      ["Bot check", "Technical browser signals", "Telling humans from bots", "Legitimate interest", "As set by Cloudflare"],
      ["Technical logs", "Requests and errors", "Security and troubleshooting", "Legitimate interest", "14 days"],
    ],
    demosNote: "The demos are not live yet: the processing related to them will apply once they open.",
    adviceTitle: "A word of advice",
    advice: "Do not type or upload personal or confidential data in the demos: they are meant to be tried with public documents.",
    processorsTitle: "Service providers",
    processors: [
      { name: "Netlify", role: "Website and contact form hosting", place: "United States" },
      { name: "Amazon Web Services", role: "Demo API and AI models (Bedrock)", place: "European Union" },
      { name: "Cloudflare", role: "Bot check (Turnstile)", place: "United States" },
      { name: "Mistral AI", role: "AI model in demo 08", place: "European Union" },
      { name: "OpenAI", role: "Optional AI model in demo 06", place: "United States" },
    ],
    transfers: "Transfers outside the European Union rely on the safeguards provided by the GDPR (European Commission standard contractual clauses or the EU–US Data Privacy Framework).",
    rightsTitle: "Your rights",
    rights: "You can ask to access, correct, erase or port your data, or object to its processing, by writing to the address above. You will get a reply within one month. You may also lodge a complaint with the CNIL, the French data protection authority.",
    cnil: "cnil.fr",
  },
  updated: "Last updated: 26 October 2026",
};

export const legal = { fr, en };
