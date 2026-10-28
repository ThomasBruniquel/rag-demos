# Site vitrine (Next.js)

Site bilingue FR/EN, entièrement statique, hébergé sur Netlify. Les choix techniques sont expliqués dans [docs/06-decisions.md](../docs/06-decisions.md) (D-004, D-012).

Depuis le 2026-10-28 (D-020, D-021, D-022), le site ne fait tourner aucun RAG : il **rejoue des sessions réelles enregistrées**, présente les démos comme des **réalisations** (EN : *projects*) et affiche leur stack sous forme de **badges**. Dans le code, le mot « demo » reste.

## Lancer en local

```bash
cd web
pnpm install
pnpm dev          # http://localhost:3000 → redirige vers /fr ou /en
```

| Commande | Rôle |
|---|---|
| `pnpm build` | Génère le site statique dans `out/` |
| `pnpm preview` | Sert `out/` localement, comme en production |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Vérification TypeScript |
| `pnpm check:contrast` | Vérifie les contrastes WCAG des couleurs du thème |
| `pnpm video <NN-nom>` | Filme le rejeu d'une session en FR et en EN (Playwright), voir « Vidéo d'une réalisation » |
| `pnpm diagrams` | Convertit les schémas Mermaid (`content/**/*.mmd`) en SVG ; à lancer après avoir modifié un schéma, puis versionner les SVG. Le premier lancement télécharge un Chromium (~150 Mo) via npx |

En mode `pnpm dev`, une URL qui n'existe pas dans une langue (ex. `/en/offres`) affiche une erreur « missing param … generateStaticParams » dans le terminal : c'est normal en export statique, la page renvoie bien une 404.

## Où modifier quoi

