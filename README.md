# Collect Edge

Collect Edge is a responsive landing page for a late-stage agency allocation platform. It is built with the Next.js App Router and presents a hero section, product feature grid, tab slider, testimonials, navigation, and footer.

## Tech stack

- **Next.js 16** with the App Router
- **React 19** and **TypeScript** (strict mode)
- **SCSS** for global styles, component styles, and shared design tokens/mixins
- **Anime.js** for UI animations
- **UAParser.js** for server-side device detection
- **Bun 1.4.0** for package management and scripts (version recorded in `package.json`)
- **ESLint 9** and `eslint-config-next` for linting

The Next.js React Compiler is enabled in `next.config.ts`. The `@/*` TypeScript alias points to `src/*`.

## Project layout

```text
src/
├── app/                       # App Router entry points, page, metadata, global styles
├── components/
│   ├── layout/                 # Shared navbar and footer
│   ├── sections/               # Hero, bento grid, tab slider, testimonials
│   │   └── bento-grid/_components/ # Feature cards used by the bento grid
│   └── ui/                     # Reusable buttons, badges, animation and display pieces
├── context/                    # Shared device width and display mode context
├── styles/
│   ├── mixins/                 # Shared SCSS mixins
│   ├── tools/                  # SCSS helpers
│   └── variables/              # Colors, spacing, typography tokens
└── utils/                      # Shared utilities, including server-side device detection
public/assets/                  # Images, masks, logos, and SVG assets
tests/                          # Node-based checks for styles and conventions
```

Most components live beside their own `.scss` file. Shared SCSS entry styles are in `src/styles/`, and the home page is composed in `src/app/page.tsx`.

## Requirements

- [Bun 1.4.0](https://bun.sh/) (recommended; the repository includes `bun.lock`)
- Node.js compatible with the installed Next.js version

## Run locally

From the project root, install dependencies and start the development server:

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

```bash
bun run dev     # Start the local development server
bun run build   # Create a production build
bun run start   # Serve the production build (run build first)
bun run lint    # Run ESLint
```

The test files are under `tests/`; there is currently no test script defined in `package.json`.
