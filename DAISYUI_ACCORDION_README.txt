# Accordion → DaisyUI Migration (Patch)

This patch replaces the custom SCSS-based Accordion with DaisyUI's `collapse` component
and adds TailwindCSS + DaisyUI setup files.

## Changed files
- src/Components/Accordion/Accordion.jsx
- src/Components/Accordion/AccordionArticle.jsx

Backups saved next to them with `.orig` extension.

## Added files
- tailwind.config.js
- postcss.config.js
- src/index.css

## Also updated
- src/main.jsx (added `import './index.css';` at the top)

## Next steps in your branch
1) Install Tailwind & DaisyUI:
   yarn add -D tailwindcss postcss autoprefixer
   yarn add daisyui
   npx tailwindcss init -p   # (already included here, but this installs deps)

2) Remove or ignore old Accordion SCSS:
   - Delete src/Components/Accordion/Accordion.scss
     (or keep it, but it won't be used by the new components)

3) Start dev server:
   yarn dev

Your existing usage in App.jsx (Accordion + AccordionArticle) should continue to work,
now rendered with DaisyUI styling and behavior.
