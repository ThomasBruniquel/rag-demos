# 00 — Vision et contexte

## Objectif

Décrocher des missions freelance RAG en prouvant, démos à l'appui, qu'on sait choisir et construire **le bon RAG pour la bonne situation** : petit ou gros volume, PDF propres ou scannés, tableaux, données structurées, contraintes de confidentialité, budget serré, etc.

Le site ne doit pas dire « je fais du RAG ». Il doit dire : **« Votre problème ressemble à celui-ci ? Testez la solution que j'ai construite, voici son architecture, sa qualité mesurée et son coût. »**

## Ce qui différencie ce portfolio

La plupart des profils freelance RAG montrent un chatbot sur des PDF. Ici, chaque démo montre en plus :

1. **Un cas client identifiable**, tiré d'offres réelles (voir [01-etude-marche.md](01-etude-marche.md)).
2. **Une qualité mesurée** : jeu d'évaluation, scores de récupération et de réponse, affichés sur le site.
3. **Un coût chiffré** : coût d'ingestion, coût par question, coût mensuel.
4. **Le pipeline de données** derrière (ingestion, transformation, mise à jour), là où la certification AWS Data Engineer apporte un vrai plus.
5. **Le code public** sur GitHub.

## Réponses de cadrage (2026-10-26)

| Question | Réponse |
|---|---|
| Niveau | Dev confirmé, débutant en RAG |
| Clientèle | PME/ETI françaises, international, startups/SaaS |
| Budget hébergement | < 30 €/mois |
| Temps disponible | Temps plein, 1 à 2 mois |
| LLM | Bedrock principal + 1 ou 2 autres fournisseurs (Mistral, OpenAI) |
| IaC | Terraform |
| Site | Next.js, bilingue FR/EN |
| Protection des démos | Accès libre, quotas par IP, captcha, plafond de coût global |
| Secteurs | Aucune préférence : choix selon la demande du marché |
| Code | Dépôt GitHub public |
| Existant | Compte AWS existant ; pas encore de nom de domaine ni de marque |
| Data engineering | Mis en avant comme argument fort |

## Hypothèses faites (à confirmer ou corriger)

- **Budget ponctuel d'ingestion** : on accepte environ **50 à 100 € une seule fois** pour construire les index (embeddings sur gros volume, OCR, extraction de graphe). Le budget de 30 €/mois ne concerne que le fonctionnement courant.
- **Données des démos** : uniquement des corpus publics avec licence de réutilisation, ou des données fictives générées et clairement signalées comme telles. Aucune donnée client réelle.
- **Nom de marque et domaine** : provisoires pendant le développement, à choisir avant la mise en ligne publique (voir [06-decisions.md](06-decisions.md)).
