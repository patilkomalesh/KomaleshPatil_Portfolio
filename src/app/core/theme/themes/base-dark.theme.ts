import { ThemeTokenMap } from '../theme.tokens';
import { Theme } from '../theme.types';

/**
 * Root of the theme tree. Every token must be set here so a child theme can
 * never resolve short. Values follow the FiveStar shell's Dark theme: true black
 * page, #232323 panels, amber as the one brand colour.
 */
const properties: ThemeTokenMap = {
  '--bg': '#000000',
  '--surface': '#141414',
  '--surface-raised': '#232323',
  '--surface-hover': '#363636',
  '--border': '#2b2b2b',
  '--border-strong': '#464646',

  '--text': '#f7f7f7',
  '--text-muted': '#a6a6a6',
  '--text-faint': '#6f6f6f',

  '--accent': '#f2a832',
  '--accent-hover': '#f5b95a',
  '--accent-text': '#f2a832',
  '--on-accent': '#000000',
  '--link': '#00befe',

  '--positive': '#00d8a8',
  '--negative': '#ff5c7e',

  '--header-bg': 'rgba(0, 0, 0, 0.86)',
  '--code-bg': '#0c0c0c',
  '--code-text': '#e6e6e6',
  '--focus-ring': '#f2a832',
  '--selection': 'rgba(242, 168, 50, 0.32)',
};

export const BaseDark: Theme = {
  code: '__base_dark__',
  label: 'Base',
  scheme: 'dark',
  properties,
  enabled: false,
};
