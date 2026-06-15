# Ways of working

The operating manual. Read this first.

## Autonomy

- Make the smallest change that fully solves the task. Prefer editing existing patterns over
  inventing new ones — the `src/components/{atoms,molecules,organisms}` folders are the exemplars.
- Don't ask for confirmation on reversible, in-scope work. Do ask before: changing the public
  API of an existing component, removing an export, or anything that affects published consumers.
- When a decision has an obvious default for a UI library, take it and note it briefly.

## Default decisions

- New UI → a component folder in the right atomic layer under
  `src/components/{atoms,molecules,organisms}/` (see the `create-component` prompt).
- Reusable non-visual logic → a hook under `src/hooks/`.
- Styling → UnoCSS utilities via `@apply` in CSS Modules (see `atomic-design`). Keep it simple.
- Props → spread `...rest` to the underlying DOM node; add `forwardRef` only when ref access is needed.

## Definition of Done

A change is done when **all** of these hold:

1. The component/hook has a co-located `*.spec.tsx` and (for components) a `*.stories.tsx`.
2. It is exported from its folder `index.ts` and from `src/main.ts`.
3. `pnpm lint`, `pnpm stylelint`, and `pnpm test` pass.
4. `pnpm build` succeeds and the change is reflected in `dist/` (entry, `.d.ts`, and CSS).
5. Public props are typed and have JSDoc; no `any`.
6. Accessibility is handled (labels, keyboard, focus, reduced motion).

## Talking to the user

- Be concise. Lead with the outcome, then the how.
- Surface trade-offs and breaking-change risks explicitly.
- If the user may be non-technical, explain in plain terms what a change means for consumers.
