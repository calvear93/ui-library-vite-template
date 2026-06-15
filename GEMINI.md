# GEMINI.md

The full, tool-agnostic instructions for this repository live in **[AGENTS.md](./AGENTS.md)**.

@AGENTS.md

Reusable capabilities live in [`.ai/`](./.ai/README.md) — read the relevant file when it applies:

- `.ai/skills/` — the operating manual (`ways-of-working` — read first) and best-practice
  skills (`atomic-design`, `component-api`, `library-exports`, `storybook`, `accessibility`,
  `vite-library-mode`, `vitest-tdd`, `publishing`).
- `.ai/prompts/` — task playbooks (`create-component`, `create-hook`).
- `.ai/agents/` — agent roles (`react`).
- **Spec-driven development (OpenSpec):** `specs/` holds living specs + change proposals; run the
  loop with the `.ai/skills/spec-*` skills (`spec-propose` → `spec-design` → `spec-tasks` →
  `spec-implement` → `spec-archive`; format in `spec-conventions`).

Do not duplicate guidance here — update `AGENTS.md` or the `.ai/` files instead.
