# 07 — Site vitrine

## Objectif du site

Transformer un visiteur (dirigeant de PME, CTO de startup, responsable data, acheteur d'ESN) en **prise de contact**. Le visiteur doit, en moins d'une minute, **reconnaître son problème** dans une démo, la tester, et voir que la solution est sérieuse (qualité mesurée, coût maîtrisé, code visible).

## Pages

| Page | Contenu |
|---|---|
| **Accueil** | Accroche par le problème, « le RAG en 30 secondes » (quand c'est utile, quand ça ne l'est pas), « Quel est votre besoin ? », galerie des personnages-méthodes, preuves (métriques, GitHub, certification), appel à l'action — voir « Concept » ci-dessous |
| **Qu'est-ce qu'un RAG ?** | Version longue et pédagogique de l'explication, pour les visiteurs non techniques |
| **Démos** (catalogue) | Les 9 démos filtrables par **situation** : type de documents, volume, contrainte (confidentialité, budget, délai), secteur |
| **Page d'une démo** | Voir ci-dessous |
| **Offres** | Formats de mission : audit/cadrage RAG (2-3 j), POC (1-2 sem.), mise en production (3-6 sem.), amélioration d'un RAG existant (évaluation + optimisation) |
| **Data engineering pour l'IA** | Pourquoi un RAG est d'abord un pipeline de données (version grand public de [04](04-aws-data-engineer-et-rag.md)) |
| **Articles** | Un article technique par démo |
| **À propos** | Parcours, certifications, façon de travailler |
| **Contact** | Formulaire (Netlify Forms), lien de prise de rendez-vous, Malt, LinkedIn |
| **Mentions légales / Confidentialité** | Obligatoires ; préciser le traitement des documents déposés (démo 01) et des questions posées |

## Concept : une méthode = un personnage (validé le 2026-10-26)

### Parcours de l'accueil
1. **Accroche par le problème** : « Vos équipes perdent du temps à chercher dans vos documents ? »
2. **Le RAG en 30 secondes** : un schéma animé en 3 étapes (question → recherche dans vos documents → réponse sourcée), puis **quand c'est utile** et **quand ce n'est pas la bonne solution** (corpus minuscule → CAG ; besoin d'un style ou d'un format → fine-tuning ; simple recherche → moteur de recherche). Dire quand il ne faut pas de RAG est un gage de sérieux.
3. **« Quel est votre besoin ? »** : entrée par le besoin du client (documents très longs, zéro hallucination, scans, données confidentielles, millions de documents, données chiffrées…). Chaque besoin mène à son personnage.
4. **La galerie des méthodes** : les personnages, puis les preuves et le contact.

### Les personnages
- **Un personnage par méthode phare** (un par démo) + **« RAG classique »**, un personnage gris qui sert de référence dans toutes les comparaisons.
- Style : formes géométriques simples ou pixel art, en SVG dessinés dans le code, cohérents entre eux. **Inspiré** du minimalisme de la mascotte de Claude, **sans la copier** : forme, couleur et nom différents.
- La **couleur et la silhouette indiquent la famille** de méthode (la forme aussi, pour ne pas dépendre que de la couleur) :
  - recherche : bleu ;
  - structure : violet ;
  - vérification : vert ;
  - agents : orange ;
  - souveraineté : rouge ;
  - multimodal : jaune.
- **Aucun logo ni charte de marque tierce** (IBM, Anthropic, Microsoft…). On écrit « méthode publiée par IBM Research (sept. 2026) » avec le lien vers le papier. Pas de formulation qui laisse croire à un partenariat.
- Le personnage **réagit dans le lecteur de démo** selon les événements `status` du flux : il cherche, vérifie, hésite ou refuse.

### Fiche d'un personnage
- Nom de la méthode, origine et date (« IBM Research, septembre 2026 ») ; badge **Récent** ou **Éprouvé**, car toutes les démos ne sont pas de l'état de l'art, et c'est voulu.
- Une phrase : le besoin qu'elle résout.
- Comment elle marche, en 3 lignes et un mini-schéma.
- **Points forts / limites**, avec 3 jauges : qualité, coût, complexité de mise en place.
- **Quand la choisir / quand l'éviter.**
- **Le duel** : le personnage face au « RAG classique » sur la même question, avec le tableau de scores mesurés.
- Bouton « Essayer la démo ».

## Structure d'une page de démo

1. **Le problème client** (2-3 phrases, langage métier, pas technique).
2. **Essayer** : lecteur de démo commun (questions d'exemple cliquables, saisie libre, réponse en streaming, citations cliquables).
3. **Coulisses** (repliable) : chunks récupérés, scores, latence, coût de la question.
4. **Comment c'est construit** : schéma d'architecture, choix techniques et *pourquoi*, ce qui a été écarté.
5. **Pipeline de données** : schéma, volumes, durée, coût d'ingestion.
6. **Résultats mesurés** : tableau d'évaluation (ex. « hybride + rerank : recall@5 = 0,91 contre 0,72 en vectoriel seul »).
7. **Pour votre projet** : durée et périmètre typiques d'une mission similaire, bouton contact.
8. **Code source** : lien GitHub vers le dossier de la démo.

## Ton et contenu

- Français pour les pages FR, anglais soigné pour les pages EN (pas une traduction mot à mot).
- Parler bénéfices au début de chaque page, technique ensuite.
- Être transparent sur les limites (« cette démo ne gère pas… ») : c'est un signe de sérieux pour les clients avertis.

## Identité visuelle

Reprise du site echic du porteur (D-012) : en-tête teal et mot-symbole doré, Manrope, boutons pilule, sections alternées, grilles à filet fin. Les personnages sont des aplats géométriques (une silhouette et une couleur par famille), dessinés en SVG dans `web/components/characters/` ; dans le lecteur de démo, ils réagissent aux événements `status` du flux (recherche, vérification, hésitation, refus).

## Technique

- Next.js export statique, routes `/fr/...` et `/en/...`, détection de langue à l'arrivée.
- Contenu des démos en MDX (un fichier FR + un EN par démo) pour éditer sans toucher au code.
- Schémas d'architecture en Mermaid ou SVG.
- Performance : pas de dépendance lourde au chargement ; le lecteur de démo est chargé à la demande.
- Hébergement **Netlify** (déploiement depuis GitHub, aperçu par branche).
- Mesure d'audience sans cookie (ex. Plausible ou Umami), à décider plus tard.
- Accessibilité et affichage mobile corrects.

## SEO

- Une page par démo ciblant une recherche réelle : « chatbot RAG documents PDF », « RAG AWS Bedrock freelance », « text-to-SQL data lake », « RAG données confidentielles RGPD »…
- Métadonnées FR/EN, `hreflang`, sitemap, données structurées (Person / ProfessionalService).
