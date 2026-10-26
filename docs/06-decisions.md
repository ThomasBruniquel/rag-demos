# 06 — Journal des décisions

Format : une entrée par décision structurante. Statut : **Acceptée**, **À confirmer**, **Remplacée**.

## Décisions

### D-001 — Budget de fonctionnement < 30 €/mois — Acceptée (2026-10-26)
Conséquence : uniquement du serverless ou du scale-to-zero ; plafond de coût LLM journalier ; pas d'OpenSearch Serverless, Kendra, Neptune, NAT Gateway, Fargate permanent.

### D-002 — Bedrock comme fournisseur LLM principal, Mistral et OpenAI en complément — Acceptée (2026-10-26)
Mistral pour l'argument souveraineté (démo 09), OpenAI parce que beaucoup d'offres internationales l'imposent (démo 07, en option interchangeable).

### D-003 — Terraform pour toute l'infrastructure — Acceptée (2026-10-26)

### D-004 — Next.js bilingue FR/EN, hébergé sur Netlify — Acceptée (2026-10-26, remplace « S3 + CloudFront »)
Choix de l'utilisateur. Avantages : déploiement automatique depuis GitHub, aperçus de branche, HTTPS et DNS inclus, formulaire de contact via Netlify Forms, offre gratuite suffisante. Le site reste majoritairement statique. Les API des démos restent sur AWS (Lambda Function URL) et sont appelées directement depuis le navigateur, avec CORS limité au domaine du site.

### D-005 — Accès libre aux démos avec Turnstile + quotas + plafond global — Acceptée (2026-10-26)

### D-006 — Dépôt GitHub public — Acceptée (2026-10-26)

### D-007 — S3 Vectors comme base vectorielle par défaut — Acceptée (2026-10-26)
Raisons : coût très bas (stockage ~0,06 $/Go-mois, requêtes ~2,50 $/million), aucun coût fixe, intégration native aux Bedrock Knowledge Bases, disponible en GA depuis décembre 2025. Les autres bases (pgvector, Qdrant, Neo4j) sont utilisées là où elles apportent quelque chose à montrer.

### D-008 — Pas de Lambda dans un VPC — Acceptée (2026-10-26)
Évite NAT Gateway et endpoints VPC. Aurora est interrogé par RDS Data API.

### D-009 — Streaming via FastAPI + Lambda Web Adapter + Function URL — À confirmer
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
- Six familles, une couleur et une silhouette chacune : recherche (bleu, rond) 01 et 05 ; structure (violet, bloc) 03 et 08 ; vérification (vert, bouclier) 02 et 04 ; agents (orange, capsule à bras) 07 ; souveraineté (rouge, maison) 09 ; multimodal (jaune, écran) 06 et 10.
- Aucune marque tierce : origine écrite en texte (« méthode publiée par IBM Research (sept. 2026) ») avec lien vers la publication. Sources vérifiées le 2026-10-26.
- **STAIR (démo 03)** : la méthode publiée (arXiv 2609.03874) entraîne un modèle pour mémoriser le corpus et le retrouver par sa table des matières. La démo en reprend le principe **sans entraînement** (un modèle du commerce parcourt la table des matières), ce que la fiche indique. Une version fidèle demanderait un fine-tuning et un hébergement de modèle incompatibles avec D-001.
- Points à trancher au moment de construire les démos : modèle vérificateur de la démo 02 (Granite Guardian hébergé, ou contrôle de fidélité de Bedrock Guardrails) et hébergement du modèle de recherche visuelle de la démo 06 (ColPali demande du calcul à chaque question).

## Questions ouvertes

| # | Question | Quand trancher | Options |
|---|---|---|---|
| Q-1 | Région AWS | Phase 0 | eu-west-3 Paris (préféré pour le marketing) si S3 Vectors + Bedrock KB + modèles y sont, sinon eu-west-1 ou eu-central-1 |
| Q-2 | Nom de marque et domaine | Avant la mise en ligne publique (fin semaine 2) | Nom personnel (ex. prénom-nom.dev) ou marque |
| Q-3 | Budget ponctuel d'ingestion de ~70 à 120 € | Avant la Phase 2 | Financé par les **crédits AWS** (100 $ disponibles, jusqu'à ~200 $ avec les activités) — voir D-011 |
| Q-8 | Couverture de Claude (modèle tiers) par les crédits | Phase 0 | **Non confirmée** → petit appel Claude sur Bedrock, puis vérifier la facture du lendemain. Si non couvert : Amazon Nova pour l'ingestion en masse |
| Q-4 | Licences des corpus 03 (FinanceBench CC BY-NC, DEU) et 10 (vidéos) | Avant chaque démo | Voir [02-catalogue-rag.md](02-catalogue-rag.md) |
| Q-5 | Neo4j AuraDB Free se met en pause en cas d'inactivité | Démo 08 | Réveil automatique documenté, ou graphe stocké en Parquet sur S3 et chargé en mémoire (NetworkX) dans la Lambda |
| Q-6 | Langfuse Cloud ou traces uniquement maison | Phase 1 | Langfuse apporte une interface reconnue par les clients ; traces maison suffisent pour le site |
| Q-7 | Support du français par la détection PII (Comprehend, Bedrock Guardrails) | Démo 09 | Presidio + modèle spaCy français en principal |
| Q-9 | Où faire tourner les modèles IBM Granite (intrinsics, Guardian), STAIR (Mistral 7B affiné) et ColQwen, qui demandent idéalement un GPU, avec un budget < 30 €/mois ? Piste AWS pour STAIR : Bedrock Custom Model Import (facturé à l'activité) | Démos 02, 03, 06, 09 | (a) Benchmark calculé hors ligne sur un GPU local ou loué à l'heure, résultats publiés, réponses précalculées pour les questions d'exemple, vérification en direct par Bedrock Guardrails ; (b) endpoint GPU qui s'éteint quand il ne sert pas (démarrage lent) ; (c) petits modèles quantifiés sur CPU (Lambda), lents. Préférence : (a) |
| Q-10 | L'utilisateur dispose-t-il d'un GPU NVIDIA en local ? | Avant la démo 02 | Détermine le coût du point Q-9 (a) |
| Q-11 | ~~Quelle « méthode IBM » ?~~ Résolu : **STAIR** (arXiv 2609.03874), placée dans la démo 03. Les RAG intrinsics / Granite Guardian restent dans la démo 02 | — | — |
