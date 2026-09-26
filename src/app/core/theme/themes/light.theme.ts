import { Theme } from '../theme.types';

/**
 * Light surfaces from the shell's Light theme (#f5f8fa page, #1a3343 text).
 * Amber stays the button colour, but amber text on white fails contrast, so
 * text-level accents use a darker burnt amber instead.
 */
export const Light: Theme = {
  code: 'light',
  label: 'Light',
  scheme: 'light',
  extends: '__base_dark__',
  properties: {
    '--bg': '#f5f8fa',
    '--surface': '#ffffff',
    '--surface-raised': '#eef1f4',
    '--surface-hover': '#e4e8ec',
    '--border': '#dde0e9',
    '--border-strong': '#b9bfca',

    '--text': '#1a3343',
    '--text-muted': '#4f6272',
    '--text-faint': '#8593a0',

    '--accent-text': '#9a5b00',
    '--link': '#00528e',

    '--positive': '#00896b',
    '--negative': '#c4264a',

    '--header-bg': 'rgba(245, 248, 250, 0.9)',
    '--code-bg': '#1a2630',
    '--code-text': '#e6edf2',
    '--focus-ring': '#9a5b00',
    '--selection': 'rgba(242, 168, 50, 0.35)',
  },
  enabled: true,
};
