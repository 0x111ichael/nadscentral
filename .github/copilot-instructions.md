# Copilot Instructions for AI Agents

## Project Overview
- **Nads Central** is a Web3 membership portal built with React, TypeScript, Tailwind CSS, and thirdweb for NFT-gated access on Monad testnet.
- The app features a cosmic-themed UI, responsive design, and integrates with Supabase for backend functionality.

## Architecture & Key Patterns
- **Component Structure:**
  - UI components in `src/components/`
  - Custom hooks in `src/hooks/`
  - Web3 and Supabase integrations in `src/integrations/` and `src/lib/`
  - Pages in `src/pages/`
- **Web3 Integration:**
  - Uses `thirdweb` for contract interactions; contract addresses should be sourced from environment variables, not hardcoded.
  - Centralize contract logic in hooks or service files (see `lib/thirdweb.ts`).
- **State Management:**
  - Currently uses local state and React context (see `src/contexts/`).
  - For global state, consider context or Zustand (see `VERSION_2_ANALYSIS.md`).
- **Backend:**
  - Supabase is used for user profile storage and social features (see `src/integrations/supabase/`).

## Developer Workflows
- **Build:**
  - Use Vite for local development: `npm run dev`
  - Production build: `npm run build`
- **Testing:**
  - No test infrastructure present; recommended to add Jest + React Testing Library.
- **Environment Config:**
  - Use `.env` files for contract addresses and API keys. Avoid hardcoding sensitive values.
- **Error Handling:**
  - Implement error boundaries (see `src/components/ErrorBoundary.tsx`).
  - Standardize loading and error states in all async components.

## Project Conventions
- **Component Organization:**
  - Separate business logic from UI; use hooks for shared logic.
  - Group reusable UI in `src/components/ui/`.
- **Performance:**
  - Memoize contract instances and expensive operations.
  - Use code splitting for large pages (e.g., `React.lazy`).
- **Type Safety:**
  - Use TypeScript interfaces/types throughout. Avoid `any`.
- **Styling:**
  - Tailwind CSS is the primary styling framework.

## Integration Points
- **Web3:**
  - All contract calls should go through centralized logic (see `lib/thirdweb.ts`).
- **Supabase:**
  - User data and social features are managed via Supabase (see `src/integrations/supabase/`).

## Examples
- To add a new Web3 feature, create a hook in `src/hooks/` and a service in `src/lib/`.
- For new UI, add components to `src/components/ui/` and compose in feature/page components.

## References
- See `VERSION_2_ANALYSIS.md` for architecture, patterns, and roadmap.
- For environment setup, see `README.md`.
