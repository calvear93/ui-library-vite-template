# GitHub Copilot instructions

The canonical, tool-agnostic instructions for this repository live in [`AGENTS.md`](../AGENTS.md)
— read it first. Scoped guides live under [`.github/instructions/`](instructions/) and the deep
references under [`.ai/`](../.ai/README.md).

This is a **React + TypeScript UI component library** built with Vite library mode and documented
in Storybook. Key rules:

- Build each component as a folder `src/components/<name>/` (component + `.module.css` + `.stories.tsx`
    - `.spec.tsx` + `index.ts`); re-export it from `src/main.ts`.
- **Named exports only**; keep `src/main.ts` a pure barrel (protect tree-shaking).
- Style with UnoCSS utilities via `@apply` in CSS Modules; keep examples simple.
- Keep `react`/`react-dom` as **peer** dependencies; never bundle React.
- **Every component ships a story and a spec.** Run `pnpm lint && pnpm stylelint && pnpm test && pnpm build`.
