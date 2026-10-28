# 06 — Journal des décisions

Format : une entrée par décision structurante. Statut : **Acceptée**, **À confirmer**, **Remplacée**.

## Décisions

### D-001 — Budget de fonctionnement < 30 €/mois — Acceptée (2026-10-26), modifiée par D-020 (≈ 1 €/mois)
Conséquence : uniquement du serverless ou du scale-to-zero ; plafond de coût LLM journalier ; pas d'OpenSearch Serverless, Kendra, Neptune, NAT Gateway, Fargate permanent.

### D-002 — Bedrock comme fournisseur LLM principal, Mistral et OpenAI en complément — Acceptée (2026-10-26), élargie par D-022
Mistral pour l'argument souveraineté (démo 08), OpenAI parce que beaucoup d'offres internationales l'imposent (démo 06, en option interchangeable).

### D-003 — Terraform pour toute l'infrastructure — Acceptée (2026-10-26)

### D-004 — Next.js bilingue FR/EN, hébergé sur Netlify — Acceptée (2026-10-26, remplace « S3 + CloudFront »)
Choix de l'utilisateur. Avantages : déploiement automatique depuis GitHub, aperçus de branche, HTTPS et DNS inclus, formulaire de contact via Netlify Forms, offre gratuite suffisante. Le site reste majoritairement statique. Les API des démos restent sur AWS (Lambda Function URL) et sont appelées directement depuis le navigateur, avec CORS limité au domaine du site.

### D-005 — Accès libre aux démos avec Turnstile + quotas + plafond global — Remplacée par D-020 (2026-10-28) : code conservé pour le mode direct sur rendez-vous

### D-006 — Dépôt GitHub public — Acceptée (2026-10-26)

### D-007 — S3 Vectors comme base vectorielle par défaut — Acceptée (2026-10-26)
Raisons : coût très bas (stockage ~0,06 $/Go-mois, requêtes ~2,50 $/million), aucun coût fixe, intégration native aux Bedrock Knowledge Bases, disponible en GA depuis décembre 2025. Les autres bases (pgvector, Qdrant, Neo4j) sont utilisées là où elles apportent quelque chose à montrer.

### D-008 — Pas de Lambda dans un VPC — Acceptée (2026-10-26)
Évite NAT Gateway et endpoints VPC. Aurora est interrogé par RDS Data API.

### D-009 — Streaming via FastAPI + Lambda Web Adapter + Function URL — À confirmer (n'est plus un prérequis du site depuis D-020)
À valider par un prototype en Phase 1 (streaming SSE de bout en bout, appelé depuis le site Netlify avec CORS).

### D-010 — Corpus publics avec licence vérifiée ou données fictives signalées — Acceptée (2026-10-26)

