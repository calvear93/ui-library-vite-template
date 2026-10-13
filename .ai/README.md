# `.ai/` — skills

This is the tool-neutral home for on-demand guidance. [`AGENTS.md`](../AGENTS.md) is always loaded
and holds the rules. These files carry the detail and are read only when the task needs it. This
file is the **only** catalogue.

| Skill                                          | Read it when                                                |
| ---------------------------------------------- | ----------------------------------------------------------- |
| [`ways-of-working`](skills/ways-of-working.md) | Always, before a non-trivial task (process + DoD)           |
| [`components`](skills/components.md)           | Creating or changing components, their props, CSS or a11y   |
| [`storybook`](skills/storybook.md)             | Writing stories or MDX pages, or touching `.storybook/`     |
| [`library-build`](skills/library-build.md)     | Touching exports, `main.ts`, `vite.config.ts` or publishing |
| [`testing`](skills/testing.md)                 | Writing or fixing tests                                     |

How each tool gets here:

- **Claude Code / Gemini CLI:** `CLAUDE.md` / `GEMINI.md` import `AGENTS.md`.
- **Codex, Cursor and others:** they read `AGENTS.md` natively.
- **GitHub Copilot:** reads `AGENTS.md`, plus the `applyTo`-scoped pointers in
  `.github/instructions/`.

Editing rule: each fact lives in one place. Build details live in `vite.config.ts` (commented), and
code shapes in `.vscode/__templates__/`. Link to them instead of copying. Don't restate anything
ESLint/Prettier/Stylelint enforce. When adding a skill, add a row here and a
`.github/instructions/<skill>.instructions.md` pointer.
