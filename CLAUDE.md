# CLAUDE.md — Repère pour les sessions Claude Code

Ce fichier sert de point d'entrée à chaque nouvelle session. Le lire en premier, puis le document pertinent dans [docs/](docs/).

## Le projet en une phrase

Un site vitrine bilingue (FR/EN) pour vendre des services freelance spécialisés en RAG, avec **10 démos RAG testables en ligne**, chacune illustrant un cas client réel (type de documents, volume, contrainte technique différents), construites principalement sur AWS.

## Profil du porteur de projet

- Développeur confirmé (Python), **débutant en RAG** : expliquer les choix techniques, ne pas supposer de connaissances LLM avancées.
- Prépare la certification **AWS Certified Data Engineer – Associate (DEA-C01)** : chaque démo doit mobiliser des services AWS data de façon justifiée (voir [docs/04-aws-data-engineer-et-rag.md](docs/04-aws-data-engineer-et-rag.md)).
- Disponible à temps plein, horizon 1 à 2 mois.

## Contraintes fortes (ne pas violer sans en discuter)

| Contrainte | Valeur |
|---|---|
| Budget d'hébergement récurrent | **< 30 €/mois** tout compris (cloud + appels LLM) |
| LLM | **AWS Bedrock en principal**, + Mistral et OpenAI ponctuellement |
| IaC | **Terraform** |
| Front | **Next.js**, bilingue FR/EN, hébergé sur **Netlify** (API des démos sur AWS) |
| Accès aux démos | Libre, protégé par **quotas + captcha (Cloudflare Turnstile)** + plafond de coût global |
| Code | **Dépôt GitHub public** : code propre, documenté, sans secret |
| Data engineering | Mis en avant sur le site (schémas de pipeline, métriques) |
| Clients visés | PME/ETI françaises, international, startups/SaaS |

Conséquence budget : **pas de service "always-on" coûteux** (OpenSearch Serverless, Kendra, Neptune, Fargate permanent, NAT Gateway). Tout est serverless ou « scale-to-zero ».

## Carte des documents

| Fichier | Contenu |
|---|---|
| [docs/00-vision-et-contexte.md](docs/00-vision-et-contexte.md) | Objectifs, cibles, réponses aux questions de cadrage |
| [docs/01-etude-marche.md](docs/01-etude-marche.md) | Analyse des offres RAG réelles et ce qu'elles demandent |
| [docs/02-catalogue-rag.md](docs/02-catalogue-rag.md) | Les 10 démos : cas client, corpus, technique, services AWS |
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

Voir la checklist dans [docs/05-roadmap.md](docs/05-roadmap.md). Au 2026-10-26 : plan rédigé ; site vitrine en construction dans `web/` (catalogue, fiches démo et méthodes faits ; lecteur de démo, pages commerciales et SEO à venir). Dépôt public : https://github.com/ThomasBruniquel/rag-demos (commits avec l'adresse noreply GitHub).

Compte AWS : Free plan, 100 $ de crédits, plan gratuit jusqu'au 2027-04-08. **Ne jamais inscrire le compte dans AWS Organizations** (perte des crédits). Passer en Paid plan avant les ingestions coûteuses (voir D-011 dans [docs/06-decisions.md](docs/06-decisions.md)).
