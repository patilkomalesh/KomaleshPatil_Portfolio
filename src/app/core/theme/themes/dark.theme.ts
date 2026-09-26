import { Theme } from '../theme.types';

/** 0 overrides on top of the root base, same as the shell's Dark. */
export const Dark: Theme = {
  code: 'dark',
  label: 'Dark',
  scheme: 'dark',
  extends: '__base_dark__',
  properties: {},
  enabled: true,
};
