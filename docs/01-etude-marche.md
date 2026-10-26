# 01 — Étude des offres RAG réelles

Recherche faite le 2026-10-26 sur Malt, Codeur.com, Upwork, Collective.work et des offres d'emploi. Les offres citées servent à choisir les sujets des démos, pas à mesurer précisément le marché.

## Tendances générales

- Selon le **Malt Tech Trends 2026** (relayé par Le Monde Informatique) : 45 % des demandes IA concernent l'intégration/orchestration de LLM, **35 % le développement de systèmes RAG**, 15 % les agents IA. Les **PME** tirent la croissance.
- TJM indicatifs en France (baromètre TJMetre 2026, source secondaire) : médiane IA générative autour de **790 €/jour**. Les offres observées vont de 350 à 525 €/jour pour des profils RAG/Bedrock.
- Sur Upwork, les petites missions RAG « chatbot sur PDF » sont très concurrencées (50+ propositions, budgets de 30 à 400 $). **Il faut se différencier par la complexité traitée**, pas par le chatbot de base.

## Offres analysées et ce qu'elles demandent

| # | Source | Contexte | Exigences clés |
|---|---|---|---|
| A | Collective.work (via The Intelligence Academy) | Freelance, banque, Paris, TJM 525 | Chaînes RAG industrialisées, agents, **jeux d'évaluation**, monitoring, **guardrails**, contrôle des hallucinations, traçabilité, **AI Act / RGPD**, LangChain/LangGraph, **Bedrock** |
| B | Offre CDI Toulouse (AI Engineer LLM/RAG) | RAG Bot hébergé sur AWS | **Pipelines d'ingestion**, recherche vectorielle, intégration **Bedrock** |
| C | Offres AWS GenAI (Capgemini, Jobgether, AWS AI Architect) | International | Bedrock **Agents** et **Knowledge Bases**, serverless, **OpenSearch**, IAM/VPC/KMS |
| D | Codeur.com (2025) | PME : chatbot sur PDF | **Sources annotées dans le document d'origine**, budget 1 000 à 10 000 € |
| E | Codeur.com (2025) | Chatbot interne RH/IT | Sources **Notion, PDF, Google Drive**, authentification légère, budget 500 à 1 000 € |
| F | Codeur.com (2025) | Package Python RAG sur **réunions** et documents | **Extraits exacts** justifiant chaque réponse, architecture réutilisable |
| G | Codeur.com (août 2026) | Ingénieur IA, Toulouse | LLM en production : agents, RAG, **sorties structurées** |
| H | Upwork | RAG sur contrats, rapports, PDF | **OCR pour les scans**, extraction qui préserve la structure, métadonnées, **recherche hybride + reranking**, citations document + page |
| I | Upwork | Chatbot RAG avec **LLM local** | Parsing PDF, chunking, recherche vectorielle, **OCR**, hybride en bonus |
| J | Upwork | Base de connaissances **littérature médicale** | Ingestion d'articles, résumés structurés, **réponses citées** |
| K | Upwork | Chatbot interne (OpenAI) | **Panneau d'upload admin**, **contrôle d'accès par rôle**, délai d'une semaine |
| L | Upwork | Support client n8n, WhatsApp + site | FAQ + docs produit, **refuser de deviner**, **passage à un humain**, log en CRM |
| M | Upwork | AI Systems Architect | **Agentic AI, LangGraph**, pipelines RAG |
| N | Offres « RAG engineer » (US) | Emploi | **Hybride dense + BM25, reranker cross-encoder**, **évaluation** (recall, MRR, LLM-as-judge, détection de régression), multimodal (tableaux, images) en différenciateur |
| O | ClearanceJobs, services Upwork | GraphRAG | **Graphe de connaissances** (Neo4j), workflows agentiques sur graphe |

## Compétences les plus demandées → couverture par les démos

