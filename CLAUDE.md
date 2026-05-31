# GroupAuth

Multi-tenant identity & access management platform for the BSW group.
Five companies (Cympire, Cywareness, Codeus Education, Bina, Soterio) share
one auth system with SSO, MFA, and a unified admin console.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 + shadcn/ui (base-nova style)
- React Router v7
- Lucide icons

## Development

```bash
npm run dev      # Start dev server
npm run build    # Type-check + build
npm run lint     # ESLint
```

## Project Structure

```
src/
  components/ui/   # shadcn/ui primitives
  components/      # app components
  lib/             # utilities (cn, etc.)
  pages/           # route pages
```

Import alias: `@/` maps to `src/`.

## Design Reference

UI follows the wireframe/design provided separately. Clerk/Auth0-inspired
admin console aesthetic: dark sidebar, clean white content area, data-dense
tables, professional security-company feel.
