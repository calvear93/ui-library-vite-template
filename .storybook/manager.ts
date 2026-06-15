import { addons } from 'storybook/manager-api';
import { light } from './theme.ts';

// initial chrome theme; the dark-mode toolbar toggle (preview.tsx `darkMode`) switches it.
addons.setConfig({ theme: light });
