# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev        # Start dev server (Vite, HMR)
npm run build      # Type check (tsc -b) + production build
npm run lint       # ESLint across all TS/TSX files
npm run preview    # Preview production build locally
npx tsc --noEmit   # Type check only (no output)
```

No test framework is configured.

## Environment Variables

Copy `.env.example` to `.env`. Key variables:
- `VITE_API_URL` - Dedalo backend API base URL
- `VITE_NAUTH_API_URL` - NAuth authentication API URL
- `VITE_TENANT_ID` - Tenant identifier (sent as `X-Tenant-Id` header on all requests)
- `VITE_BASE_DOMAIN` - Base domain for subdomain/folder website resolution

## Architecture

This is a **multi-tenant CMS frontend** (React 19, TypeScript, Vite 8, Tailwind CSS 4). It renders websites dynamically based on how the URL resolves.

### Website Resolution (WebsiteContext)

The app resolves which website to display in this order:
1. **Custom domain** - `GET /website/domain/{hostname}`
2. **Subdomain** - extracts slug from `{slug}.{BASE_DOMAIN}` and calls `GET /website/slug/{slug}`
3. **Folder/path** - extracts first path segment and calls `GET /website/slug/{slug}`

This means `localhost:5173/meu-site` resolves via step 3 (folder mode) during development.

### Layer Architecture

- **`src/types/`** - TypeScript interfaces matching API models. Enums use `as const` objects (not TS `enum`) due to `erasableSyntaxOnly` in tsconfig.
- **`src/services/`** - API layer. `api.ts` is a fetch wrapper that auto-injects `Authorization` (Bearer from localStorage `nauth_session`) and `X-Tenant-Id` headers. `getSafe()` returns `null` instead of throwing - used by all public endpoints.
- **`src/contexts/`** - React Context providers for Website, Page, Menu, Content, and EditMode state.
- **`src/hooks/`** - Thin `useContext` wrappers for each context.
- **`src/templates/`** - Template system. Each template defines layout areas, template-specific components, and a Layout component. Templates are registered in `templates/index.ts`.
- **`src/components/content/`** - Renderable content components (Hero, Text, Image, etc.) with a registry in `index.ts` mapping `contentType` string to component.
- **`src/components/content-editors/`** - Modal editor forms for each content type. Registry in `index.ts`.
- **`src/components/editor/`** - Edit mode UI: drag-and-drop (via @dnd-kit), content areas with dashed borders, component picker.

### Key Patterns

- **Public endpoints** use `api.getSafe()` (returns `null` on error, never throws). Lists return `[]` on failure.
- **Content data** is stored as JSON strings in `ContentInfo.contentValue`. Each content component parses its own JSON structure.
- **Edit Mode** is only available to the website owner (`user.userId === website.userId`). It enables drag-and-drop, content editing, and menu management.
- **Authentication** uses `nauth-react` package. `NAuthProvider` wraps the app. Components: `LoginForm`, `RegisterForm`, `ForgotPasswordForm`, `ChangePasswordForm`, `UserEditForm`.
- **Route `/_/new`** is outside `WebsiteLoader` - it's for creating new websites without needing a resolved website context.

### API Documentation

Full API spec is in `docs/DEDALO_API_DOCUMENTATION.md`. The backend exposes CRUD for Website, Page, Menu, Content, and Image upload endpoints. All authenticated endpoints require `Authorization` and `X-Tenant-Id` headers.

## Language

All user-facing text and code comments are in Portuguese (pt-BR).
