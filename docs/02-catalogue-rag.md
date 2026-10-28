# 02 — Catalogue des 9 réalisations RAG

Chaque réalisation (appelée « démo » dans le code et les dossiers `demos/`) répond à un **type de mission réellement demandé** (lettres A à O → voir [01-etude-marche.md](01-etude-marche.md)) et apporte **au moins une compétence nouvelle** par rapport aux précédentes.

Depuis le 2026-10-28 :
- elles sont montrées sur le site par des **sessions réelles enregistrées et rejouées**, plus une courte vidéo (D-020) ;
- elles sont présentées comme des **réalisations personnelles sur données publiques** (D-021) ;
- leurs stacks sont **diversifiées** pour couvrir les mots-clés des offres (D-022).

## Matrice des mots-clés (D-022) — source de vérité pour les badges du site

| # | Réalisation | Cloud / exécution | Framework | Modèles | Base vectorielle | Intégration | Conformité mise en avant |
|---|---|---|---|---|---|---|---|
| 01 | Assistant Entrepreneurs | **AWS** | sans framework (SDK Bedrock, Knowledge Bases) | **Claude** | **S3 Vectors** | site web public, dépôt de PDF | **RGPD** (PDF supprimé en 1 h, durées de conservation) |
| 02 | Revue de contrats | local (Docker) | **Haystack** | **GPT** (OpenAI), **Granite Guardian** (local) | **Weaviate** (hybride natif) | — | **AI Act** (traçabilité, contrôle des hallucinations) |
| 03 | Analyste financier | local + **AWS** (Textract) | **LlamaIndex** | **Llama** (Ollama), Claude en comparaison | **FAISS** | — | — |
| 04 | Data lake conversationnel | **AWS** | sans framework (sqlglot) | **Claude** | **S3 Vectors** | Athena, Glue, Lake Formation | gouvernance des données (Lake Formation) |
| 05 | Documentation technique | **AWS** + GPU local | sans framework | **Claude**, **Cohere** | **S3 Vectors** | — | — |
| 06 | Support client agentique | **Azure** | **LangChain / LangGraph** | **GPT** (Azure OpenAI) | **Azure AI Search** | **SharePoint / Microsoft 365** (Microsoft Graph) | garde-fous, passage à un humain |
| 07 | Analyse d'incidents (GraphRAG) | local (Docker) | **LlamaIndex** (graphe de propriétés) + **LightRAG** | **Llama** / **Mistral** (Ollama) | **Neo4j** | — | — |
| 08 | RAG souverain & confidentiel | **sur site** (Docker Compose) | **LangChain** | **Mistral** (Ollama), Granite | **Qdrant** | — | **RGPD, souveraineté, AI Act** |
| 09 | Réunions & vidéos | **GCP** + GPU local | **Haystack** | **Gemini**, **Whisper** (local) | **pgvector** (Cloud SQL ou Postgres local) | **Google Drive** | **RGPD** (la voix est une donnée personnelle) |

Couverture : 3 clouds + sur site, 3 frameworks + sans framework, 6 familles de modèles, 7 bases vectorielles, 3 intégrations, 3 thèmes de conformité.

## Vue d'ensemble (cas client et technique)

