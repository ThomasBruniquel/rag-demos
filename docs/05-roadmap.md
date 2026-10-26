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
- Comptes externes : Cloudflare (Turnstile), Mistral, OpenAI, Qdrant Cloud, Neo4j Aura, Langfuse (optionnel).
- Nom de marque et domaine provisoires.

### Phase 1 — Socle + première démo + site en ligne (semaines 1-2)

- `packages/rag_core` : client LLM unifié, streaming SSE, citations, traces et coût, quotas, Turnstile, plafond de coût.
- Banc d'évaluation minimal (questions de référence, recall@k, LLM-juge).
- Modules Terraform réutilisables : `lambda_api`, `step_function_pipeline`, `s3_vectors_index`.
- Site Next.js : accueil, page catalogue, **composant lecteur de démo commun**, pages FR/EN, déploiement Netlify. Le lecteur fonctionne d'abord avec un backend simulé, puis on branche les vraies démos.
- **Démo 01** complète (avec le mode upload).
- ✅ Jalon : site public avec 1 démo testable.

### Phase 2 — Démos (semaines 3-7, ~3-4 jours par démo)

Ordre conseillé (progression des compétences et valeur commerciale) :

| Semaine | Démos | Pourquoi cet ordre |
|---|---|---|
| 3 | 02 Contrats, 03 Finance | Les fondamentaux du RAG « fait main » : découpage, hybride, rerank, parsing |
| 4 | 04 Data lake | Le cœur data engineering (et la révision DEA) |
| 5 | 05 Documentation technique, 08 Souverain | OCR/multimodal ; puis l'argument grands comptes |
| 6 | 06 Support agentique | Agents : s'appuie sur tout ce qui précède |
| 7 | 07 GraphRAG, 09 Réunions | Les plus différenciantes, les plus risquées en dernier |

Pour chaque démo, la définition de « terminé » :
- [ ] Pipeline d'ingestion en Terraform, rejouable
- [ ] API déployée, branchée au lecteur commun
- [ ] 3 à 5 questions d'exemple avec réponses en cache
- [ ] Jeu d'évaluation + résultats publiés
- [ ] Coût d'ingestion et coût par question mesurés
- [ ] README de la démo (cas client, choix techniques, ce qui n'a pas marché)
- [ ] Page du site FR + EN avec schéma d'architecture

### Phase 3 — Finitions et lancement (semaine 8)

- Pages offres, à propos, contact ; mentions légales et politique de confidentialité.
- SEO : métadonnées, sitemap, une page par démo bien référencée.
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
- [ ] Région choisie, modèles Bedrock activés
- [ ] Dépôt GitHub créé
- [ ] Backend Terraform + OIDC
- [ ] Comptes externes créés
- [ ] Nom provisoire

### Phase 1
- [ ] rag_core
- [ ] Banc d'évaluation
- [ ] Modules Terraform communs
- [x] Site Next.js déployé (https://ragforyou.netlify.app, version en cours de construction, 2026-10-26)
- [ ] Démo 01

### Phase 2
- [ ] 02 Revue de contrats
- [ ] 03 Analyste financier
- [ ] 04 Data lake conversationnel
- [ ] 05 Documentation technique
- [ ] 06 Support client agentique
- [ ] 07 GraphRAG incidents
- [ ] 08 RAG souverain
- [ ] 09 Réunions & vidéos

### Phase 3
- [x] Pages commerciales et éditoriales : offres, à propos, contact (Netlify Forms), qu'est-ce qu'un RAG, data engineering, mentions légales, confidentialité (2026-10-26 ; adresse et SIRET à compléter dans `web/site.config.ts`)
- [ ] SEO : sitemap, robots.txt et données structurées faits (2026-10-26) ; reste le domaine définitif et le suivi dans Search Console
- [ ] Articles
- [ ] Lancement
