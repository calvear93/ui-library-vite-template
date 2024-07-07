<h2 align="center"><b>React UI Library</b></h2>
<h3 align="center"><b>UI Kit</b></h3>

<br />

<p align="center">
  <a href="https://reactjs.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="220" alt="React Logo" /></a>
</p>

<p align="center">
  UI Kit skeleton using Vite and React with TypeScript.
</p>

<p align="center">
  <a href="https://github.com/calvear93/react-template" target="_blank">
	<img src="https://img.shields.io/github/license/calvear93/react-template" alt="Package License" />
  </a>
</p>

## 📥 **Getting Started**

-   Replace globally these terms:
    -   `(((lib-name)))` name of the library
    -   `(((description)))` short description
    -   `(((repository)))` origin repository
-   Install [NodeJS](https://nodejs.org/es/).
-   Install [PNPM](https://pnpm.io/installation)
-   Execute `pnpm install` command.
-   Run either `pnpm start` or `pnpm test` commands.

## 💼 **Usage**

Project has automatic artifact generation using `pnpm build`, but you should add prepublish and publish commands for any package repository you want.

-   **Development**: `pnpm start` opens a dev server using [Storybook](https://storybook.js.org/).
-   **Build**: `pnpm build` bundles the library in 'dist' folder for publish, with automatic entryfiles, css injection and type definition generation [see vite.config.ts](vite.config.ts)
-   **Test**: `pnpm test` executes test suites using [Vitest](https://vitest.dev/).
