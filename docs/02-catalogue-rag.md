# 02 — Catalogue des 10 démos RAG

Chaque démo répond à un **type de mission réellement demandé** (lettres A à O → voir [01-etude-marche.md](01-etude-marche.md)) et apporte **au moins une compétence nouvelle** par rapport aux précédentes. Les numéros suivent l'ordre de réalisation conseillé : on va du plus simple au plus avancé.

## Vue d'ensemble

| # | Nom (provisoire) | Cas client | Documents | Volume | Technique phare | Stockage vectoriel | Services AWS data mis en avant |
|---|---|---|---|---|---|---|---|
| 01 | Assistant Entrepreneurs | PME : chatbot documentaire livré vite | Fiches web (XML/HTML) + upload PDF du visiteur | ~3 000 fiches | RAG **managé** (Bedrock Knowledge Bases) | S3 Vectors | S3, Bedrock KB, DynamoDB TTL |
| 02 | Revue de contrats | Cabinet / direction juridique (EN) | Contrats longs (TXT/PDF) | 510 contrats | **Hybride BM25 + vecteurs, reranking**, citations surlignées | pgvector (Aurora Serverless v2) | Aurora, RDS Data API, Step Functions |
| 03 | Analyste financier | Finance / audit | Rapports annuels PDF avec **tableaux** | ~50 rapports, ~10 000 pages | **STAIR (IBM) : recherche guidée par la table des matières**, tableaux, outil de calcul | S3 Vectors | Textract, Glue (catalogue), Step Functions |
| 04 | Data lake conversationnel | ETI / data team | **Données tabulaires** (open data) | ~20 M lignes | **Text-to-SQL** + RAG sur le catalogue de schémas | S3 Vectors (schémas) | **Glue ETL, Glue Catalog, Athena, Lake Formation**, Parquet |
| 05 | Veille scientifique | Labo, pharma, veille | Résumés d'articles | **~1 M documents**, mise à jour quotidienne | **Gros volume, ingestion incrémentale**, filtres de métadonnées | S3 Vectors | **Step Functions Distributed Map, Bedrock batch, EventBridge**, SQS |
| 06 | Documentation technique | Industrie, maintenance | **PDF scannés**, schémas, figures | ~100 rapports, ~4 000 pages | **OCR + RAG multimodal vs recherche visuelle (ColPali)** | S3 Vectors | Textract, S3 events, Lambda |
| 07 | Support client agentique | Startup SaaS / e-commerce | FAQ, catalogue, commandes, tickets | Petit, multi-sources | **Agent (LangGraph)**, outils, guardrails, passage à un humain | S3 Vectors + DynamoDB | DynamoDB Streams, EventBridge, Bedrock Guardrails |
| 08 | Analyse d'incidents (GraphRAG) | Assurance, sécurité, qualité | Rapports d'accidents (texte + données) | ~3 000 rapports | **GraphRAG** : graphe d'entités, questions globales | Neo4j AuraDB Free + vecteurs | Glue, Athena (données NTSB), Step Functions |
| 09 | RAG souverain & confidentiel | Banque, RH, santé, grands comptes | Dossiers internes fictifs avec **données personnelles** | ~2 000 documents | **Détection/masquage PII, contrôle d'accès par rôle**, LLM européen | Qdrant Cloud (free tier) | Lake Formation (concept), KMS, CloudTrail, Macie (concept) |
| 10 | Réunions & vidéos | PME, collectivités, formation | **Audio / vidéo** | ~10 h d'enregistrements | **Transcription + RAG horodaté** (lecture au bon moment) | S3 Vectors | Transcribe, Step Functions, S3 events |

## Deuxième axe : une contrainte client, une technique récente, une preuve mesurée

Chaque démo répond aussi à une **contrainte** typique d'un client et montre une **technique récente** (2024-2026) qui y répond. Elle est toujours **comparée à une approche de base**, avec un résultat chiffré sur le site. Le message n'est pas « j'utilise la dernière méthode à la mode », mais « je sais quand elle vaut le coup, et je le prouve ».

