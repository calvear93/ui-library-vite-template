# Design: <change title>

- **Change ID:** <verb-led-kebab-id>
- **Proposal:** ./proposal.md
- **Status:** draft | approved

> Technical design that satisfies the proposal, grounded in this repo's architecture
> (`AGENTS.md`, `.github/instructions/architecture-guide.instructions.md`, `.ai/prompts/`).
> Optional for trivial changes. The "how", not the task list.

## Context

<What in the current code is relevant. Constraints, existing patterns to reuse, prior art.>

## Decisions

- **Decision:** <what you chose>. **Why:** <rationale>. **Alternatives considered:** <a, b>.
- ...

## Affected areas

- **Components:** `src/components/<layer>/<name>/<Name>.tsx` (atom | molecule | organism) —
  declarative + accessible; styled with UnoCSS `@apply`.
- **Hooks:** `src/hooks/<use-name>.hook.ts` — reusable non-visual logic (browser-safe types).
- **Exports / bundling:** re-export from `src/main.ts`; per-component CSS + `.d.ts` are emitted.
- **Stories:** `<Name>.stories.tsx` (autodocs).

## Public API & consumers

- The prop contract (typed + JSDoc, extend the native element, spread `...rest`) and its **semver**
  impact (added optional = minor; renamed/removed/default change = breaking). Controlled vs
  uncontrolled. What consumers import and how it tree-shakes. No `any`; prefer `unknown` +
  narrowing. `react`/`react-dom` stay peer dependencies — never bundle React.

## Testing strategy

- Which requirements/scenarios map to which co-located Vitest specs (`*.spec.tsx` / `*.spec.ts`).
  Assert on user-visible output; cover happy path + an edge case + accessibility. See `vitest-tdd`.

## Risks / trade-offs

- <Accessibility, breaking-change / semver impact, bundle size, performance, rollback.>
