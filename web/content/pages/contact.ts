/*
 * Contact page. The form is handled by Netlify Forms (detected in the static
 * HTML at deploy time); see components/pages/contact-form.tsx.
 */

const fr = {
  form: {
    title: "Écrire un message",
    name: "Nom",
    email: "E-mail",
    company: "Entreprise",
    optional: "facultatif",
    message: "Votre projet",
    messageHint: "Type de documents, volume, questions à traiter, contraintes (confidentialité, budget, délai).",
    consent: "Vos coordonnées servent uniquement à vous répondre. Détails dans la page",
    privacy: "Confidentialité",
    submit: "Envoyer",
    sending: "Envoi…",
    sent: "Merci, votre message est bien parti. Réponse sous deux jours ouvrés.",
    error: "L'envoi a échoué. Vous pouvez écrire directement à",
  },
  direct: {
    title: "Ou directement",
    email: "E-mail",
    linkedin: "LinkedIn",
    github: "Code des réalisations",
    malt: "Malt",
    booking: "Prendre rendez-vous",
    delay: "Réponse sous deux jours ouvrés, avec une première analyse et des questions précises.",
  },
  live: {
    title: "Démo en direct sur rendez-vous",
    text: "En visio, je lance la réalisation la plus proche de votre cas : sur des documents publics, ou sur quelques-uns de vos documents si vous le souhaitez. Vous posez vos propres questions et vous voyez les coulisses : sources retrouvées, latence, coût de chaque réponse.",
    note: "Rien n'est conservé après la séance. Pour des documents confidentiels, la démo peut tourner avec des modèles ouverts, sans envoi à un fournisseur d'IA.",
    booking: "Choisir un créneau",
    email: "Demander une démo par e-mail",
    subject: "Demande de démo en direct",
  },
  helpful: {
    title: "Ce qui aide à répondre vite",
    items: [
      "Le type de documents : PDF, scans, tableaux, bases de données, vidéos…",
      "Le volume : quelques dizaines, des milliers, des millions ?",
      "Trois ou quatre questions typiques que vos équipes se posent.",
      "Les contraintes : données sensibles, budget, échéance, cloud imposé.",
      "L'existant : un RAG ou un outil de recherche déjà en place ?",
    ],
  },
};

const en: typeof fr = {
  form: {
    title: "Send a message",
    name: "Name",
    email: "Email",
    company: "Company",
    optional: "optional",
    message: "Your project",
    messageHint: "Kind of documents, volume, questions to handle, constraints (confidentiality, budget, deadline).",
    consent: "Your details are only used to reply to you. More in the",
    privacy: "Privacy page",
    submit: "Send",
    sending: "Sending…",
    sent: "Thank you, your message is on its way. Expect a reply within two working days.",
    error: "Sending failed. You can write directly to",
  },
  direct: {
    title: "Or directly",
    email: "Email",
    linkedin: "LinkedIn",
    github: "Project source code",
    malt: "Malt",
    booking: "Book a call",
    delay: "A reply within two working days, with a first assessment and a few pointed questions.",
  },
  live: {
    title: "Live demo, by appointment",
    text: "Over a video call, I run the project closest to your case: on public documents, or on a few of your own if you wish. You ask your own questions and see behind the scenes: retrieved sources, latency, the cost of each answer.",
    note: "Nothing is kept after the session. For confidential documents, the demo can run on open models, with nothing sent to an AI provider.",
    booking: "Pick a time slot",
    email: "Ask for a demo by email",
    subject: "Live demo request",
  },
  helpful: {
    title: "What helps for a quick reply",
    items: [
      "The kind of documents: PDFs, scans, tables, databases, videos…",
      "The volume: a few dozen, thousands, millions?",
      "Three or four typical questions your teams ask.",
      "The constraints: sensitive data, budget, deadline, a required cloud.",
      "What exists: a RAG system or search tool already in place?",
    ],
  },
};

export const contact = { fr, en };
export type ContactFormText = typeof fr.form;