| Quoi | Où |
|---|---|
| Nom de marque, coordonnées, liens | `site.config.ts` |
| Textes d'interface | `messages/fr.json`, `messages/en.json` (le français fait foi : une clé manquante en anglais casse le build) |
| URL traduites des pages | `lib/i18n/routes.ts` |
| Couleurs et typographie | `app/globals.css`, `lib/fonts.ts` |
| Une réalisation | `content/demos/NN-nom/` : `demo.yaml` (champs communs : filtres, méthode, badges `stack`, options du lecteur), `fr.mdx` et `en.mdx` (textes en en-tête YAML + paragraphe d'architecture), `architecture.mmd` et `pipeline.mmd` (schémas, libellés `<<français\|anglais>>`) |
| Une méthode et son personnage | `content/methods/NN-nom/` (`method.yaml`, `fr.mdx`, `en.mdx`) ; dessin dans `components/characters/character.tsx` |
| Filtres du catalogue, mots-clés des badges | `lib/content/taxonomy.ts` (les mots-clés suivent la matrice de [docs/02-catalogue-rag.md](../docs/02-catalogue-rag.md)) |
| Sessions enregistrées | `content/recordings/NN-nom/` (voir [content/recordings/README.md](content/recordings/README.md)) |
| Vidéos | `public/videos/NN-nom/<locale>.webm` (+ `.mp4`, poster `.jpg`) |
| Redirections (anciennes URL `/demos/`) | `netlify.toml`, à la racine du dépôt |

Le contenu est validé au build (`lib/content/schema.ts`) : un champ manquant, une faute de frappe dans une valeur de filtre ou une ligne de tableau incomplète arrêtent le build avec un message qui indique le fichier. En YAML, mettre entre guillemets toute valeur qui contient « : » ou, dans un tableau `[a, b]`, une virgule.

## Badges (D-022)

Chaque `demo.yaml` porte un bloc `stack` dont les valeurs sont des identifiants de mots-clés :

```yaml
stack:
  cloud: [azure]
  framework: [langchain, langgraph]
  models: [gpt]
  vectorStores: [azure-ai-search]
  integrations: [sharepoint]   # facultatif
  compliance: [guardrails]     # facultatif
```

Les libellés FR/EN de chaque identifiant sont dans `keywords` (`lib/content/taxonomy.ts`). Un nouveau mot-clé s'y ajoute d'abord ; une faute de frappe arrête le build. Les badges apparaissent sur les cartes, en tête de fiche et dans « Comment c'est construit ». Ils mènent à la page Compétences (`/fr/competences#kw-<id>`), qui liste chaque mot-clé avec les réalisations qui le démontrent. Le catalogue se filtre aussi par mot-clé (`?keywords=<id>`).

## Le lecteur de rejeu (D-020)

`components/player/` : un seul composant pour les neuf réalisations.

- Il lit les fichiers de `content/recordings/<NN-nom>/` au build (`lib/recordings/load.ts`, format version 1 de [docs/03-architecture.md](../docs/03-architecture.md)). Pas de fichier : la fiche affiche « Sessions en cours d'enregistrement » et les questions prévues.
- Le visiteur choisit une question (pas de saisie libre). Les événements sont réémis avec leurs écarts `t` d'origine, à vitesse ×1, ×2 ou instantanée. Citations cliquables, contenus riches (tableau, graphique, SQL, figure, vidéo) et coulisses (extraits, scores, latence, tokens, coût) fonctionnent comme en direct.
- Chaque session affiche « Session réelle enregistrée le … — modèle … — coût … », tiré du fichier.
- Variantes : plusieurs fichiers pour le même texte de question, avec des `variant` différents. Libellés dans `player.variants` du `demo.yaml`. Avec `player.sideBySide: true` (réalisation 07), les variantes se rejouent côte à côte ; sinon un sélecteur les propose.
- Le personnage réagit aux événements `status` (`lib/player/state.ts`, fonction `moodFor`).
- Les réponses enregistrées sont aussi dans la page en texte (bloc « Lire les sessions enregistrées en texte ») : lisibles sans JavaScript et indexables.

### Exemples de développement

`content/recordings/_dev/` contient des réponses **inventées** pour tester le lecteur (réalisations 04, 05 et 07). Ils ne sont chargés que par `pnpm dev`, avec la mention « Exemple de développement : ce n'est pas une session réelle ». `pnpm build` les ignore : ils n'atteignent jamais la production.

### Ajouter les sessions d'une réalisation

1. Lancer la réalisation (en local, ou déployée temporairement).
2. Enregistrer les questions d'exemple avec le script commun (`rag_core.recording`, à écrire côté Python) : il écrit `content/recordings/<NN-nom>/<question_id>.<locale>.json` et copie les images dans `public/recordings/<NN-nom>/`.
3. `pnpm build` vérifie les fichiers. Ne jamais écrire ni retoucher un enregistrement à la main.
4. Passer `status: live` dans le `demo.yaml` quand la réalisation est terminée (badge « Terminée »).

## Mode direct, sur rendez-vous

Le lecteur peut aussi parler à la vraie API d'une réalisation, pour une démo en direct. Il suffit de définir, **au moment du build**, la variable `NEXT_PUBLIC_DEMO_API_<NN>` (ex. `NEXT_PUBLIC_DEMO_API_05=http://localhost:8000`). Un onglet « En direct » apparaît alors à côté des sessions enregistrées, avec saisie libre.

- Protocole des API (`demos/*/src/*/api/app.py`) : `POST {url}/session` `{ turnstile_token, locale }` → `{ session_id }`, puis `POST {url}/ask` `{ session_id, question, locale, <variantField>: <variante> }` → flux SSE (`status`, `token`, `citation`, `artifact`, `trace`, `done`, `error`). Le champ de variante vient de `player.variantField` (ex. `route` pour 05).
- Lancer l'API avec le captcha désactivé (`turnstile_mode` à `off`) et autoriser l'origine du site (`LOCAL_CORS_ORIGINS=http://localhost:3000` en local).
- États gérés : réveil de la base (message après 2,5 s sans réponse), quota atteint, pause budgétaire, session expirée, erreur réseau.
- Sur Netlify, ne pas laisser cette variable en production : le site public ne montre que des sessions enregistrées.

## Vidéo d'une réalisation

Une courte vidéo par réalisation, filmée depuis le lecteur, s'affiche au-dessus de lui dès que le fichier existe (sans son, sans lecture automatique, avec image d'attente).

```bash
pnpm build && pnpm preview          # le site tel qu'en production, sur http://localhost:3000
pnpm video 05-documentation-technique                 # question 1, FR et EN, vitesse ×1
pnpm video 05-documentation-technique --question 2 --speed 2
```

Le script (`scripts/record-video.mjs`) ouvre la fiche, lance le rejeu, suit la réponse et écrit `public/videos/<NN-nom>/<locale>.webm` et `<locale>.jpg`. Si `ffmpeg` est installé, il coupe le chargement de la page et produit aussi un `.mp4`. Il refuse de filmer un exemple de développement dans `public/` (option `--out` vers un autre dossier pour tester). Premier lancement : `pnpm exec playwright install chromium`.

## Déploiement

Netlify construit le site à chaque push sur `main` (`netlify.toml` à la racine : `base = "web"`, `pnpm build`, publication de `out/`). Les anciennes URL `/fr/demos/…` et `/en/demos/…` redirigent en 301 vers `/fr/realisations/…` et `/en/projects/…`. Variables d'environnement : voir `.env.example`.

