# 04 — Pourquoi la certification AWS Data Engineer sert à construire des RAG

## L'idée clé

Un RAG, c'est **un moteur de recherche alimenté par un pipeline de données**, avec un LLM au bout. La partie LLM (le prompt, l'appel au modèle) représente une petite part du travail. L'essentiel, et ce qui fait la qualité d'un RAG en production, c'est :

- **récupérer** les documents là où ils sont (S3, bases, SaaS, flux) ;
- les **transformer** (parsing, OCR, nettoyage, découpage, enrichissement de métadonnées) ;
- les **stocker** dans les bons formats et index ;
- les **tenir à jour** (incrémental, suppression, versions) ;
- les **sécuriser** (droits d'accès, données personnelles, chiffrement, audit) ;
- **surveiller** le tout (erreurs, coûts, qualité).

C'est exactement le programme de la certification **AWS Certified Data Engineer – Associate (DEA-C01)**. Un « RAG de démo » se fait en un après-midi ; un RAG qui tient en production chez un client, c'est du data engineering. C'est aussi ce qui distingue un freelance des centaines de profils qui ont suivi un tutoriel LangChain.

## Les 4 domaines de l'examen appliqués au RAG

| Domaine DEA-C01 (poids indicatif) | En RAG, ça sert à… | Services | Démos |
|---|---|---|---|
| **1. Ingestion et transformation des données** (~34 %) | Charger des documents en batch ou en continu, les parser, les découper, calculer les embeddings, orchestrer et rejouer les pipelines | S3, Lambda, **Step Functions**, **Glue ETL**, EventBridge, SQS, Kinesis (concept), Textract, Transcribe | Toutes ; surtout 04, 05, 09 |
| **2. Gestion des stockages de données** (~26 %) | Choisir où stocker vecteurs, textes et métadonnées ; formats (Parquet), partitionnement, catalogue, cycle de vie | **S3 Vectors**, Aurora/pgvector, DynamoDB, **Glue Data Catalog**, S3 lifecycle, Athena | 02, 04|
| **3. Opérations et support** (~22 %) | Supervision des pipelines, gestion des erreurs, qualité des données, coûts, requêtes analytiques | CloudWatch, Step Functions (retries), **Athena**, Glue Data Quality, AWS Budgets | 04, 07 |
| **4. Sécurité et gouvernance** (~18 %) | Qui a le droit de voir quel document, masquage des données personnelles, chiffrement, traçabilité | IAM, **Lake Formation**, KMS, CloudTrail, Macie, Comprehend (PII) | 04, 08 |

> Les pondérations sont celles du guide d'examen public tel que connu ; vérifier la version en vigueur sur la page officielle de la certification.

## Ce que chaque démo te fait pratiquer pour l'examen

| Démo | Notions DEA travaillées |
|---|---|
| 01 | S3 (préfixes, lifecycle), DynamoDB TTL, ingestion événementielle |
| 02 | Hors AWS depuis D-022 (Haystack, Weaviate en local) : modélisation des métadonnées, recherche hybride |
| 03 | Textract asynchrone (pages à tableaux) ; le reste en local (LlamaIndex, FAISS) depuis D-022 |
| 04 | **Glue ETL PySpark (mode Flex), Parquet, partitionnement, projection de partitions (et pourquoi pas de Glue Crawler), Athena (workgroups, plafond de données lues, coûts), Lake Formation (enregistrement S3, autorisations par table, rôle sans accès S3), Step Functions (Map, intégrations .sync Glue et Athena, contrôle des données)** |
| 05 | S3 Event Notifications, traitement asynchrone, contrôle qualité des données extraites |
| 06 | Sur Azure depuis D-022 : synchronisation incrémentale (API delta de Microsoft Graph), notions transposables à AWS |
| 07 | En local depuis D-022 : qualité de données (validation des entités extraites avec DuckDB, le même SQL qu'Athena) |
| 08 | Sur site depuis D-022 : masquage PII, droits par rôle (principes de Lake Formation transposés aux chunks), journal d'audit |
| 09 | Sur GCP depuis D-022 : pipelines multi-étapes, synchronisation depuis Google Drive |

## Comment le montrer sur le site

- Chaque page de démo a une section **« Pipeline de données »** : schéma Step Functions, volumes traités, durée, coût, gestion des erreurs.
- Une page **« Data engineering pour l'IA »** explique cette idée aux prospects (version simplifiée de ce document).
- Le badge de certification, une fois obtenue, est affiché à côté des démos qui l'illustrent.
