# `.ai/` — agent capabilities

Reusable instructions for AI coding assistants. [`AGENTS.md`](../AGENTS.md) is the canonical
contract; these files are the deep references it links to. Read the relevant file when its
topic applies — don't load everything at once.

## skills/

Best-practice guides for this codebase.

| Skill                                            | When to read                                     |
| ------------------------------------------------ | ------------------------------------------------ |
| [ways-of-working](skills/ways-of-working.md)     | First — autonomy, defaults, Definition of Done   |
| [atomic-design](skills/atomic-design.md)         | Atoms → molecules → organisms; UnoCSS styling    |
| [component-api](skills/component-api.md)         | Designing a component's public props / API       |
| [library-exports](skills/library-exports.md)     | Barrels, the `exports` map, tree-shaking         |
| [storybook](skills/storybook.md)                 | Authoring stories, autodocs, play tests          |
| [accessibility](skills/accessibility.md)         | A11y checklist for interactive components        |
| [vite-library-mode](skills/vite-library-mode.md) | How the build, entries, CSS, and `.d.ts` work    |
| [vitest-tdd](skills/vitest-tdd.md)               | Writing tests (RTL, happy-dom)                   |
| [publishing](skills/publishing.md)               | Building and publishing the package from `dist/` |

## prompts/

Task playbooks — step-by-step recipes.

- [create-component](prompts/create-component.md) — scaffold a new component (folder, styles, story, spec).
- [create-hook](prompts/create-hook.md) — scaffold a new hook.

## agents/

- [react](agents/react.md) — the React component-library engineer role.

## Spec-driven development (OpenSpec)

Build non-trivial changes through a spec-first loop: living specs in `specs/specs/`, each request a
**change** under `specs/changes/` carrying spec **deltas** applied on ship. The skills are the engine:

| Step              | Skill                                      | Output                                     |
| ----------------- | ------------------------------------------ | ------------------------------------------ |
| `/spec-intake`    | [spec-intake](skills/spec-intake.md)       | (optional) a shaped idea brief             |
| `/spec-propose`   | [spec-propose](skills/spec-propose.md)     | `proposal.md` + spec deltas                |
| `/spec-design`    | [spec-design](skills/spec-design.md)       | `design.md` (skip if trivial)              |
| `/spec-tasks`     | [spec-tasks](skills/spec-tasks.md)         | `tasks.md` (atomic, test-first)            |
| `/spec-implement` | [spec-implement](skills/spec-implement.md) | code + tests                               |
| `/spec-archive`   | [spec-archive](skills/spec-archive.md)     | deltas applied to `specs/specs/`, archived |

Format reference: [spec-conventions](skills/spec-conventions.md) · templates in
[`templates/`](templates/) · project context in [`specs/project.md`](../specs/project.md).
GitHub Copilot exposes the loop as `/spec-*` prompts under [`.github/prompts/`](../.github/prompts/).