| # | Contrainte client | Technique récente | Comparée à | Preuve affichée |
|---|---|---|---|---|
| 01 | « Il me faut ça vite et pas cher » | **CAG** (Cache-Augmented Generation) pour le PDF déposé par le visiteur : document entier dans le contexte + cache de prompt, sans RAG | RAG classique sur le même PDF | Qualité équivalente ou meilleure, latence et coût par question. Message : « parfois, pas besoin de RAG » |
| 02 | « Zéro hallucination, c'est du juridique » | **Couche anti-hallucination à la IBM** (*RAG intrinsics* / Granite Guardian) : vérification d'« answerability » avant de répondre, risque d'hallucination phrase par phrase, citations générées après coup, refus motivé | Même pipeline sans vérification ; vérification par **Bedrock Guardrails (contextual grounding check)** ; LLM-juge | Taux d'hallucination, taux de refus à tort, sur les questions CUAD (dont des questions sans réponse ajoutées exprès) |
| 03 | « Mes documents font des centaines de pages, le RAG ramène le mauvais passage » | **STAIR** (IBM, sept. 2026) : un petit modèle affiné lit la table des matières et désigne la bonne section, au lieu de découper le document en morceaux ; comparé à une **navigation par table des matières sans entraînement** (un LLM raisonne sur le sommaire) | RAG vectoriel classique + Contextual Retrieval | Recall@1 de la section, puis exactitude des réponses FinanceBench (le papier IBM n'évalue pas les réponses : c'est notre apport) |
| 04 | « Les chiffres doivent être exacts » | Text-to-SQL avec **plusieurs requêtes candidates + sélection**, auto-correction guidée par l'exécution, couche sémantique (glossaire métier) | Une seule requête générée | Exactitude des résultats sur 40 questions de référence |
| 05 | « On a des millions de documents, le coût doit rester bas » | **Embeddings Matryoshka** (dimensions réduites) + **quantification binaire** avec re-scoring, **self-query** (filtres de métadonnées extraits de la question) | Vecteurs pleine taille, sans filtre | Courbe coût / stockage / recall@10 / latence |
| 06 | « Nos documents sont des scans et des schémas » | OCR + description des figures par un modèle de vision **vs recherche visuelle** (ColPali / ColQwen : on indexe l'image de la page, sans extraire le texte) | Chaque méthode sur des documents propres et sur des scans dégradés | D'après une étude de 2025, la recherche visuelle gagne sur les documents propres et l'OCR sur les scans dégradés. On le vérifie, pour savoir choisir selon les documents |
| 07 | « L'assistant doit agir, et ne jamais inventer » | **Corrective RAG** (évaluation des passages récupérés, reformulation, recherche de repli) + **Adaptive RAG** (choix : pas de recherche / une recherche / plusieurs étapes) ; outils exposés via **MCP** | Agent qui cherche systématiquement une seule fois | Taux de bonne résolution, nombre d'appels LLM, coût par conversation |
| 08 | « Mes questions portent sur l'ensemble du corpus, pas sur un passage » | **GraphRAG** (Microsoft) vs **LightRAG** vs **RAPTOR** (arbre de résumés, sans graphe) | RAG vectoriel classique | Exhaustivité des réponses aux questions globales, coût d'indexation de chaque méthode |
| 09 | « Rien ne sort de chez nous » | **Petits modèles ouverts installables chez le client** (Mistral, IBM Granite sous licence Apache 2.0) + garde-fous locaux (Granite Guardian), détection de PII, contrôle d'accès par rôle | Même cas avec un gros modèle dans le cloud | Qualité perdue (ou non) en passant au local, matériel nécessaire, absence de fuite entre rôles |
| 10 | « Des heures d'enregistrement, on veut retrouver le bon moment » | **Résumés hiérarchiques** (séance → sujet → passage) + recherche avec contrainte temporelle (« lors de la dernière réunion ») | Découpage à taille fixe | Précision du timestamp cité (±30 s) |

Les techniques sont **à confirmer par un prototype** avant d'être annoncées sur le site. Si une technique ne donne rien de mieux que l'approche de base, on le publie quand même. Un résultat négatif bien expliqué est aussi une preuve d'expertise.

### Méthode phare et personnage de chaque démo (D-013)

| # | Méthode phare | Famille | Badge | Source |
|---|---|---|---|---|
| 01 | CAG + RAG managé | Recherche | Éprouvé | Chan et al., déc. 2024 (arXiv 2412.15605) |
| 02 | Vérification anti-hallucination (type Granite Guardian) | Vérification | Récent | IBM Research, déc. 2024 (arXiv 2412.07724) |
| 03 | STAIR, recherche guidée par la table des matières (variante sans entraînement) | Structure | Récent | IBM Research, sept. 2026 (arXiv 2609.03874) |
| 04 | Text-to-SQL multi-candidats | Vérification | Récent | CHASE-SQL, Google Cloud et Stanford, oct. 2024 (arXiv 2410.01943) |
| 05 | Recherche compressée : Matryoshka + quantification | Recherche | Récent | Kusupati et al., mai 2022 (arXiv 2205.13147) |
| 06 | Recherche visuelle ColPali face à l'OCR | Multimodal | Récent | Faysse et al., juil. 2024 (arXiv 2407.01449) |
| 07 | RAG correctif et adaptatif (agent) | Agents | Récent | Yan et al., janv. 2024 (arXiv 2401.15884) ; Jeong et al., mars 2024 (arXiv 2403.14403) |
| 08 | GraphRAG / LightRAG / RAPTOR | Structure | Récent | Microsoft Research, avr. 2024 (arXiv 2404.16130) ; arXiv 2410.05779 ; arXiv 2401.18059 |
| 09 | Modèles ouverts installés chez le client | Souveraineté | Éprouvé | Mistral 7B, sept. 2023 (arXiv 2310.06825) |
| 10 | Résumés hiérarchiques horodatés | Multimodal | Éprouvé | Pratique d'ingénierie |
| — | RAG classique (référence) | — | Éprouvé | Lewis et al., mai 2020 (arXiv 2005.11401) |

Les techniques décrites plus bas restent valables : la méthode phare est ce que la démo met en avant sur le site (fiche personnage, duel contre le RAG classique).

Éléments **communs à toutes les démos** (construits une fois, dans le socle) :
- **Couche de fiabilité** réutilisable (née dans la démo 02) : vérification « peut-on répondre ? », contrôle de fondement phrase par phrase, refus motivé. Les vérificateurs sont interchangeables : Bedrock Guardrails, LLM-juge, Granite Guardian.
- Réponse en streaming avec **citations cliquables** (document, page ou timestamp, extrait).
- Bouton « Voir les coulisses » : chunks récupérés, scores, prompt, latence, coût de la question.
- **Banc d'évaluation** commun (jeu de questions, métriques de récupération et de réponse), résultats publiés sur la page de la démo.
- Quotas, captcha, plafond de coût (voir [03-architecture.md](03-architecture.md)).

---

## 01 — Assistant Entrepreneurs (RAG managé, livré vite)

**Cas client.** Une PME veut un assistant qui répond à partir de sa documentation, avec sources, livré en quelques jours et peu coûteux à faire tourner. Offres D, E, K : « chatbot sur nos PDF », « sources annotées », « panneau d'upload ».

**Corpus.** Fiches pratiques « Professionnels » de service-public.fr (open data DILA, Licence Ouverte 2.0) : création d'entreprise, TVA, embauche, aides… Environ 3 000 fiches en XML, en français.

**Ce que ça démontre.**
- Savoir **ne pas sur-construire** : quand un service managé suffit, on l'utilise.
- Mode **« Testez avec vos documents »** : le visiteur dépose un PDF (≤ 20 pages, ≤ 5 Mo), pose ses questions, le document est supprimé au bout d'une heure. C'est l'argument de vente le plus direct.

**Pipeline.** Téléchargement de l'archive DILA → Lambda de conversion XML → Markdown propre + métadonnées (thème, date de mise à jour) → S3 → synchronisation Bedrock Knowledge Base (découpage hiérarchique intégré). Upload visiteur : S3 (préfixe de session) → ingestion directe dans la KB avec métadonnée `session_id` → filtre par session à la requête → suppression programmée (DynamoDB TTL + Lambda).

**Retrieval & génération.** API `RetrieveAndGenerate` de Bedrock, filtre de métadonnées, citations natives.

**Modèles.** Embeddings Titan Text v2, génération Claude Haiku (Bedrock).

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

**Pipeline.** S3 → Step Functions : extraction texte → découpage structuré (sections, clauses) avec métadonnées (partie, type de contrat, date) → embeddings → Aurora PostgreSQL (pgvector + index plein texte `tsvector`).

**Retrieval & génération.** Requête vectorielle + requête plein texte → fusion RRF (Reciprocal Rank Fusion) → reranking (Cohere Rerank ou Amazon Rerank via Bedrock) → génération avec citations. Filtres SQL sur les métadonnées.

**Stockage.** Aurora Serverless v2 **avec mise en veille à 0 ACU** (coût ≈ stockage seul), interrogé via **RDS Data API** pour éviter de mettre la Lambda dans un VPC (pas de NAT Gateway). Réveil ~15 s : message « base en cours de réveil » côté site.

**Évaluation.** Recall@k, MRR calculés automatiquement grâce aux annotations CUAD ; fidélité des réponses par LLM-juge.

**Coût estimé.** Ingestion < 3 €. Fonctionnement : stockage Aurora < 1 €/mois, rerank ~0,1 cent/question.

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
- **Mise en œuvre AWS** : génération des questions d'entraînement avec Bedrock (batch) ; affinage LoRA sur un GPU loué à l'heure (job SageMaker en instance spot, ou GPU local) ; service en ligne via **Bedrock Custom Model Import** (facturé seulement quand le modèle est actif, démarrage à froid) ou réponses précalculées. Disponibilité régionale et coût de Custom Model Import à vérifier. Sans génération contrainte côté Bedrock, la sortie est rapprochée de la section existante la plus proche.
- **Valeur commerciale** : implémenter un papier IBM d'un mois et compléter son évaluation fait un excellent article technique.

Le traitement des tableaux reste au programme : tableaux convertis en Markdown et résumés. La recherche visuelle (ColPali) passe dans la démo 06.

**Corpus.** Rapports annuels (10-K) de sociétés américaines du sous-ensemble open-source de **FinanceBench**, qui fournit aussi des questions/réponses de référence. Compléments possibles : quelques documents d'enregistrement universel (DEU) français. **Licences à vérifier** (FinanceBench est en CC BY-NC).

**Ce que ça démontre.**
- Le vrai problème du RAG en entreprise : **le parsing**. Comparaison publiée de 3 parseurs (extraction texte brute / **Docling** open-source / **Amazon Textract** avec tableaux et mise en page) sur les mêmes questions.
- Tableaux convertis en Markdown + résumé textuel du tableau indexé.
- **Contextual retrieval** : chaque chunk est enrichi d'une phrase de contexte générée par LLM (société, année, section) avant l'embedding.
- **Outil de calcul** : le LLM ne fait pas les calculs de tête, il appelle une fonction (variations, ratios).

**Pipeline.** S3 → Step Functions (Map par document) → parsing (Textract asynchrone ou Docling en Lambda conteneur) → découpage par section → contextualisation (LLM léger) → embeddings → S3 Vectors. Métadonnées dans le Glue Data Catalog (société, exercice, type de document).

**Évaluation.** Questions FinanceBench : exactitude des chiffres, avec et sans contextual retrieval, par parseur.

**Coût estimé.** Ingestion 20 à 40 € (Textract sur les pages à tableaux seulement + contextualisation). Fonctionnement : quelques centimes par jour.

---

## 04 — Data lake conversationnel (Text-to-SQL)

**Cas client.** Une ETI dont les données sont dans un data lake veut que les métiers posent des questions en langage naturel : « Prix médian au m² des appartements à Lyon en 2024, par arrondissement ? ». Offre G (sorties structurées) et demande fréquente « parler à ses données ». **C'est la démo la plus directement liée à la certification Data Engineer.**

**Corpus.** **DVF** (Demandes de valeurs foncières, data.gouv.fr, Licence Ouverte) : ~20 millions de transactions immobilières sur 5 ans. Option : jointure avec des données INSEE.

**Ce que ça démontre.**
- Un vrai pipeline data : CSV bruts → **Glue ETL** (nettoyage, typage) → **Parquet partitionné** (année, département) → **Glue Crawler / Data Catalog** → **Athena**.
- **RAG sur les métadonnées** : on indexe les descriptions de tables et colonnes, des exemples de requêtes validées et un glossaire métier ; le LLM récupère seulement ce qui est pertinent pour écrire la requête.
- **Garde-fous SQL** : requête en lecture seule (rôle **Lake Formation** limité), validation syntaxique, limite de données scannées par le **workgroup Athena**, auto-correction en cas d'erreur.
- Réponse = texte + tableau + graphique + **la requête SQL affichée**.

**Pipeline d'interrogation.** Question → récupération schémas/exemples → génération SQL (sortie structurée) → validation → Athena → si erreur, correction (2 essais max) → synthèse.

**Évaluation.** ~40 questions avec la requête de référence : exactitude du résultat (comparaison des résultats, pas du texte SQL).

**Coût estimé.** Ingestion < 2 € (Glue quelques minutes). Fonctionnement : Athena ~0,005 €/question grâce au partitionnement, stockage < 0,10 €/mois.

---

## 05 — Veille scientifique à grande échelle (volume + incrémental)

**Cas client.** Laboratoire, service de veille, pharma : interroger **des centaines de milliers** de publications, avec filtres (date, domaine) et **mise à jour chaque jour**. Offres B, J : pipelines d'ingestion, littérature scientifique.

**Corpus.** Métadonnées **arXiv** (CC0) : environ 1 million de résumés (informatique, statistiques, physique) + flux quotidien des nouveaux articles via l'API OAI-PMH.

**Ce que ça démontre.**
- **Industrialisation** : chargement initial avec **Step Functions Distributed Map** et **Bedrock batch inference** (embeddings à -50 %), reprise sur erreur, idempotence.
- **Incrémental** : EventBridge (quotidien) → récupération des nouveautés → déduplication (hash) → embeddings → upsert. Gestion des versions d'articles.
- **Filtres de métadonnées** combinés à la recherche vectorielle à grande échelle.
- Tableau de bord public : nombre de documents, dernière mise à jour, coût d'ingestion par million de documents, latence p95.

**Stockage.** S3 Vectors (conçu pour des milliards de vecteurs à bas coût). Données sources en Parquet sur S3, cataloguées dans Glue, interrogeables par Athena (statistiques du corpus).

**Évaluation.** Jeu de questions généré puis relu (synthèse de questions à partir d'articles connus), recall@k ; test de charge léger.

**Coût estimé.** Ingestion initiale 5 à 10 € (embeddings en batch). Fonctionnement : stockage ~0,50 €/mois, mise à jour quotidienne < 0,05 €/jour.

**Risques.** Quotas Bedrock batch (délais), coût d'une erreur sur gros volume → tester sur 10 000 documents avant le lancement complet.

---

## 06 — Documentation technique (OCR + multimodal)

**Cas client.** Industriel avec des manuels et rapports anciens **scannés**, pleins de **schémas** : « Quelle est la procédure de remplacement de la pièce X ? Montre-moi le schéma. ». Offres H, I : OCR, documents scannés, multimodal.

**Corpus.** **NASA Technical Reports Server** (documents de la NASA, domaine public aux États-Unis) : sélection d'une centaine de rapports, dont des scans anciens des années 60-80 et des rapports récents avec figures.

**Ce que ça démontre.**
- **OCR** avec Amazon Textract (texte + mise en page) et contrôle qualité (score de confiance, pages à revoir).
- **Multimodal** : chaque figure est extraite, décrite par un modèle de vision (Claude), et indexée ; la réponse **affiche l'image** de la figure citée.
- Comparaison : réponses avec et sans les figures.
- **Recherche visuelle (ColPali / ColQwen)** : l'image de chaque page est indexée directement (plusieurs vecteurs par page, stockés dans Qdrant, qui gère ce format). Comparaison avec la chaîne OCR, sur des rapports récents propres et sur des scans anciens dégradés. Index calculé sur un GPU, une seule fois, sur un sous-ensemble de pages pour tenir dans l'offre gratuite de Qdrant.

**Pipeline.** Dépôt S3 → événement S3 → Step Functions : détection scan ou natif → Textract si scan → extraction des figures → description par vision → chunks texte + chunks figures → embeddings → S3 Vectors.

**Évaluation.** Questions dont la réponse est uniquement dans une figure ou un tableau scanné.

**Coût estimé.** Ingestion 15 à 35 € (Textract + descriptions d'images). Fonctionnement : quelques centimes par jour.

---

## 07 — Support client agentique

**Cas client.** Startup SaaS ou e-commerce : un assistant qui répond aux clients à partir de la FAQ, **consulte le catalogue et le statut des commandes**, **refuse de deviner** et **passe la main à un humain** si besoin. Offres A, L, M : agents, LangGraph, guardrails, escalade.

**Corpus.** Entreprise **fictive** (clairement signalée) : centre d'aide en Markdown, catalogue produits, commandes et historique de tickets, générés pour l'occasion.

**Ce que ça démontre.**
- **Agent LangGraph** : routage entre recherche documentaire, outils (catalogue, commande via API simulée), demande de précision, escalade.
- **Bedrock Guardrails** : sujets interdits, filtrage de données personnelles, détection de réponses non fondées.
- **Synchronisation** : modification d'un article d'aide → événement → réindexation de ce seul article (DynamoDB Streams / S3 events).
- Escalade : création d'un ticket visible dans un mini « back-office » de la démo.
- Mémoire de conversation courte.

**Modèles.** Claude via Bedrock pour l'agent ; démonstration d'un second fournisseur (**OpenAI**) interchangeable par configuration, car beaucoup d'offres internationales l'imposent.

**Évaluation.** Scénarios de conversation : bon outil appelé, refus correct hors périmètre, escalade déclenchée au bon moment.

**Coût estimé.** Ingestion < 1 €. Fonctionnement : plus cher par question (plusieurs appels LLM) → quota plus bas sur cette démo.

---

## 08 — Analyse d'incidents (GraphRAG)

**Cas client.** Assureur, service qualité, sécurité industrielle : « Quels facteurs reviennent le plus dans les accidents en phase d'approche ? », « Quels incidents impliquent à la fois tel type d'appareil et tel problème de maintenance ? ». Ce sont des questions **globales** ou **à plusieurs sauts**, où le RAG vectoriel classique échoue. Offre O : graphe de connaissances, Neo4j.

**Corpus.** Base d'accidents aéronautiques du **NTSB** (domaine public, États-Unis) : données structurées + récits d'enquête. Sélection d'environ 3 000 rapports.

**Ce que ça démontre.**
- Extraction d'entités et de relations par LLM (appareil, phase de vol, cause, facteur, lieu) avec schéma imposé.
- Graphe dans **Neo4j** ; détection de communautés et résumés de communautés pour les questions globales.
- **Comparaison côte à côte** sur le site : même question, RAG vectoriel vs GraphRAG.
- Les données structurées NTSB passent par Glue/Athena et servent à **valider** les entités extraites (qualité de données).

**Stockage.** Neo4j AuraDB Free + index vectoriel. Risque : mise en pause de l'instance gratuite en cas d'inactivité → alternative documentée dans [06-decisions.md](06-decisions.md).

**Évaluation.** Questions globales notées par LLM-juge (exhaustivité, diversité) + questions factuelles vérifiables par Athena.

**Coût estimé.** Ingestion 10 à 25 € (extraction par LLM léger). Fonctionnement : quelques centimes par jour.

---

## 09 — RAG souverain & confidentiel

**Cas client.** Banque, RH, santé, administration : documents contenant des **données personnelles**, accès différent selon le rôle, exigences **RGPD / AI Act**, souvent refus des LLM américains. Offres A, I, K : guardrails, données sensibles, LLM local, contrôle d'accès par rôle.

**Corpus.** Dossiers internes **fictifs** d'une entreprise (fiches RH, notes, procédures, comptes rendus) générés avec de fausses données personnelles réalistes.

**Ce que ça démontre.**
- **Détection et masquage des données personnelles** à l'ingestion (Presidio pour le français ; Amazon Comprehend pour l'anglais), avec rapport de ce qui a été masqué.
- **Contrôle d'accès par rôle** : chaque chunk porte ses droits ; sur le site, le visiteur choisit un rôle (employé, manager, RH) et voit des réponses différentes à la même question.
- **Journal d'audit** : qui a demandé quoi, quels documents ont été utilisés.
- **LLM européen** : Mistral (API hébergée en Europe) pour la génération et les embeddings.
- **Variante on-premise** fournie dans le dépôt : `docker compose` avec Ollama + Qdrant, pour montrer qu'on peut tout faire tourner chez le client sans cloud.
- Chiffrement KMS, logs CloudTrail, documentation de conformité type (fiche AI Act / analyse RGPD simplifiée).

**Stockage.** Qdrant Cloud (offre gratuite, région Europe) : montre un 3e type de base vectorielle, souvent demandée.

**Évaluation.** Tests de fuite : aucune réponse ne doit contenir une donnée d'un document hors des droits du rôle ; taux de détection des données personnelles.

**Coût estimé.** Ingestion < 3 €. Fonctionnement : quelques centimes par jour.

---

## 10 — Réunions & vidéos

**Cas client.** PME, organisme de formation, collectivité : « Qu'a-t-on décidé sur le budget lors des dernières réunions ? » avec **lien vers le moment exact** de l'enregistrement. Offre F : RAG sur réunions et documents, extraits exacts.

**Corpus.** Enregistrements publics réutilisables (candidats : séances publiques du Parlement européen ou de conseils municipaux, conférences sous licence CC BY). **Licence à vérifier** avant de choisir. Environ 10 heures.

**Ce que ça démontre.**
- **Amazon Transcribe** avec identification des intervenants.
- Découpage par tour de parole et par sujet, horodatage conservé.
- Réponse avec citation **cliquable qui lance la vidéo au bon moment**.
- Résumés et décisions extraits automatiquement par réunion (sortie structurée).

**Pipeline.** Dépôt du fichier sur S3 → Step Functions → Transcribe → découpage → embeddings → S3 Vectors ; résumés stockés dans DynamoDB.

**Évaluation.** Questions avec timestamp de référence : la citation tombe-t-elle à ±30 s du bon moment ?

**Coût estimé.** Ingestion ~15 € (Transcribe ≈ 0,024 $/min). Fonctionnement : quelques centimes par jour.

---

## Idées en réserve (si une démo pose problème)

- Connecteurs SaaS (Notion, Google Drive, Confluence) avec synchronisation : demandé dans l'offre E.
- RAG sur code source (documentation de projet open-source).
- RAG multilingue (question en anglais sur documents en français et inversement), intégrable dans 01 ou 05.
- Extraction structurée de factures / formulaires vers JSON (proche du RAG, très demandé sur Upwork).