### D-011 — Utilisation des crédits AWS et passage en Paid plan — Acceptée (2026-10-26)
État relevé le 2026-10-26 : **Free plan**, **100 $ de crédits**, fin du plan gratuit le **8 avril 2027** (compte ouvert vers le 8 octobre 2026 ; crédits valables jusqu'à ~octobre 2027 en Paid plan).
Ordre des opérations :
1. **Rester en Free plan** le temps de réaliser les 5 activités qui rapportent 20 $ chacune (budget, Bedrock playground, Lambda, RDS, EC2), pour monter à ~200 $.
2. **Passer en Paid plan avant toute ingestion coûteuse** : en Free plan, le compte est suspendu dès que les crédits tombent à zéro, ce qui peut arriver en pleine ingestion. En Paid plan, les crédits restants s'appliquent toujours, et AWS Budgets protège contre les dépassements.
3. **Ne pas utiliser AWS Organizations** : y inscrire le compte fait perdre l'usage des crédits Free Tier. Donc pas d'IAM Identity Center en mode organisation ; accès par utilisateur IAM avec MFA.

### D-012 — Site vitrine : export statique, i18n natif, identité visuelle reprise d'echic — Acceptée (2026-10-26)
- **Next.js 16.4 en export statique** (`output: "export"`) servi tel quel par Netlify. `cacheComponents` est désactivé (non pris en charge en export statique).
- **i18n sans bibliothèque** : segment racine `app/[locale]` + `next/root-params` (Next.js ≥ 16.3) + dictionnaires JSON typés (`web/messages/`). `next-intl` écarté : son middleware ne fonctionne pas en export statique et le besoin est simple.
- **URL traduites** (`/fr/offres` ↔ `/en/services`) : un dossier par langue, même composant, table unique dans `web/lib/i18n/routes.ts`.
- **Langue à l'arrivée** : redirection Netlify sur `/` selon l'en-tête `Accept-Language` (`netlify.toml`), avec une page de secours en JavaScript.
- **Schémas** : sources Mermaid converties en SVG sur le poste du développeur, SVG versionnés (pas de Mermaid dans le navigateur).
- **Identité visuelle reprise du site echic du porteur** (demande du 2026-10-26, remplace la « direction A » choisie le même jour) : en-tête teal avec mot-symbole doré, texte marine, Manrope, boutons pilule, sections alternées blanc / gris clair, grilles à filet fin, bande teal pour l'appel à l'action, bandeau d'engagements au-dessus du pied de page. Thème sombre dérivé de la même palette. Contrastes AA vérifiés par `web/scripts/check-contrast.mjs` ; l'or des grands titres est assombri en thème clair (`--gold-display`) pour atteindre 3:1.

### D-013 — Une méthode phare et un personnage par démo — Acceptée (2026-10-26)
- Chaque démo met en scène une **méthode phare**, incarnée par un personnage SVG dessiné dans le code ; un personnage gris « RAG classique » sert de référence, et chaque méthode l'affronte dans un **duel chiffré** (valeurs marquées [À MESURER] tant que le banc d'évaluation n'a pas tourné).
- Six familles, une couleur et une silhouette chacune : recherche (bleu, rond) 01 ; structure (violet, bloc) 03 et 07 ; vérification (vert, bouclier) 02 et 04 ; agents (orange, capsule à bras) 06 ; souveraineté (rouge, maison) 08 ; multimodal (jaune, écran) 05 et 09.
- Aucune marque tierce : origine écrite en texte (« méthode publiée par IBM Research (sept. 2026) ») avec lien vers la publication. Sources vérifiées le 2026-10-26.
- **STAIR (démo 03)** : la méthode publiée (arXiv 2609.03874) entraîne un modèle pour mémoriser le corpus et le retrouver par sa table des matières. La démo en reprend le principe **sans entraînement** (un modèle du commerce parcourt la table des matières), ce que la fiche indique. Une version fidèle demanderait un fine-tuning et un hébergement de modèle incompatibles avec D-001.
- Points à trancher au moment de construire les démos : modèle vérificateur de la démo 02 (Granite Guardian hébergé, ou contrôle de fidélité de Bedrock Guardrails) et hébergement du modèle de recherche visuelle de la démo 05 (ColPali demande du calcul à chaque question).

### D-014 — Neuf démos au lieu de dix — Acceptée (2026-10-26)
- La démo **05 « Veille scientifique »** (embeddings Matryoshka + quantification, ~1 M résumés arXiv) est retirée : son secteur (laboratoires, pharma) est le plus éloigné des cibles (PME/ETI, SaaS), et sa méthode est une optimisation de coût de la recherche plutôt qu'un cas client distinct. L'argument « gros volume » reste porté par la démo 04 (data lake de 20 millions de lignes).
- Les démos suivantes sont **renumérotées** pour éviter un trou : 06 → 05 (documentation technique), 07 → 06 (support agentique), 08 → 07 (GraphRAG), 09 → 08 (souverain), 10 → 09 (réunions). Les numéros cités dans les entrées précédentes et dans les autres documents suivent la nouvelle numérotation.
- Neuf démos se présentent en grille 3 × 3 sur la page d'accueil.

### D-015 — Formulaire de contact et durées de conservation — Acceptée (2026-10-26)
- **Formulaire** : Netlify Forms (offre gratuite, 100 envois par mois), détecté dans le HTML statique ; envoi en arrière-plan avec JavaScript, envoi classique sans. Champ piège anti-spam. Pas de service tiers supplémentaire.
- **Durées de conservation** publiées sur la page Confidentialité, à respecter dans le code des démos : messages de contact 3 ans après le dernier échange ; questions et réponses des démos 30 jours (TTL DynamoDB) ; empreinte d'IP pour les quotas 48 heures ; documents déposés moins d'une heure ; journaux CloudWatch 14 jours.
- **Aucune mesure d'audience ni cookie de suivi** pour l'instant ; les polices sont servies par le site.
- À vérifier au déploiement : activer la détection de formulaires dans l'interface Netlify et configurer la notification par e-mail.

### D-016 — Région eu-west-3 (Paris) — Acceptée (2026-10-27, tranche Q-1)
Vérifié le 2026-10-27 dans la documentation AWS : S3 Vectors, Bedrock Knowledge Bases (stockage S3 Vectors), Titan Text Embeddings v2 et Cohere Embed multilingue sont disponibles à Paris. Claude Haiku 5.5 n'y est pas servi en direct, mais par le profil géographique `eu.anthropic.claude-haiku-5-5`, dont toutes les régions de destination sont dans l'UE (eu-central-1, eu-north-1, eu-south-1, eu-south-2, eu-west-1, eu-west-3). Les politiques IAM doivent autoriser le profil et le modèle dans chacune de ces régions.

### D-017 — Démo 01 : choix de réalisation — Acceptée (2026-10-27)
- **Modèle de génération : Claude Haiku 5.5** (sorti le 2026-10-07) via le profil EU ; réflexion étendue désactivée pour des réponses factuelles courtes (à confirmer au premier appel).
- **`Retrieve` + Converse en streaming, au lieu de `RetrieveAndGenerate`** : ce dernier ne renvoie pas l'usage en tokens, indispensable au plafond de coût et au panneau « coulisses ». La Knowledge Base garde le découpage, les embeddings et l'index.
- **PDF du visiteur en CAG, sans passer par la Knowledge Base** (le catalogue prévoyait une ingestion filtrée par session) : texte extrait page par page avec pypdf, document entier dans le prompt système avec un point de cache. Les PDF sans texte sont refusés (renvoi vers la démo 05).
- **Suppression des PDF par EventBridge Scheduler** (deux rendez-vous uniques par document, PDF et texte extrait, cible universelle `s3:deleteObject`, qui n'exige pas de somme de contrôle contrairement à `deleteObjects`), et non par TTL DynamoDB, qui peut prendre jusqu'à 48 h. Règle de cycle de vie S3 d'un jour en filet de sécurité.
- **Lambda en zip arm64 + couche Lambda Web Adapter** plutôt qu'une image conteneur (précise D-009) : pas de registre ECR, paquet de 3,8 Mo construit par un script Python, utilisable sous Windows. Le streaming de bout en bout reste à valider en ligne.
- **Ingestion orchestrée par Step Functions** (Lambda de conversion → `startIngestionJob` → attente et contrôle), déclenchée chaque mois par EventBridge Scheduler ; archive brute conservée dans `raw/` pour rejouer une exécution.
- **Corpus réel : 775 fiches** (773 indexées), et non ~3 000 comme écrit dans le plan initial ; site et documents corrigés.
- **Traces** : 30 jours pour les questions sur les fiches ; pour le mode PDF, métriques seulement (ni question ni réponse), puisque le document est supprimé dans l'heure.

### D-018 — Démo 05 : choix de réalisation — Acceptée (2026-10-28, tranche Q-10 et le point ColQwen de Q-9)
- **Quatre voies comparées sur les mêmes questions** : `ocr_text` (texte OCR seul), `ocr_figures` (texte + descriptions de figures), `visual` (images des pages), `colqwen` (images des pages, multi-vecteurs). Le site appelle l'API une fois par voie.
- **Voie visuelle en direct avec Cohere Embed v4** (Bedrock, profil EU `eu.cohere.embed-v4:0`, un vecteur par page, S3 Vectors), au lieu de ColPali/ColQwen : ColQwen demande un modèle de 2 milliards de paramètres pour encoder chaque question, incompatible avec D-001. Le même modèle Cohere sert aux voies OCR (texte) : seule l'entrée change, la comparaison est honnête. Disponibilité à Paris vérifiée le 2026-10-28 (profil EU, régions de destination toutes dans l'UE).
- **ColQwen calculé une fois sur le GPU local** (RTX 2080 SUPER 8 Go, réponse à Q-10) par un script autonome (`eval/colqwen.py`, PyTorch hors du paquet Lambda) : il sert au banc d'évaluation et aux questions d'exemple, dont les classements sont lus par l'API. **Pas de Qdrant** (prévu au catalogue) : sans requête en direct, un calcul MaxSim local suffit.
- **Textract (fonction LAYOUT seule, ~0,004 $/page) sur tous les rapports**, pas seulement les scans : sur les rapports natifs, les graphiques vectoriels ne sont pas des images et la détection par images intégrées les manque (constaté sur le corpus). Le texte des pages natives reste celui du PDF (exact) ; Textract ne fournit que les figures. Surcoût ≈ 4 $. Désactivable (`layout_for_native`).
- **Une page est un scan quand une image en couvre plus de 80 %**, et non quand elle n'a pas de texte : les vieux scans de la NASA portent souvent une couche OCR invisible, de qualité inégale. Ces pages repassent par Textract, qui donne une confiance par mot ; une page sous 80 % de confiance moyenne est signalée pour relecture dans le catalogue.
- **Figures décrites par Claude Haiku 5.5** (image recadrée + légende + texte de la page), réponse `NOT_A_FIGURE` pour écarter les faux positifs ; au plus 80 figures par rapport (les plus grandes).
- **Pipeline par rapport** : dépôt dans `incoming/` → EventBridge → Step Functions (inspect → Textract asynchrone avec sortie sur S3 → build → descriptions en Map → index). Chaque étape lit et écrit sur S3 : état léger, étapes rejouables, clés de vecteurs déterministes et suppression des vecteurs obsolètes.
- **Corpus réel : 70 rapports NTRS, 3 450 pages** (37 scans de 1963 à 1985, 33 natifs de 2005 à 2025), et non ~100 rapports / ~4 000 pages : seuls les rapports marqués `GOV_PUBLIC_USE_PERMITTED`, publics, non soumis au contrôle des exportations et de 8 à 150 pages sont retenus. Manifeste versionné avec les SHA-256.
- **Lambda en zip arm64** comme la démo 01, mais roues `manylinux_2_28` (Pillow 13 n'en publie plus d'autres pour arm64 ; le runtime python3.12 tourne sur Amazon Linux 2023) : paquet de 13,7 Mo avec PDFium.

### D-019 — Démo 04 : choix de réalisation — Acceptée (2026-10-28)
- **Source : DVF géolocalisées d'Etalab** (CSV propre, une année par fichier, 2021 à 2025) plutôt que les fichiers bruts de la DGFiP (séparateur `|`, virgule décimale). Référentiels (communes avec population, départements, régions) depuis geo.api.gouv.fr. Volume réel : **20,4 millions de lignes, 7,3 millions de ventes**.
- **Deux tables de faits** : `lignes` (données DVF typées) et `ventes` (une ligne par vente, locaux et terrains dédoublonnés, type de bien déduit, prix au m² seulement pour la vente d'un seul logement). Le dédoublonnage est fait une fois dans le pipeline au lieu d'être réinventé par le modèle à chaque question. Les ventes sur plan sans logement décrit (70 % des VEFA) ont leur propre type, `neuf_non_decrit`.
- **Couche sémantique en YAML, source unique** : Terraform en tire les tables Glue (colonnes, types, commentaires), le pipeline l'index S3 Vectors (tables, colonnes, glossaire métier, 19 exemples validés).
- **Pas de Glue Crawler** (prévu au catalogue) : tables déclarées par Terraform et **projection de partitions** Athena (année × département). Un crawler écraserait les descriptions et n'apporte rien quand le schéma est connu.
- **Transformations en Spark SQL**, exécutées par Glue 5.0 (mode **Flex**) en production et par DuckDB en local, traduites par sqlglot : lac reconstruit en une minute sur le poste, tests et vérification des requêtes de référence sans AWS.
- **Lake Formation activé pour le compte** (module partagé `infra/modules/lake_formation`) : l'identité Terraform devient administratrice du data lake et les nouvelles bases Glue sont gouvernées par Lake Formation seul (pas d'`IAMAllowedPrincipals`). Conséquence pour les démos suivantes (07) : chaque lecture de table demande une autorisation Lake Formation explicite. Le rôle de l'API n'a aucune permission S3 sur le lac, seulement `SELECT` sur quatre tables.
- **Méthode : trois requêtes candidates par méthodes différentes** (directe, décomposition en sous-requêtes, plan d'exécution), exécutées en parallèle, deux corrections guidées par l'erreur au plus, sélection par la majorité des résultats, sinon par le modèle qui voit les requêtes et leurs résultats. Refus quand la majorité refuse. Sortie structurée par appel d'outil forcé (`rag_core.bedrock.converse_tool`, ajouté pour l'occasion).
- **Garde-fous** : contrôle sqlglot (une instruction en lecture, tables du catalogue uniquement), workgroup Athena plafonné à 1 Go lu par requête, 10 questions par IP et par jour (au lieu de 15 : 4 à 6 appels au modèle par question).
- **Évaluation sur 40 questions** (dont 4 sans réponse possible), en comparant les résultats et non le texte SQL ; trois configurations comparées : une requête avec tout le schéma, une requête avec le catalogue ciblé, trois candidates.
- **boto3 embarqué** dans le paquet Lambda (22 Mo), l'API S3 Vectors étant récente.

### D-020 — Sessions enregistrées rejouées au lieu de démos en libre accès — Acceptée (2026-10-28, modifie D-001, D-005, D-009)
- **Constat** : laisser les visiteurs interroger les RAG en direct coûte de l'hébergement et des appels LLM, impose quotas, captcha et plafond de coût, et limite le choix des outils à ce qui tient en serverless sur AWS.
- **Décision** : chaque réalisation est montrée par des **sessions réelles enregistrées puis rejouées** dans le lecteur du site. On enregistre le flux d'événements exact (`status`, `token`, `citation`, `artifact`, `trace`, `done`) d'un vrai passage du RAG, dans un fichier JSON par question et par langue. Le lecteur le rejoue côté navigateur avec le rythme d'origine. Le visiteur peut cliquer sur les citations et ouvrir les coulisses. Aucun serveur, aucun appel LLM.
- **Pourquoi pas une simple vidéo** : le rejeu est interactif, léger, lisible par les moteurs de recherche, bilingue, et régénérable à chaque amélioration. Une **courte vidéo** par réalisation est produite en plus à partir du rejeu (Playwright, FR et EN), pour l'accueil, LinkedIn et Malt.
- **Honnêteté** : chaque session affiche « Session réelle enregistrée le … — modèle … — coût mesuré … ». Aucune réponse écrite à la main. Les scores publiés viennent du banc d'évaluation.
- **Démo en direct sur rendez-vous** : pour un prospect, le RAG est lancé depuis le poste du porteur ou déployé temporairement (Terraform), puis supprimé.
- **Conséquences** :
  - **D-001** : le budget récurrent tombe à **≈ 1 €/mois** (nom de domaine). Les coûts deviennent ponctuels (ingestion, enregistrement, mesure).
  - **D-005** : quotas, captcha et plafond de coût deviennent optionnels. Le code existant (`rag_core.guard`) est conservé pour le mode direct.
  - **D-009** : le streaming en ligne n'est plus un prérequis du site.
  - **Cycle des réalisations AWS** (01, 04, 05) : déployer → ingérer → enregistrer → mesurer → `terraform destroy`. Le Terraform reste dans le dépôt comme preuve de déployabilité.
  - **Démo 01, mode « déposez votre PDF »** : il n'est plus ouvert au public. Il est montré par une session enregistrée sur un PDF public, et proposé en direct sur rendez-vous.

### D-021 — « Réalisations » plutôt que « démos », sans les présenter comme des missions clients — Acceptée (2026-10-28)
- Sur le site, les démos deviennent des **réalisations** (en anglais : *projects*), présentées comme des études de cas : besoin, solution, stack, résultats mesurés, code.
- Chaque fiche porte la mention **« Projet personnel, construit de bout en bout sur données publiques — code ouvert »**. Aucune formulation ne laisse croire à une mission pour un client (pas de « client : … », pas de logo d'entreprise, pas de « référence »). Raisons : crédibilité face aux prospects qui demandent des références, et interdiction des pratiques commerciales trompeuses.
- Le « cas client » de chaque fiche est formulé comme **le type de besoin traité** (« Pour une direction juridique qui… »).
- Dans le code et les documents internes, le terme « démo » et les dossiers `demos/NN-…` restent inchangés.

### D-022 — Stacks diversifiées pour couvrir les mots-clés des offres — Acceptée (2026-10-28, modifie D-002, D-007 et la stack de 02, 03, 06, 07, 08, 09)
- **Objectif** : chaque mot-clé fréquent dans les offres doit être démontré par au moins une réalisation, et affiché sous forme de badges.
  - Frameworks : LangChain, LlamaIndex, Haystack.
  - Modèles : GPT, Mistral, Llama, Claude, Gemini.
  - Bases vectorielles : FAISS, Weaviate, Qdrant, pgvector, Neo4j, S3 Vectors, Azure AI Search.
  - Intégrations : SharePoint / Microsoft 365, Google Drive.
  - Contraintes : RGPD, souveraineté, AI Act.
  - Clouds : AWS, Azure, GCP.
- **Rendu possible par D-020** : sans hébergement permanent, chaque réalisation peut utiliser la stack la plus pertinente, en local (GPU RTX 2080 SUPER 8 Go, Docker, Ollama) ou sur les offres d'essai Azure et GCP.
- **Répartition** : voir la matrice de [02-catalogue-rag.md](02-catalogue-rag.md). AWS reste le cloud principal (01, 04, 05, et l'appoint de 03), en lien avec la certification DEA.
- **Réalisations déjà écrites (01, 04, 05)** : stack AWS inchangée, sans framework (SDK natifs). C'est montré comme un choix (« je sais aussi m'en passer »).
- **Offres d'essai** :
  - Azure : 200 $ valables **30 jours** → tout préparer en local avant d'ouvrir le compte (06).
  - GCP : 300 $ sur **90 jours** (09).
  - Les deux sont à ouvrir au moment de la réalisation concernée, pas avant.

## Questions ouvertes

| # | Question | Quand trancher | Options |
|---|---|---|---|
| Q-1 | ~~Région AWS~~ Résolu : **eu-west-3 (Paris)**, voir D-016 | — | — |
| Q-2 | Domaine | Avant la mise en ligne publique (fin semaine 2) | Marque retenue le 2026-10-26 : **Rag4you** (mot-symbole avec le « 4 » en pastille dorée). Site provisoire : ragforyou.netlify.app. Reste le nom de domaine (ex. rag4you.fr / .com, à vérifier) |
| Q-3 | Budget ponctuel d'ingestion de ~70 à 120 € | Avant la Phase 2 | Financé par les **crédits AWS** (100 $ disponibles, jusqu'à ~200 $ avec les activités) — voir D-011 |
| Q-8 | Couverture de Claude (modèle tiers) par les crédits | Phase 0 | **Non confirmée** → petit appel Claude sur Bedrock, puis vérifier la facture du lendemain. Si non couvert : Amazon Nova pour l'ingestion en masse |
| Q-4 | Licences des corpus 03 (FinanceBench CC BY-NC, DEU) et 09 (vidéos) | Avant chaque démo | Voir [02-catalogue-rag.md](02-catalogue-rag.md) |
| Q-5 | ~~Neo4j AuraDB Free se met en pause~~ Sans objet depuis D-020 / D-022 : Neo4j tourne en local (Docker) le temps de l'enregistrement | — | — |
| Q-12 | Accès à un tenant SharePoint / Microsoft 365 pour la réalisation 06 | Avant la réalisation 06 | Le bac à sable gratuit du Microsoft 365 Developer Program est réservé à certains profils depuis 2026 (abonnés Visual Studio, partenaires). Piste : essai d'un mois de Microsoft 365 Business, à vérifier. Repli : connecteur Microsoft Graph testé sur OneDrive personnel |
| Q-13 | Compatibilité de l'essai Azure (30 jours) avec Azure OpenAI et Azure AI Search (palier gratuit) | Avant la réalisation 06 | À vérifier sur les pages de tarifs ; préparer et tester la réalisation en local avant d'ouvrir le compte |
| Q-6 | Langfuse Cloud ou traces uniquement maison | Phase 1 | Langfuse apporte une interface reconnue par les clients ; traces maison suffisent pour le site |
| Q-7 | Support du français par la détection PII (Comprehend, Bedrock Guardrails) | Démo 08 | Presidio + modèle spaCy français en principal |
| Q-9 | Où faire tourner les modèles IBM Granite (intrinsics, Guardian), STAIR (Mistral 7B affiné) et ColQwen, qui demandent idéalement un GPU, avec un budget < 30 €/mois ? Piste AWS pour STAIR : Bedrock Custom Model Import (facturé à l'activité) | Démos 02, 03, 06, 09 | (a) Benchmark calculé hors ligne sur un GPU local ou loué à l'heure, résultats publiés, réponses précalculées pour les questions d'exemple, vérification en direct par Bedrock Guardrails ; (b) endpoint GPU qui s'éteint quand il ne sert pas (démarrage lent) ; (c) petits modèles quantifiés sur CPU (Lambda), lents. Préférence : (a). **ColQwen (démo 05) : option (a) retenue, voir D-018** |
| Q-10 | ~~L'utilisateur dispose-t-il d'un GPU NVIDIA en local ?~~ Résolu : **oui, RTX 2080 SUPER (8 Go)**, constaté le 2026-10-28. Pas de bfloat16 (architecture Turing) : float16, à vérifier sur ColQwen | — | — |
| Q-11 | ~~Quelle « méthode IBM » ?~~ Résolu : **STAIR** (arXiv 2609.03874), placée dans la démo 03. Les RAG intrinsics / Granite Guardian restent dans la démo 02 | — | — |