| # | Nom (provisoire) | Cas client | Documents | Volume | Technique phare | Stockage vectoriel | Services AWS data mis en avant |
|---|---|---|---|---|---|---|---|
| 01 | Assistant Entrepreneurs | PME : chatbot documentaire livré vite | Fiches web (XML/HTML) + upload PDF du visiteur | 775 fiches | RAG **managé** (Bedrock Knowledge Bases) | S3 Vectors | S3, Bedrock KB, Step Functions, EventBridge Scheduler, DynamoDB |
| 02 | Revue de contrats | Cabinet / direction juridique (EN) | Contrats longs (TXT/PDF) | 510 contrats | **Hybride BM25 + vecteurs, reranking**, citations surlignées, vérification anti-hallucination | Weaviate | — (local) |
| 03 | Analyste financier | Finance / audit | Rapports annuels PDF avec **tableaux** | ~50 rapports, ~10 000 pages | **STAIR (IBM) : recherche guidée par la table des matières**, tableaux, outil de calcul | FAISS | Textract (tableaux) |
| 04 | Data lake conversationnel | ETI / data team | **Données tabulaires** (open data) | 20,4 M lignes, 7,3 M ventes | **Text-to-SQL** + RAG sur le catalogue de schémas | S3 Vectors (schémas) | **Glue ETL, Glue Catalog, Athena, Lake Formation**, Parquet |
| 05 | Documentation technique | Industrie, maintenance | **PDF scannés**, schémas, figures | 70 rapports, 3 450 pages | **OCR + RAG multimodal vs recherche visuelle (ColPali)** | S3 Vectors | Textract, S3 events, EventBridge, Step Functions, Lambda |
| 06 | Support client agentique | Startup SaaS / e-commerce | FAQ (SharePoint), catalogue, commandes, tickets | Petit, multi-sources | **Agent (LangGraph)**, outils, garde-fous, passage à un humain | Azure AI Search | — (Azure) |
| 07 | Analyse d'incidents (GraphRAG) | Assurance, sécurité, qualité | Rapports d'accidents (texte + données) | ~3 000 rapports | **GraphRAG** : graphe d'entités, questions globales | Neo4j (local) + vecteurs | — (local ; DuckDB pour valider les entités) |
| 08 | RAG souverain & confidentiel | Banque, RH, santé, grands comptes | Dossiers internes fictifs avec **données personnelles** | ~2 000 documents | **Détection/masquage PII, contrôle d'accès par rôle**, LLM européen | Qdrant (local) | — (sur site) |
| 09 | Réunions & vidéos | PME, collectivités, formation | **Audio / vidéo** (Google Drive) | ~10 h d'enregistrements | **Transcription + RAG horodaté** (lecture au bon moment) | pgvector | — (GCP) |

## Deuxième axe : une contrainte client, une technique récente, une preuve mesurée

Chaque démo répond aussi à une **contrainte** typique d'un client et montre une **technique récente** (2024-2026) qui y répond. Elle est toujours **comparée à une approche de base**, avec un résultat chiffré sur le site. Le message n'est pas « j'utilise la dernière méthode à la mode », mais « je sais quand elle vaut le coup, et je le prouve ».

