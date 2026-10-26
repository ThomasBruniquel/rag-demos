# Site vitrine (Next.js)

Site bilingue FR/EN, entièrement statique, hébergé sur Netlify. Les choix techniques sont expliqués dans [docs/06-decisions.md](../docs/06-decisions.md) (D-004, D-012).

> Documentation complète (variables d'environnement, ajout d'une démo, branchement d'une vraie API) : à venir à la fin de la construction du site.

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
| `pnpm diagrams` | Convertit les schémas Mermaid (`content/**/*.mmd`) en SVG ; à lancer après avoir modifié un schéma, puis versionner les SVG. Le premier lancement télécharge un Chromium (~150 Mo) via npx |

En mode `pnpm dev`, une URL qui n'existe pas dans une langue (ex. `/en/offres`) affiche une erreur « missing param … generateStaticParams » dans le terminal : c'est normal en export statique, la page renvoie bien une 404.

## Où modifier quoi

| Quoi | Où |
|---|---|
| Nom de marque, coordonnées, liens | `site.config.ts` |
| Textes d'interface | `messages/fr.json`, `messages/en.json` (le français fait foi : une clé manquante en anglais casse le build) |
| URL traduites des pages | `lib/i18n/routes.ts` |
| Couleurs et typographie | `app/globals.css`, `lib/fonts.ts` |
| Une démo | `content/demos/NN-nom/` : `demo.yaml` (champs communs : filtres, méthode, services AWS), `fr.mdx` et `en.mdx` (textes en en-tête YAML + paragraphe d'architecture), `architecture.mmd` et `pipeline.mmd` (schémas, libellés `<<français\|anglais>>`) |
| Une méthode et son personnage | `content/methods/NN-nom/` (`method.yaml`, `fr.mdx`, `en.mdx`) ; dessin dans `components/characters/character.tsx` |
| Filtres du catalogue | `lib/content/taxonomy.ts` |

Le contenu est validé au build (`lib/content/schema.ts`) : un champ manquant, une faute de frappe dans une valeur de filtre ou une ligne de tableau incomplète arrêtent le build avec un message qui indique le fichier. En YAML, mettre entre guillemets toute valeur qui contient « : » ou, dans un tableau `[a, b]`, une virgule.