| Compétence demandée | Fréquence | Démo(s) qui la prouve(nt) |
|---|---|---|
| Citations précises (document, page, extrait surligné) | Très forte | Toutes, mise en avant en 01, 02 |
| Ingestion de PDF complexes, tableaux | Forte | 03, 06 |
| OCR de documents scannés | Forte | 06 |
| Recherche hybride + reranking | Forte | 02, 03 |
| Évaluation et métriques de qualité | Forte (missions sérieuses) | Toutes (banc d'évaluation commun) |
| Bedrock Knowledge Bases / Agents | Forte (AWS) | 01, 07 |
| Agents, LangGraph, outils | Forte | 07, 04 |
| Guardrails, anti-hallucination, « je ne sais pas » | Forte | 07, 09 |
| Contrôle d'accès par rôle, données sensibles, RGPD | Moyenne à forte (grands comptes) | 09 |
| LLM local / souverain | Moyenne | 09 |
| Gros volume, mise à jour continue | Moyenne (souvent implicite) | 05 |
| Données structurées (SQL) | Moyenne | 04 |
| Réunions, audio, vidéo | Faible à moyenne | 10 |
| GraphRAG | Faible mais différenciant | 08 |
| Upload de ses propres documents | Moyenne | 01 (mode « testez avec vos documents ») |

## Sources

- [Le Monde Informatique — demande en compétences agentiques](https://www.lemondeinformatique.fr/actualites/lireamp-la-demande-en-competence-agentique-bondit-de-60-en-france-99943.html)
- [findskill.ai — IA pour freelances (TJM)](https://findskill.ai/fr/ia-pour-freelances/)
- [Offre IA Engineer GenAI AWS freelance (banque)](https://www.the-intelligence-academy.com/job-board/offre/ia-engineer-generative-ai-engineer-aws-freelance-collective-work-40177)
- [Jobgether — Senior LLM Engineer (RAG & AWS Bedrock)](https://jobs.lever.co/jobgether/a52db2b4-aee0-453e-8491-0cfd0462dd37)
- [Capgemini — AWS Generative AI Engineer](https://careers.capgemini.com/job/columbia%2c-sc-aws-generative-ai-engineer-sc-29201/1419429133/)
- [Codeur.com — chatbot LLM RAG PDF](https://www.codeur.com/projects/450763-recherche-developpeur-experimente-en-chatbots-llm-rag-pdf-openai)
- [Codeur.com — chatbot IA interne](https://www.codeur.com/projects/458260-creation-d-u-chat-bot-ia-interne-a-l-entreprise)
- [Codeur.com — package Python RAG sur réunions et docs](https://www.codeur.com/projects/456597-package-python-chatbot-rag-sur-reunions-docs)
- [Codeur.com — ingénieur IA Toulouse](https://www.codeur.com/projects/488857-ingenieur-ia-freelance-pour-mission-longue-duree-sur-toulouse)
- [Upwork — RAG Document Intelligence, Q&A cité sur PDF](https://www.upwork.com/freelance-jobs/apply/Engineer-for-RAG-Document-Intelligence-System-Source-Cited-over-PDFs-LangChain-Python_~022072443196784145229/)
- [Upwork — ML engineer, chatbot et recherche documentaire](https://www.upwork.com/jobs/~022069471951620117993)
- [Upwork — base RAG littérature médicale](https://www.upwork.com/freelance-jobs/apply/Build-RAG-Knowledge-Base-for-Medical-Literature-PDFs_~022061644003304567240/)
- [Upwork — chatbot interne RAG (OpenAI)](https://www.upwork.com/freelance-jobs/apply/RAG-Based-Internal-Chatbot-Developer-OpenAI-API_~022069081382113510722/)
- [Upwork — support client n8n + RAG](https://www.upwork.com/freelance-jobs/apply/Support-Chatbot-Developer-n8n-RAG-Knowledge-Base-for-WhatsApp-Website_~022109719195596113872/)
- [Upwork — AI Systems Architect LangGraph](https://www.upwork.com/jobs/~022093632251730338229)
- [Weekday — RAG GenAI Engineer](https://jobs.weekday.works/rag-genai-engineer-at-empedance-wkdyxn4ldx)
- [ClearanceJobs — GraphRAG Engineer](https://www.clearancejobs.com/jobs/9074840/graphrag-engineer)
- [AWS — S3 Vectors disponible en GA](https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-s3-vectors-generally-available/)
- [AWS — tarifs S3 (dont S3 Vectors)](https://aws.amazon.com/s3/pricing/)
