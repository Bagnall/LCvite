# AGENTS.md

## Project overview
This is a React + Vite learning object app. It uses React 19, Vite 6, Tailwind CSS, and a set of UI utilities (Radix UI, Headless UI, shadcn).

## Key scripts
- `yarn dev` / `yarn start`: run the dev server
- `yarn build`: build for production
- `yarn preview`: preview production build
- `yarn lint`: run ESLint

## Repo layout
- `src/App.jsx`: main app component
- `src/main.jsx`: app entry point
- `src/Components/`: UI components
- `src/styles/`: styling assets
- `src/learningObjectConfigurations/`: learning object JSON configs
- `src/index-fr.json`, `src/index-sp.json`: menu index files for learning object configs
- `public/`: static assets

## Learning object configuration
- `src/index-fr.json` references the configuration files in `src/learningObjectConfigurations/`.
- Configuration files (e.g. `config-uae-1.json`, `config-ukraine-1.json`) define component layout and phrases.

## Tooling
- Vite + React SWC plugin
- Tailwind CSS v4
- ESLint

## Notes
- Yarn is the expected package manager.
