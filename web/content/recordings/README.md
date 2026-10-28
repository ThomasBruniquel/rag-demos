# Sessions enregistrées

Chaque réalisation est montrée sur le site par des **sessions réelles enregistrées puis rejouées** (D-020). Ce dossier contient ces enregistrements.

```
recordings/
  05-documentation-technique/          ← même nom que le dossier de content/demos/
    q1-schema-pompe.fr.json            ← <question_id>.<locale>.json
    q1-schema-pompe.en.json
  _dev/                                ← exemples de développement, jamais publiés
```

## Règles

- Les fichiers sont produits **uniquement par le script d'enregistrement** (`rag_core.recording`), à partir d'un vrai passage de la réalisation. Jamais écrits ni retouchés à la main.
- Format : version 1, décrit dans [docs/03-architecture.md](../../../docs/03-architecture.md) (« Format d'un enregistrement »). Le build vérifie chaque fichier (schéma, ordre des `t`, dernier événement `done` ou `error`, nom de fichier cohérent avec `question_id` et `locale`) et s'arrête au moindre écart.
- **Plusieurs variantes d'une même question** (voie comparée, rôle choisi) : un fichier par variante, avec le **même texte de `question`** et un `variant` différent, par exemple `q1-salaire-rh.fr.json` et `q1-salaire-employe.fr.json`. Le lecteur les regroupe. Les libellés des variantes viennent de `player.variants` dans le `demo.yaml`.
- **Images et vidéos** : les URL présignées expirent. Le script d'enregistrement doit copier les images de figures dans `web/public/recordings/<NN-nom>/` et réécrire `image_url` en chemin relatif (`/recordings/05-…/fig-7.png`).
- Ne pas enregistrer de données personnelles réelles : les corpus sont publics ou fictifs (D-010).

## Exemples de développement (`_dev/`)

Réponses inventées pour tester le lecteur (variantes, tableau, graphique, côte à côte). Ils ne sont chargés que par `pnpm dev` et s'affichent avec la mention « Exemple de développement : ce n'est pas une session réelle ». `pnpm build` les ignore : ils ne peuvent pas atteindre la production.
