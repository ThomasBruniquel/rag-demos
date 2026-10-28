# 05 — Feuille de route

Horizon : **8 semaines à temps plein**. Principe : **mettre le site en ligne tôt** (fin de semaine 2) avec une première démo, puis ajouter les démos une par une. Un site avec 3 démos solides vaut mieux que 10 démos à moitié finies.

## Phases

### Phase 0 — Mise en place (2-3 jours)

- Hygiène du compte AWS : MFA sur root, utilisateur IAM admin avec MFA (**pas d'AWS Organizations**, cf. D-011), **AWS Budgets** avec alertes.
- **Crédits AWS** (cf. D-011) : en Free plan, réaliser les 5 activités bonus (budget, Bedrock playground, Lambda, RDS, EC2 — supprimer RDS et EC2 aussitôt) ; tester si Claude est couvert ; puis **passer en Paid plan** avant les ingestions coûteuses.
- Installer et configurer l'**AWS CLI** sur le poste (absente au 2026-10-26).
- Choix de la région (vérifier S3 Vectors, Bedrock KB, modèles) et activation des modèles Bedrock.
- Dépôt git + GitHub public, licence (MIT), `.gitignore`, structure du monorepo.
- Terraform : backend S3, rôle OIDC pour GitHub Actions.
- Comptes externes : OpenAI (02) ; Azure et GCP à ouvrir au moment des réalisations 06 et 09 (D-022). Turnstile seulement pour le mode direct. Qdrant, Neo4j, Weaviate tournent en local (Docker).
- Nom de marque et domaine provisoires.

### Phase 1 — Socle + première démo + site en ligne (semaines 1-2)

- `packages/rag_core` : client LLM unifié, streaming SSE, citations, traces et coût, quotas, Turnstile, plafond de coût.
- Banc d'évaluation minimal (questions de référence, recall@k, LLM-juge).
- Modules Terraform réutilisables : `lambda_api`, `step_function_pipeline`, `s3_vectors_index`.
- Site Next.js : accueil, page catalogue, **composant lecteur commun**, pages FR/EN, déploiement Netlify.
- **Rejeu (D-020)** : lecteur qui rejoue les sessions enregistrées, script d'enregistrement commun (`rag_core.recording`), script vidéo Playwright (FR + EN).
- **Démo 01** complète (avec le mode upload).
- ✅ Jalon : site public avec 1 réalisation rejouable.

### Phase 2 — Réalisations (semaines 3-7, ~3-4 jours chacune)

Ordre conseillé (progression des compétences et valeur commerciale). Stacks : voir la matrice de [02-catalogue-rag.md](02-catalogue-rag.md) (D-022). Pour la 06, ouvrir l'essai Azure (30 jours) seulement quand tout tourne en local ; pour la 09, ouvrir l'essai GCP (90 jours) au début de la réalisation.

| Semaine | Démos | Pourquoi cet ordre |
|---|---|---|
| 3 | 02 Contrats, 03 Finance | Les fondamentaux du RAG « fait main » : découpage, hybride, rerank, parsing |
| 4 | 04 Data lake | Le cœur data engineering (et la révision DEA) |
| 5 | 05 Documentation technique, 08 Souverain | OCR/multimodal ; puis l'argument grands comptes |
| 6 | 06 Support agentique | Agents : s'appuie sur tout ce qui précède |
| 7 | 07 GraphRAG, 09 Réunions | Les plus différenciantes, les plus risquées en dernier |

Pour chaque réalisation, la définition de « terminé » (D-020) :
- [ ] Pipeline d'ingestion rejouable (Terraform pour le cloud, `docker compose` en local)
- [ ] Réalisation lancée (déploiement temporaire ou local) et ingestion faite
- [ ] 3 à 5 sessions d'exemple enregistrées, en FR et en EN
- [ ] Vidéo courte générée (FR + EN)
- [ ] Jeu d'évaluation + résultats publiés
- [ ] Coût d'ingestion et coût par question mesurés
- [ ] Ressources cloud supprimées (`terraform destroy`) après enregistrement
- [ ] README de la démo (besoin traité, choix techniques, ce qui n'a pas marché)
- [ ] Fiche du site FR + EN : schéma d'architecture, badges de la matrice des mots-clés, mention « projet personnel » (D-021)

### Phase 3 — Finitions et lancement (semaine 8)

- Pages offres, à propos, contact ; mentions légales et politique de confidentialité.
- SEO : métadonnées, sitemap, une page par réalisation bien référencée, page « Compétences » (mot-clé → réalisations).
- Articles techniques (1 par démo, réutilisables sur LinkedIn / Malt).
- Profil Malt et LinkedIn alignés avec le site.
- Relecture complète des coûts réels vs budget.

## Checklist d'avancement

Mettre à jour cette section au fil du projet.

### Phase 0
- [ ] Compte AWS sécurisé + Budgets
- [x] Crédits AWS vérifiés : 100 $, Free plan jusqu'au 2027-04-08
- [ ] Activités bonus faites (budget, Bedrock, Lambda, RDS, EC2)
- [ ] Couverture de Claude par les crédits testée
- [ ] Passage en Paid plan
- [ ] AWS CLI installée et configurée
- [x] Région choisie : eu-west-3, disponibilités vérifiées (D-016, 2026-10-27)
- [ ] Modèles Bedrock activés (premier appel à Claude Haiku 5.5 dans le playground)
- [ ] Dépôt GitHub créé
- [ ] Backend Terraform + OIDC (code de l'amorçage écrit dans `infra/bootstrap` : bucket d'état et budget ; à appliquer ; OIDC à faire)
- [ ] Comptes externes créés
- [ ] Nom provisoire

### Phase 1
- [ ] rag_core : événements SSE, quotas, sessions, plafond de coût, traces, streaming Bedrock, citations faits (2026-10-27) ; reste la couche de fiabilité et le client Mistral / OpenAI
- [ ] Banc d'évaluation : évaluation de la recherche faite (démo 01) ; reste la notation des réponses par LLM-juge
- [ ] Modules Terraform communs : `lambda_api` et `guard_table` faits ; `step_function_pipeline` et `s3_vectors_index` à extraire quand une 2e démo en aura besoin
- [x] Site Next.js déployé (https://ragforyou.netlify.app, version en cours de construction, 2026-10-26)
- [ ] Démo 01 : code, tests, Terraform et jeu de 25 questions faits (2026-10-27) ; reste le déploiement, la mesure, le branchement au lecteur du site
  - [x] Pipeline d'ingestion en Terraform, rejouable
  - [ ] Déployée temporairement, ingestion faite
  - [ ] 3 à 5 sessions d'exemple enregistrées (FR + EN) + vidéo
  - [ ] Jeu d'évaluation + résultats publiés (25 questions ; référence BM25 mesurée)
  - [ ] Coût d'ingestion et coût par question mesurés
  - [x] README de la démo
  - [ ] Page du site FR + EN avec schéma d'architecture (existe, chiffres à remplacer par les mesures)

### Phase 2
- [ ] 02 Revue de contrats
- [ ] 03 Analyste financier
- [ ] 04 Data lake conversationnel : code, tests, Terraform (dont Lake Formation), couche sémantique et 40 questions de référence faits, lac reconstruit et requêtes vérifiées en local sur les données réelles (2026-10-28) ; reste le déploiement, l'ingestion, la mesure et le branchement au lecteur du site
- [ ] 05 Documentation technique : code, tests, Terraform, corpus (70 rapports) et 18 questions faits (2026-10-28) ; reste le déploiement, l'ingestion, ColQwen sur le GPU local, la mesure et le branchement au lecteur du site
  - [x] Pipeline d'ingestion en Terraform, rejouable
  - [ ] Déployée temporairement, ingestion faite
  - [ ] 3 à 5 sessions d'exemple enregistrées (FR + EN) + vidéo (questions choisies dans `eval/examples.json`)
  - [ ] Jeu d'évaluation + résultats publiés (18 questions sur 40)
  - [ ] Coût d'ingestion et coût par question mesurés
  - [x] README de la démo
  - [ ] Page du site FR + EN avec schéma d'architecture (mise à jour, chiffres à mesurer)
- [ ] 06 Support client agentique
- [ ] 07 GraphRAG incidents
- [ ] 08 RAG souverain
- [ ] 09 Réunions & vidéos

### Bascule « réalisations rejouées » (D-020, D-021, D-022)
- [x] Décisions et plan mis à jour (2026-10-28)
- [x] Site : « Démos » → « Réalisations », mention « projet personnel », badges par catégorie, filtre par mot-clé, page « Compétences » (2026-10-28 ; redirections 301 depuis `/demos/`)
- [x] Lecteur de rejeu + format d'enregistrement JSON (2026-10-28 ; validation au build, variantes, côte à côte, mode direct si une URL d'API est définie)
- [ ] Script d'enregistrement (`rag_core.recording`) et script vidéo (Playwright) : script vidéo fait (`web/scripts/record-video.mjs`, 2026-10-28) ; reste `rag_core.recording`
- [x] Page Confidentialité : retirer le dépôt de PDF public, décrire le mode direct sur rendez-vous (2026-10-28)

### Phase 3
- [x] Pages commerciales et éditoriales : offres, à propos, contact (Netlify Forms), qu'est-ce qu'un RAG, data engineering, mentions légales, confidentialité (2026-10-26 ; adresse et SIRET à compléter dans `web/site.config.ts`)
- [ ] SEO : sitemap, robots.txt et données structurées faits (2026-10-26) ; reste le domaine définitif et le suivi dans Search Console
- [ ] Articles
- [ ] Lancement
