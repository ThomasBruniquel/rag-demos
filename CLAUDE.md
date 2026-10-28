# CLAUDE.md — Repère pour les sessions Claude Code

Ce fichier sert de point d'entrée à chaque nouvelle session. Le lire en premier, puis le document pertinent dans [docs/](docs/).

## Le projet en une phrase

Un site vitrine bilingue (FR/EN), Rag4you, pour vendre des services freelance spécialisés en RAG. Il présente **9 réalisations RAG** (appelées « démos » dans le code), chacune répondant à un type de besoin réel (type de documents, volume, contrainte). Elles sont montrées par des **sessions réelles enregistrées et rejouées** sur le site (D-020), présentées comme des **projets personnels sur données publiques** (D-021), avec des **stacks diversifiées** (AWS, Azure, GCP, sur site ; LangChain, LlamaIndex, Haystack…) pour couvrir les mots-clés des offres (D-022).

## Profil du porteur de projet

- Développeur confirmé (Python), **débutant en RAG** : expliquer les choix techniques, ne pas supposer de connaissances LLM avancées.
- Prépare la certification **AWS Certified Data Engineer – Associate (DEA-C01)** : chaque démo doit mobiliser des services AWS data de façon justifiée (voir [docs/04-aws-data-engineer-et-rag.md](docs/04-aws-data-engineer-et-rag.md)).
- Disponible à temps plein, horizon 1 à 2 mois.

## Contraintes fortes (ne pas violer sans en discuter)

| Contrainte | Valeur |
|---|---|
| Budget récurrent | **≈ 1 €/mois** (nom de domaine) : aucun RAG ne tourne en permanence (D-020). Coûts ponctuels payés par les crédits AWS et les essais Azure / GCP |
| Stacks | Selon la **matrice des mots-clés** de [docs/02-catalogue-rag.md](docs/02-catalogue-rag.md) (D-022). AWS reste le cloud principal (certification DEA) |
| IaC | **Terraform** |
| Front | **Next.js**, bilingue FR/EN, hébergé sur **Netlify**, qui rejoue les sessions enregistrées |
| Présentation | « Réalisations », mention **« projet personnel — données publiques — code ouvert »**, jamais présentées comme des missions clients (D-021) |
| Mode direct | Seulement sur rendez-vous (local ou déploiement temporaire) ; quotas et captcha dans `rag_core.guard` pour ce cas |
| Code | **Dépôt GitHub public** : code propre, documenté, sans secret |
| Data engineering | Mis en avant sur le site (schémas de pipeline, métriques) |
| Clients visés | PME/ETI françaises, international, startups/SaaS |

Conséquences : **rien ne reste déployé**. Cycle cloud = déployer → ingérer → enregistrer → mesurer → détruire. Toujours éviter les services à coût fixe (OpenSearch Serverless, Kendra, Neptune, NAT Gateway) même pendant les déploiements temporaires. Essai Azure de 30 jours : préparer en local avant de l'ouvrir.

## Carte des documents

| Fichier | Contenu |
|---|---|
| [docs/00-vision-et-contexte.md](docs/00-vision-et-contexte.md) | Objectifs, cibles, réponses aux questions de cadrage |
| [docs/01-etude-marche.md](docs/01-etude-marche.md) | Analyse des offres RAG réelles et ce qu'elles demandent |
| [docs/02-catalogue-rag.md](docs/02-catalogue-rag.md) | Les 9 réalisations : matrice des mots-clés, besoin traité, corpus, technique, stack |
| [docs/03-architecture.md](docs/03-architecture.md) | Architecture globale, stack, structure du dépôt, budget, sécurité |
| [docs/04-aws-data-engineer-et-rag.md](docs/04-aws-data-engineer-et-rag.md) | Pourquoi la certif DEA sert à faire du RAG, mapping domaines → démos |
| [docs/05-roadmap.md](docs/05-roadmap.md) | Phases, ordre de réalisation, checklist d'avancement |
| [docs/06-decisions.md](docs/06-decisions.md) | Journal des décisions (ADR) et questions ouvertes |
| [docs/07-site-vitrine.md](docs/07-site-vitrine.md) | Pages du site, contenu, conversion, SEO |

## Conventions de travail

- Langue des documents et du site : français d'abord, anglais ensuite. Code, noms de variables et commits en anglais.
- Toute nouvelle décision structurante → ajouter une entrée dans [docs/06-decisions.md](docs/06-decisions.md).
- Mettre à jour la checklist de [docs/05-roadmap.md](docs/05-roadmap.md) quand une étape est terminée.
- Chaque démo vit dans `demos/NN-nom/` avec son propre README (cas client, choix techniques, résultats d'évaluation, coût).
- Python : `uv`, `ruff`, `pytest`, typage. Terraform : un module par démo + modules partagés.
- Jamais de secret dans le dépôt : SSM Parameter Store (SecureString) côté AWS, `.env` local ignoré par git.
- Vérifier la disponibilité des modèles Bedrock et de S3 Vectors dans la région avant d'écrire du code qui en dépend.

## État actuel

Voir la checklist dans [docs/05-roadmap.md](docs/05-roadmap.md). Au 2026-10-26 : plan rédigé ; site vitrine dans `web/` : catalogue de 9 démos, fiches démo et méthodes, pages éditoriales et commerciales, contact (Netlify Forms), sitemap faits ; « Réalisations », badges, page Compétences et lecteur de rejeu faits le 2026-10-28 (voir `web/README.md`). Code Python : workspace uv à la racine (`uv sync --all-packages`), bibliothèque commune `packages/rag_core`, démo 01 écrite et testée dans `demos/01-assistant-entrepreneurs` (pas encore déployée, voir son README) ; démo 05 (OCR contre recherche visuelle, corpus NASA) écrite et testée dans `demos/05-documentation-technique` au 2026-10-28, pas encore déployée ; démo 04 (Text-to-SQL sur DVF, Glue, Athena, Lake Formation) écrite et testée dans `demos/04-data-lake-conversationnel` au 2026-10-28, pas encore déployée. Région : eu-west-3 (D-016). Textes des pages éditoriales dans `web/content/pages/*.ts` (FR + EN typés). Dépôt public : https://github.com/ThomasBruniquel/rag-demos (commits avec l'adresse noreply GitHub).

Bascule du 2026-10-28 (D-020 à D-022) : plan et site adaptés ; reste le script d'enregistrement `rag_core.recording` (voir la checklist « Bascule » de la feuille de route).

Compte AWS : Free plan, 100 $ de crédits, plan gratuit jusqu'au 2027-04-08. **Ne jamais inscrire le compte dans AWS Organizations** (perte des crédits). Passer en Paid plan avant les ingestions coûteuses (voir D-011 dans [docs/06-decisions.md](docs/06-decisions.md)).
