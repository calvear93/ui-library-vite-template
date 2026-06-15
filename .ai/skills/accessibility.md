# Accessibility

Accessibility is a baseline requirement for every interactive component, not an add-on.

## Checklist

- **Semantic elements** — use the right native element (`<button>`, `<input>`, `<a>`); it brings
  keyboard and role behavior for free. Avoid `<div onClick>`.
- **Labels** — every form control has an associated `<label htmlFor>` (use `useId()` to link when
  the consumer doesn't pass an `id`). Icon-only controls need `aria-label`.
- **Decorative content** — mark purely decorative icons/elements `aria-hidden="true"`.
- **Keyboard** — all interactions reachable and operable by keyboard; logical tab order.
- **Focus** — a visible focus indicator (style `:focus-visible`); never remove outlines without a replacement.
- **Motion** — wrap non-essential animation in `@media (prefers-reduced-motion: reduce)`.
- **Contrast** — text must stay legible on its background; verify in light and dark.

## Tooling

- The Storybook **a11y addon** runs axe on every story — keep the panel clean.
- In specs, assert accessible queries (`getByRole`, `getByLabelText`) rather than test ids; this
  doubles as an a11y check (the role/name must exist).

```tsx
expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
expect(screen.getByLabelText('Email')).toBeInTheDocument();
```
