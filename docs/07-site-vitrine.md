# 07 — Site vitrine

## Objectif du site

Transformer un visiteur (dirigeant de PME, CTO de startup, responsable data, acheteur d'ESN) en **prise de contact**. Le visiteur doit, en moins d'une minute, **reconnaître son problème** dans une réalisation, la **voir en action** (session réelle rejouée, D-020), **repérer les technologies qu'il cherche** (badges, D-022) et voir que la solution est sérieuse (qualité mesurée, coût maîtrisé, code visible).

## Pages

| Page | Contenu |
|---|---|
| **Accueil** | Accroche par le problème, « le RAG en 30 secondes » (quand c'est utile, quand ça ne l'est pas), « Quel est votre besoin ? », galerie des personnages-méthodes, preuves (métriques, GitHub, certification), appel à l'action — voir « Concept » ci-dessous |
| **Qu'est-ce qu'un RAG ?** | Version longue et pédagogique de l'explication, pour les visiteurs non techniques |
| **Réalisations** (catalogue, D-021) | Les 9 réalisations filtrables par **situation** (type de documents, volume, contrainte, secteur) **et par mot-clé** (cloud, framework, modèle, base vectorielle, intégration, conformité) |
| **Page d'une réalisation** | Voir ci-dessous |
| **Compétences** | Tableau mot-clé → réalisations qui le démontrent (LangChain, LlamaIndex, Haystack, GPT, Mistral, Llama, Claude, Gemini, FAISS, Weaviate, Qdrant, pgvector, Neo4j, S3 Vectors, Azure AI Search, SharePoint, Google Drive, AWS, Azure, GCP, RGPD, souveraineté, AI Act). Utile aux recruteurs et pour le référencement |
| **Offres** | Formats de mission : audit/cadrage RAG (2-3 j), POC (1-2 sem.), mise en production (3-6 sem.), amélioration d'un RAG existant (évaluation + optimisation) |
| **Data engineering pour l'IA** | Pourquoi un RAG est d'abord un pipeline de données (version grand public de [04](04-aws-data-engineer-et-rag.md)) |
| **Articles** | Un article technique par démo |
| **À propos** | Parcours, certifications, façon de travailler |
| **Contact** | Formulaire (Netlify Forms), lien de prise de rendez-vous (avec la proposition « démo en direct sur vos documents ou des documents publics »), Malt, LinkedIn |
| **Mentions légales / Confidentialité** | Obligatoires. Depuis D-020, aucun visiteur ne dépose de document ni ne pose de question sur le site : la page le dit, et décrit le traitement des données lors d'une démo en direct sur rendez-vous |

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
- Bouton « Voir la réalisation ».

## Réalisations : présentation honnête (D-021)

- Libellé : **« Réalisations »** (EN : *Projects*). Sous-titre : « Projets construits de bout en bout sur données publiques — code ouvert ».
- Sur chaque fiche, un bandeau discret : **« Projet personnel — données publiques — code ouvert »**.
- Le besoin est formulé comme un type de besoin (« Pour une direction juridique qui… »), jamais comme un client (« Client : … »). Aucun logo d'entreprise, aucune « référence ».

## Mots-clés et badges (D-022)

- Chaque carte et chaque fiche affichent des **badges groupés par catégorie** : Cloud, Framework, Modèles, Base vectorielle, Intégration, Conformité. Les valeurs viennent de la matrice de [02-catalogue-rag.md](02-catalogue-rag.md) et sont stockées dans les métadonnées de chaque réalisation (`demo.yaml`).
- Les badges sont **cliquables** : ils mènent à la page Compétences, filtrée sur ce mot-clé.
- Badges en texte (pas de logos de marques), lisibles en clair et en sombre.

## Structure d'une page de réalisation

1. **Le besoin traité** (2-3 phrases, langage métier, pas technique) + bandeau « projet personnel » + **badges**.
2. **En action** : vidéo courte en haut ; puis le **lecteur de rejeu**. Le visiteur choisit une question d'exemple, la session réelle enregistrée se rejoue (texte qui s'écrit, étapes, citations cliquables), avec la mention « Session réelle enregistrée le … — modèle … — coût … ». Pas de saisie libre. Lien « Voir en direct sur rendez-vous ».
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
- Performance : pas de dépendance lourde au chargement ; le lecteur et les enregistrements sont chargés à la demande ; vidéos courtes et compressées, sans lecture automatique avec le son.
- Hébergement **Netlify** (déploiement depuis GitHub, aperçu par branche).
- Mesure d'audience sans cookie (ex. Plausible ou Umami), à décider plus tard.
- Accessibilité et affichage mobile corrects.

## SEO

- Une page par réalisation ciblant une recherche réelle : « chatbot RAG documents PDF », « RAG AWS Bedrock freelance », « text-to-SQL data lake », « RAG données confidentielles RGPD », « RAG SharePoint Azure OpenAI », « freelance LangChain / LlamaIndex / Haystack »…
- Le texte des sessions rejouées est présent dans la page (pas seulement dans une vidéo) : il est indexable.
- Métadonnées FR/EN, `hreflang`, sitemap, données structurées (Person / ProfessionalService).
