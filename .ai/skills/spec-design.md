# Skill: Spec — Design

Turn an approved proposal into a technical design. **How, grounded in this template's
architecture.** Optional for trivial changes.

## When to use

After `/spec-propose`, once `proposal.md` + deltas are approved and the change is non-trivial
(new shared component, custom hook, cross-cutting refactor, build/exports change). Skip it for a
doc-only or one-line tweak — note the skip in `tasks.md`. Input: `specs/changes/<change-id>/`.

## Procedure

1. **Read** the proposal, its deltas, the target living specs under `specs/specs/`, plus
   `AGENTS.md` and `.github/instructions/architecture-guide.instructions.md`. Explore the
   existing components under `src/components/` and the `create-component` prompt before designing.
2. **Write `specs/changes/<change-id>/design.md`** from `.ai/templates/design.template.md`.
3. **Design within the component-library architecture (`src/`).** This is a publishable React
   component library — no app shell, router, or backend. Model everything as reusable UI:
    - **Components** in `src/components/<layer>/<name>/` following **Atomic Design** —
      `atoms/` → `molecules/` → `organisms/`; compose upward only (`*.tsx` + `*.module.css` +
      `*.stories.tsx` + `*.spec.tsx` + `index.ts`). Semantic HTML + ARIA; style with UnoCSS
      `@apply`. See the `atomic-design` skill.
    - **Public API** — design props as a contract: typed, JSDoc'd, extend the native element,
      spread `...rest`. Adding an optional prop is minor; renaming/removing is **breaking**. See
      the `component-api` skill.
    - **Hooks** — reusable non-visual logic in `src/hooks/` (`*.hook.ts`); keep them portable
      (browser-safe types).
    - **Exports & bundling** — each component re-exports from `src/main.ts` and becomes its own
      tree-shakeable entry; per-component CSS and `.d.ts` are emitted by the build. Keep
      `main.ts` a pure barrel. See `library-exports` and `vite-library-mode`.
    - **Stories** — every component ships a Storybook story with autodocs. See the `storybook` skill.
    - No `any`; prefer `unknown` + narrowing. `react`/`react-dom` stay **peer** dependencies.
4. **Record decisions** explicitly (what / why / alternatives) so the change folder is the
   durable rationale.
5. **Map requirements → testing strategy** (Vitest + React Testing Library `*.spec.tsx`/
   `*.spec.ts` co-located with source; assert on user-visible output). See `vitest-tdd` skill.
6. **Call out risks/trade-offs:** accessibility, **semver / breaking-change impact** for
   consumers, bundle size / tree-shaking, controlled vs uncontrolled, coverage targets.
7. **Stay minimal (YAGNI).** No task list yet — that is `/spec-tasks`.

## Output

- The design path and a short summary of the approach + affected components/hooks.
- Flag any proposal ambiguity discovered (loop back to `/spec-propose` if material).
- **Next step:** `/spec-tasks`.