| # | Contrainte client | Technique récente | Comparée à | Preuve affichée |
|---|---|---|---|---|
| 01 | « Il me faut ça vite et pas cher » | **CAG** (Cache-Augmented Generation) pour le PDF déposé par le visiteur : document entier dans le contexte + cache de prompt, sans RAG | RAG classique sur le même PDF | Qualité équivalente ou meilleure, latence et coût par question. Message : « parfois, pas besoin de RAG » |
| 02 | « Zéro hallucination, c'est du juridique » | **Couche anti-hallucination à la IBM** (*RAG intrinsics* / Granite Guardian) : vérification d'« answerability » avant de répondre, risque d'hallucination phrase par phrase, citations générées après coup, refus motivé | Même pipeline sans vérification ; vérification par **Bedrock Guardrails (contextual grounding check)** ; LLM-juge | Taux d'hallucination, taux de refus à tort, sur les questions CUAD (dont des questions sans réponse ajoutées exprès) |
| 03 | « Mes documents font des centaines de pages, le RAG ramène le mauvais passage » | **STAIR** (IBM, sept. 2026) : un petit modèle affiné lit la table des matières et désigne la bonne section, au lieu de découper le document en morceaux ; comparé à une **navigation par table des matières sans entraînement** (un LLM raisonne sur le sommaire) | RAG vectoriel classique + Contextual Retrieval | Recall@1 de la section, puis exactitude des réponses FinanceBench (le papier IBM n'évalue pas les réponses : c'est notre apport) |
| 04 | « Les chiffres doivent être exacts » | Text-to-SQL avec **plusieurs requêtes candidates + sélection**, auto-correction guidée par l'exécution, couche sémantique (glossaire métier) | Une seule requête générée | Exactitude des résultats sur 40 questions de référence |
| 05 | « Nos documents sont des scans et des schémas » | OCR + description des figures par un modèle de vision **vs recherche visuelle** (ColPali / ColQwen : on indexe l'image de la page, sans extraire le texte) | Chaque méthode sur des documents propres et sur des scans dégradés | D'après une étude de 2025, la recherche visuelle gagne sur les documents propres et l'OCR sur les scans dégradés. On le vérifie, pour savoir choisir selon les documents |
| 06 | « L'assistant doit agir, et ne jamais inventer » | **Corrective RAG** (évaluation des passages récupérés, reformulation, recherche de repli) + **Adaptive RAG** (choix : pas de recherche / une recherche / plusieurs étapes) ; outils exposés via **MCP** | Agent qui cherche systématiquement une seule fois | Taux de bonne résolution, nombre d'appels LLM, coût par conversation |
| 07 | « Mes questions portent sur l'ensemble du corpus, pas sur un passage » | **GraphRAG** (Microsoft) vs **LightRAG** vs **RAPTOR** (arbre de résumés, sans graphe) | RAG vectoriel classique | Exhaustivité des réponses aux questions globales, coût d'indexation de chaque méthode |
| 08 | « Rien ne sort de chez nous » | **Petits modèles ouverts installables chez le client** (Mistral, IBM Granite sous licence Apache 2.0) + garde-fous locaux (Granite Guardian), détection de PII, contrôle d'accès par rôle | Même cas avec un gros modèle dans le cloud | Qualité perdue (ou non) en passant au local, matériel nécessaire, absence de fuite entre rôles |
| 09 | « Des heures d'enregistrement, on veut retrouver le bon moment » | **Résumés hiérarchiques** (séance → sujet → passage) + recherche avec contrainte temporelle (« lors de la dernière réunion ») | Découpage à taille fixe | Précision du timestamp cité (±30 s) |

Les techniques sont **à confirmer par un prototype** avant d'être annoncées sur le site. Si une technique ne donne rien de mieux que l'approche de base, on le publie quand même. Un résultat négatif bien expliqué est aussi une preuve d'expertise.

### Méthode phare et personnage de chaque démo (D-013)

| # | Méthode phare | Famille | Badge | Source |
|---|---|---|---|---|
| 01 | CAG + RAG managé | Recherche | Éprouvé | Chan et al., déc. 2024 (arXiv 2412.15605) |
| 02 | Vérification anti-hallucination (type Granite Guardian) | Vérification | Récent | IBM Research, déc. 2024 (arXiv 2412.07724) |
| 03 | STAIR, recherche guidée par la table des matières (variante sans entraînement) | Structure | Récent | IBM Research, sept. 2026 (arXiv 2609.03874) |
| 04 | Text-to-SQL multi-candidats | Vérification | Récent | CHASE-SQL, Google Cloud et Stanford, oct. 2024 (arXiv 2410.01943) |
| 05 | Recherche visuelle ColPali face à l'OCR | Multimodal | Récent | Faysse et al., juil. 2024 (arXiv 2407.01449) |
| 06 | RAG correctif et adaptatif (agent) | Agents | Récent | Yan et al., janv. 2024 (arXiv 2401.15884) ; Jeong et al., mars 2024 (arXiv 2403.14403) |
| 07 | GraphRAG / LightRAG / RAPTOR | Structure | Récent | Microsoft Research, avr. 2024 (arXiv 2404.16130) ; arXiv 2410.05779 ; arXiv 2401.18059 |
| 08 | Modèles ouverts installés chez le client | Souveraineté | Éprouvé | Mistral 7B, sept. 2023 (arXiv 2310.06825) |
| 09 | Résumés hiérarchiques horodatés | Multimodal | Éprouvé | Pratique d'ingénierie |
| — | RAG classique (référence) | — | Éprouvé | Lewis et al., mai 2020 (arXiv 2005.11401) |

Les techniques décrites plus bas restent valables : la méthode phare est ce que la démo met en avant sur le site (fiche personnage, duel contre le RAG classique).

Éléments **communs à toutes les réalisations** :
- **Même format de sortie** pour toutes les stacks : le flux d'événements du contrat commun (`status`, `token`, `citation`, `artifact`, `trace`, `done`). Chaque réalisation, quel que soit son framework ou son cloud, l'écrit dans un **enregistrement JSON** rejoué par le site (D-020). Les réalisations en Python hors AWS réutilisent les modèles d'événements de `rag_core`.
- **Couche de fiabilité** réutilisable (née dans la réalisation 02) : vérification « peut-on répondre ? », contrôle de fondement phrase par phrase, refus motivé. Les vérificateurs sont interchangeables : Granite Guardian, LLM-juge, Bedrock Guardrails.
- **Citations cliquables** (document, page ou timestamp, extrait).
- Panneau « Coulisses » : chunks récupérés, scores, latence, coût de la question.
- **Banc d'évaluation** commun (jeu de questions, métriques de récupération et de réponse), résultats publiés sur la fiche.
- **Une fiche conformité** quand la réalisation en met une en avant (RGPD, AI Act, souveraineté).
- Quotas, captcha, plafond de coût : seulement pour le mode direct sur rendez-vous (voir [03-architecture.md](03-architecture.md)).

---

## 01 — Assistant Entrepreneurs (RAG managé, livré vite)

**Cas client.** Une PME veut un assistant qui répond à partir de sa documentation, avec sources, livré en quelques jours et peu coûteux à faire tourner. Offres D, E, K : « chatbot sur nos PDF », « sources annotées », « panneau d'upload ».

**Corpus.** Fiches pratiques « Professionnels » de service-public.fr (open data DILA, Licence Ouverte 2.0) : création d'entreprise, TVA, embauche, aides… 775 fiches en XML, en français (773 indexées après conversion ; le chiffre de ~3 000 du plan initial était faux).

**Ce que ça démontre.**
- Savoir **ne pas sur-construire** : quand un service managé suffit, on l'utilise.
- Mode **« Testez avec vos documents »** : un PDF déposé (≤ 20 pages, ≤ 5 Mo) est interrogé en CAG, puis supprimé au bout d'une heure. Depuis D-020, il est montré par une session enregistrée sur un PDF public et proposé **en direct sur rendez-vous**.

**Pipeline.** EventBridge Scheduler (mensuel) → Step Functions : Lambda (téléchargement de l'archive DILA, XML → Markdown propre + métadonnées, synchronisation S3 idempotente) → synchronisation de la Bedrock Knowledge Base (découpage hiérarchique 1 500 / 300 tokens) → contrôle du statut. Upload visiteur : formulaire S3 pré-signé (un dossier par document) → extraction du texte page par page → suppression au bout d'une heure par un rendez-vous EventBridge Scheduler (voir D-017).

**Retrieval & génération.** Fiches : API `Retrieve` de la Knowledge Base, puis Converse en streaming avec citations `[n]` (choisi plutôt que `RetrieveAndGenerate`, qui ne donne pas l'usage en tokens). PDF : document entier dans le prompt avec cache (CAG), citations `[p. n]`.

**Modèles.** Embeddings Titan Text v2 (1 024 dimensions), génération Claude Haiku 5.5 via le profil d'inférence EU.

**Évaluation.** ~50 questions écrites à la main sur les fiches + évaluation intégrée de Bedrock (RAG evaluation) pour comparer.

**Coût estimé.** Ingestion < 2 €. Fonctionnement : quelques centimes par jour.

**Risques.** Abus de l'upload (contenu illicite, coût) → limites strictes, captcha, suppression rapide, mention claire de non-conservation.

---

## 02 — Revue de contrats (hybride + reranking)

**Cas client.** Direction juridique ou cabinet anglophone qui veut interroger un fonds de contrats : « Quels contrats ont une clause de non-concurrence de plus de 2 ans ? », « Que dit le contrat X sur la résiliation ? ». Offres H, N : hybride, reranking, citations document + page.

**Corpus.** **CUAD** (Contract Understanding Atticus Dataset, CC BY 4.0) : 510 contrats commerciaux en anglais, annotés par des juristes sur 41 types de clauses. Les annotations servent de **vérité terrain** pour évaluer la récupération.

**Ce que ça démontre.**
- Construire son RAG **sans service managé** : découpage par clause/section, recherche hybride, reranking.
- **Pourquoi l'hybride compte** : les termes exacts (« indemnification », numéros d'articles, noms de parties) sont mal trouvés par les seuls vecteurs. Comparaison chiffrée vecteurs seuls / BM25 seul / hybride / hybride + reranking affichée sur le site.
- Citations avec **passage surligné** dans le contrat d'origine.

**Stack (D-022).** **Haystack** 2 (pipelines d'indexation et de requête), **Weaviate** en Docker (recherche hybride BM25 + vecteurs intégrée), génération par **GPT** (API OpenAI), vérification par **Granite Guardian** en local (Ollama, GPU 8 Go), reranker open-source (cross-encoder) en local.

**Pipeline.** Pipeline d'indexation Haystack : extraction texte → découpage structuré (sections, clauses) avec métadonnées (partie, type de contrat, date) → embeddings → Weaviate.

**Retrieval & génération.** Recherche hybride Weaviate (le paramètre `alpha` règle le poids mots-clés / vecteurs) → reranking → génération GPT avec citations → **vérification** (« peut-on répondre ? » avant, risque d'hallucination phrase par phrase après). Filtres sur les métadonnées.

**Conformité (AI Act).** Fiche publiée : journal de chaque réponse (passages utilisés, score de fondement, refus), explication du contrôle des hallucinations, place de ce type de système dans les catégories de risque de l'AI Act.

**Évaluation.** Recall@k, MRR calculés automatiquement grâce aux annotations CUAD ; fidélité des réponses par LLM-juge.

**Coût estimé.** Embeddings et vérification en local : 0 €. GPT pour l'évaluation et les enregistrements : quelques euros.

---

## 03 — Analyste financier (PDF complexes et tableaux)

**Cas client.** Analyste, auditeur, DAF : « Quelle est l'évolution de la marge opérationnelle de X entre 2023 et 2024 ? Compare avec Y. » Offres H, N : tableaux, structure préservée, multimodal en différenciateur.

**Technique phare : STAIR (IBM).** Source : *STAIR — STructure Aware Information Retriever*, IBM, arXiv 2609.03874 (septembre 2026).
- **Le problème visé** : les RAG classiques découpent les longs documents en morceaux de taille fixe et perdent leur structure (parties, chapitres, sections). Le mauvais passage remonte, et le LLM répond à côté.
- **Le principe** : un modèle (Mistral 7B affiné par LoRA) reçoit la question **et la table des matières** du document, puis génère le titre de la section qui contient la réponse. Il ne peut produire qu'un titre de section existant (génération contrainte). On envoie ensuite le texte de cette section au LLM qui rédige la réponse.
- **Résultats du papier** (sur 18 manuels ouverts) : Recall@1 de 82,6 %, contre 59,5 % pour BM25, 68,7 % pour un retriever dense classique et 45,6 % pour Claude Haiku 4.5 sans entraînement. Moins de 0,05 % de sections inventées (« hallucination » au sens du papier : citer une section qui n'existe pas).
- **Attention** : le papier mesure **uniquement la recherche de la bonne section, pas la qualité des réponses**. Il faut un document avec une table des matières, et un affinage par document ou famille de documents, à partir de questions synthétiques générées par LLM.
- **Pourquoi c'est adapté ici** : les rapports annuels (10-K) sont longs et ont une structure standardisée (Item 1, 1A, 7, 8…).
- **Comparaison publiée** : (1) RAG vectoriel + Contextual Retrieval ; (2) navigation par table des matières **sans entraînement** (un LLM via Bedrock parcourt le sommaire, à la manière de PageIndex) ; (3) STAIR affiné. Mesures : bonne section trouvée (Recall@1, Recall@3), puis **exactitude des réponses de bout en bout** sur FinanceBench, coût et latence.
- **Mise en œuvre (D-013, D-022)** : variante **sans entraînement**. **Llama** en local (Ollama) parcourt la table des matières, Claude (Bedrock) sert de point de comparaison. Orchestration **LlamaIndex**, index vectoriel de référence dans **FAISS**. Une version affinée fidèle au papier reste possible plus tard (GPU loué), mais elle n'est pas prévue.
- **Valeur commerciale** : implémenter un papier IBM d'un mois et compléter son évaluation fait un excellent article technique.

Le traitement des tableaux reste au programme : tableaux convertis en Markdown et résumés. La recherche visuelle (ColPali) passe dans la démo 06.

**Corpus.** Rapports annuels (10-K) de sociétés américaines du sous-ensemble open-source de **FinanceBench**, qui fournit aussi des questions/réponses de référence. Compléments possibles : quelques documents d'enregistrement universel (DEU) français. **Licences à vérifier** (FinanceBench est en CC BY-NC).

**Ce que ça démontre.**
- Le vrai problème du RAG en entreprise : **le parsing**. Comparaison publiée de 3 parseurs (extraction texte brute / **Docling** open-source / **Amazon Textract** avec tableaux et mise en page) sur les mêmes questions.
- Tableaux convertis en Markdown + résumé textuel du tableau indexé.
- **Contextual retrieval** : chaque chunk est enrichi d'une phrase de contexte générée par LLM (société, année, section) avant l'embedding.
- **Outil de calcul** : le LLM ne fait pas les calculs de tête, il appelle une fonction (variations, ratios).

**Pipeline.** Parsing (Docling en local ; **Textract** sur AWS pour les pages à tableaux, en comparaison) → extraction de la table des matières → découpage par section → contextualisation (LLM léger) → embeddings → FAISS. Le tout orchestré par LlamaIndex.

**Évaluation.** Questions FinanceBench : exactitude des chiffres, avec et sans contextual retrieval, par parseur.

**Coût estimé.** Ingestion 20 à 40 € (Textract sur les pages à tableaux seulement + contextualisation). Fonctionnement : quelques centimes par jour.

---

## 04 — Data lake conversationnel (Text-to-SQL)

**Cas client.** Une ETI dont les données sont dans un data lake veut que les métiers posent des questions en langage naturel : « Prix médian au m² des appartements à Lyon en 2024, par arrondissement ? ». Offre G (sorties structurées) et demande fréquente « parler à ses données ». **C'est la démo la plus directement liée à la certification Data Engineer.**

**Corpus.** **DVF géolocalisées** (Etalab d'après la DGFiP, data.gouv.fr, Licence Ouverte 2.0) : 20,4 millions de lignes, soit 7,3 millions de ventes de 2021 à 2025 (hors Alsace, Moselle et Mayotte). Jointure avec le référentiel des communes (population) et des départements de geo.api.gouv.fr (INSEE).

**Ce que ça démontre.**
- Un vrai pipeline data : CSV bruts → **Glue ETL** (nettoyage, typage, une ligne par vente) → **Parquet partitionné** (année, département) → **Glue Data Catalog** (tables déclarées par Terraform, projection de partitions, sans crawler : voir D-019) → **Athena**.
- **RAG sur les métadonnées** : on indexe les descriptions de tables et colonnes, des exemples de requêtes validées et un glossaire métier ; le LLM récupère seulement ce qui est pertinent pour écrire la requête.
- **Garde-fous SQL** : requête en lecture seule (rôle **Lake Formation** limité), validation syntaxique, limite de données scannées par le **workgroup Athena**, auto-correction en cas d'erreur.
- Réponse = texte + tableau + graphique + **la requête SQL affichée**.

**Pipeline d'interrogation.** Question → récupération schémas/exemples → génération SQL (sortie structurée) → validation → Athena → si erreur, correction (2 essais max) → synthèse.

**Évaluation.** ~40 questions avec la requête de référence : exactitude du résultat (comparaison des résultats, pas du texte SQL).

**Coût estimé.** Ingestion ≈ 0,15 $ (Glue Flex, 2 DPU, ~15 min), deux fois par an. Fonctionnement : Athena ≈ 0,02 à 0,1 centime par question grâce au partitionnement, modèle ≈ 0,2 centime, stockage ≈ 0,04 $/mois.

**Réalisation (2026-10-28).** Code, tests, Terraform, couche sémantique et 40 questions faits dans [demos/04-data-lake-conversationnel](../demos/04-data-lake-conversationnel/README.md) ; choix détaillés dans D-019.

---

## 05 — Documentation technique (OCR + multimodal)

**Cas client.** Industriel avec des manuels et rapports anciens **scannés**, pleins de **schémas** : « Quelle est la procédure de remplacement de la pièce X ? Montre-moi le schéma. ». Offres H, I : OCR, documents scannés, multimodal.

**Corpus.** **NASA Technical Reports Server** (documents de la NASA, usage public autorisé selon NTRS) : **70 rapports, 3 450 pages** sur des sujets d'essais et de maintenance, dont 37 scans de 1963 à 1985 et 33 rapports natifs de 2005 à 2025 (manifeste avec SHA-256 dans `demos/05-documentation-technique/corpus/`, voir D-018).

**Ce que ça démontre.**
- **OCR** avec Amazon Textract (texte + mise en page) et contrôle qualité (score de confiance, pages à revoir).
- **Multimodal** : chaque figure est extraite, décrite par un modèle de vision (Claude), et indexée ; la réponse **affiche l'image** de la figure citée.
- Comparaison : réponses avec et sans les figures.
- **Recherche visuelle** : l'image de chaque page est indexée directement. En direct, un vecteur par page avec **Cohere Embed v4** (Bedrock, S3 Vectors) ; **ColQwen** (famille ColPali, plusieurs vecteurs par page) est calculé une fois sur le GPU local pour le banc d'évaluation et les questions d'exemple, faute de pouvoir encoder chaque question en direct dans le budget (D-018 ; Qdrant n'est finalement pas utilisé). Comparaison avec la chaîne OCR, sur des rapports récents propres et sur des scans anciens dégradés.

**Pipeline.** Dépôt S3 → EventBridge → Step Functions, une exécution par rapport : détection scan ou natif page par page → Textract LAYOUT (texte des scans ; figures de tous les rapports, y compris les graphiques vectoriels des rapports natifs) → contrôle de la confiance OCR → découpe des figures → description par vision (Map) → chunks texte + chunks figures + images de pages → embeddings → S3 Vectors.

**Évaluation.** Questions dont la réponse est dans une figure, un tableau ou le texte, sur des scans et sur des rapports natifs ; mesure de la bonne page dans les 5 premières pour chacune des quatre voies (18 questions vérifiées au 2026-10-28, objectif 40).

**Coût estimé.** Ingestion ≈ 19 € (Textract ≈ 12 €, embeddings des images de pages ≈ 6 €, descriptions ≈ 1 €). Fonctionnement : moins d'un dixième de centime par question, stockage négligeable.

---

## 06 — Support client agentique

**Cas client.** Startup SaaS ou e-commerce : un assistant qui répond aux clients à partir de la FAQ, **consulte le catalogue et le statut des commandes**, **refuse de deviner** et **passe la main à un humain** si besoin. Offres A, L, M : agents, LangGraph, guardrails, escalade.

**Corpus.** Entreprise **fictive** (clairement signalée) : centre d'aide publié dans une **bibliothèque SharePoint**, catalogue produits, commandes et historique de tickets, générés pour l'occasion.

**Stack (D-022).** **Azure** : **Azure OpenAI** (GPT), **Azure AI Search** (index hybride), connecteur **Microsoft Graph** pour lire SharePoint. Agent **LangGraph** (écosystème **LangChain**). Accès au tenant SharePoint : voir Q-12. Essai Azure de 30 jours : préparer en local, puis ouvrir le compte pour indexer, enregistrer et mesurer (Q-13).

**Ce que ça démontre.**
- **Agent LangGraph** : routage entre recherche documentaire, outils (catalogue, commande via API simulée), demande de précision, escalade.
- **Garde-fous** : filtres de contenu d'Azure OpenAI, refus hors périmètre, contrôle de fondement par la couche de fiabilité commune.
- **Synchronisation** : modification d'un article dans SharePoint → détection par l'API delta de Microsoft Graph → réindexation de ce seul article.
- Escalade : création d'un ticket visible dans un mini « back-office » de la démo.
- Mémoire de conversation courte.

**Modèles.** GPT via Azure OpenAI pour l'agent ; Claude interchangeable par configuration, pour montrer l'indépendance vis-à-vis du fournisseur.

**Évaluation.** Scénarios de conversation : bon outil appelé, refus correct hors périmètre, escalade déclenchée au bon moment.

**Coût estimé.** Couvert par les 200 $ de l'essai Azure, si la fenêtre de 30 jours est bien préparée.

---

## 07 — Analyse d'incidents (GraphRAG)

**Cas client.** Assureur, service qualité, sécurité industrielle : « Quels facteurs reviennent le plus dans les accidents en phase d'approche ? », « Quels incidents impliquent à la fois tel type d'appareil et tel problème de maintenance ? ». Ce sont des questions **globales** ou **à plusieurs sauts**, où le RAG vectoriel classique échoue. Offre O : graphe de connaissances, Neo4j.

**Corpus.** Base d'accidents aéronautiques du **NTSB** (domaine public, États-Unis) : données structurées + récits d'enquête. Sélection d'environ 3 000 rapports.

**Ce que ça démontre.**
- Extraction d'entités et de relations par LLM (appareil, phase de vol, cause, facteur, lieu) avec schéma imposé.
- Graphe dans **Neo4j** ; détection de communautés et résumés de communautés pour les questions globales.
- **Comparaison côte à côte** sur le site : même question, RAG vectoriel vs GraphRAG.
- Les données structurées NTSB, chargées dans **DuckDB** en local, servent à **valider** les entités extraites (qualité de données).
- **Stack (D-022)** : **LlamaIndex** (graphe de propriétés) et **LightRAG**, modèles **Llama** / **Mistral** via Ollama, **Neo4j** en Docker. Tout en local, 0 € hors temps de calcul.

**Stockage.** Neo4j (Docker, local) avec son index vectoriel.

**Évaluation.** Questions globales notées par LLM-juge (exhaustivité, diversité) + questions factuelles vérifiables par Athena.

**Coût estimé.** Extraction par modèle local : 0 €, mais plusieurs heures de calcul sur le GPU. Réduire le corpus si c'est trop long.

---

## 08 — RAG souverain & confidentiel

**Cas client.** Banque, RH, santé, administration : documents contenant des **données personnelles**, accès différent selon le rôle, exigences **RGPD / AI Act**, souvent refus des LLM américains. Offres A, I, K : guardrails, données sensibles, LLM local, contrôle d'accès par rôle.

**Corpus.** Dossiers internes **fictifs** d'une entreprise (fiches RH, notes, procédures, comptes rendus) générés avec de fausses données personnelles réalistes.

**Ce que ça démontre.**
- **Détection et masquage des données personnelles** à l'ingestion (Presidio pour le français ; Amazon Comprehend pour l'anglais), avec rapport de ce qui a été masqué.
- **Contrôle d'accès par rôle** : chaque chunk porte ses droits ; sur le site, le visiteur choisit un rôle (employé, manager, RH) et voit des réponses différentes à la même question.
- **Journal d'audit** : qui a demandé quoi, quels documents ont été utilisés.
- **Tout sur site (D-022)** : `docker compose` avec **Ollama** (**Mistral**, Granite), **Qdrant**, l'API (**LangChain**) et une petite interface. Aucun appel à un service externe : c'est la version principale, pas une variante.
- Option documentée : même pile avec l'API Mistral hébergée en Europe, pour les clients qui acceptent un cloud européen.
- Chiffrement au repos, journal d'audit local, documentation de conformité type (analyse RGPD simplifiée, fiche AI Act, registre des traitements).

**Stockage.** Qdrant en Docker, sur la machine « du client ».

**Évaluation.** Tests de fuite : aucune réponse ne doit contenir une donnée d'un document hors des droits du rôle ; taux de détection des données personnelles.

**Coût estimé.** 0 € (tout en local).

---

## 09 — Réunions & vidéos

**Cas client.** PME, organisme de formation, collectivité : « Qu'a-t-on décidé sur le budget lors des dernières réunions ? » avec **lien vers le moment exact** de l'enregistrement. Offre F : RAG sur réunions et documents, extraits exacts.

**Corpus.** Enregistrements publics réutilisables (candidats : séances publiques du Parlement européen ou de conseils municipaux, conférences sous licence CC BY), déposés dans un dossier **Google Drive**. **Licence à vérifier** avant de choisir. Environ 10 heures.

**Stack (D-022).** **GCP** (essai de 90 jours) : **Gemini** pour les résumés et les réponses, **pgvector** sur Cloud SQL (ou Postgres local), connecteur **Google Drive**. Transcription par **Whisper** en local sur le GPU (gratuit), avec identification des intervenants. Orchestration **Haystack**.

**Ce que ça démontre.**
- **Whisper** (local) avec identification des intervenants.
- Découpage par tour de parole et par sujet, horodatage conservé.
- Réponse avec citation **cliquable qui lance la vidéo au bon moment**.
- Résumés et décisions extraits automatiquement par réunion (sortie structurée).

**Pipeline.** Nouveau fichier dans Google Drive → téléchargement → Whisper → découpage par tour de parole et par sujet → embeddings → pgvector ; résumés par réunion stockés à côté.

**Évaluation.** Questions avec timestamp de référence : la citation tombe-t-elle à ±30 s du bon moment ?

**Coût estimé.** Transcription locale : 0 €. Gemini et Cloud SQL couverts par l'essai GCP.

---

## Idées en réserve (si une démo pose problème)

- Connecteurs SaaS (Notion, Google Drive, Confluence) avec synchronisation : demandé dans l'offre E.
- RAG sur code source (documentation de projet open-source).
- RAG multilingue (question en anglais sur documents en français et inversement), intégrable dans 01 ou 05.
- Extraction structurée de factures / formulaires vers JSON (proche du RAG, très demandé sur Upwork).
