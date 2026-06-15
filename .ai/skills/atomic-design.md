# Atomic Design

The library's one structural opinion: compose UI bottom-up as **atoms → molecules → organisms**.
Keep the examples simple — they demonstrate _structure_, not a house style.

## Layers

```
src/components/
  atoms/        smallest building blocks — one element, no composition (Button, Input)
  molecules/    a few atoms combined into a unit (Field = Label + Input)
  organisms/    molecules + atoms forming a section (SignUpForm = Field × 2 + Button)
  layouts/      arrange organisms + content; structure only, no house style (Stack)
```

- **Atoms** wrap a single native element. Extend its props, spread `...rest`, keep them dumb.
- **Molecules** import and compose atoms; they add a small amount of structure/logic
  (e.g. `Field` links a `<label>` to the `Input` atom with `useId`).
- **Organisms** compose molecules and atoms into a self-contained block.
- **Layouts** arrange organisms and arbitrary content (the "templates" layer of atomic design):
  they expose `children`/slots and impose structure — flex/grid/gap — not colors. `Stack` is the
  example, and layouts ship no dark-mode variant because they carry no house style.

Each component (any layer) lives in its own folder with the same five files and is re-exported
from `src/main.ts`. Compose **upward** by importing lower layers, never downward.

## Styling

Style with **UnoCSS via `@apply`** inside each component's `*.module.css`:

```css
.button {
	@apply cursor-pointer rounded-lg bg-blue-500 px-6 py-3 text-sm font-bold text-white;
}
```

This compiles the used utilities into the component's **own scoped CSS**, which the build
exports per component (see `library-exports` / `vite-library-mode`). Icons work the same way:

```css
.icon {
	@apply i-mdi-account-plus text-blue-500;
}
```

Keep styling minimal — a template should be easy to restyle. Avoid heavy, opinionated theming;
prefer plain UnoCSS utilities so consumers can swap them out.

## Anti-patterns

- An organism importing another organism, or an atom importing a molecule (wrong direction).
- Duplicating an element instead of reusing the atom (e.g. a raw `<input>` inside a molecule).
- Over-styling the examples — they teach structure, not a brand.
