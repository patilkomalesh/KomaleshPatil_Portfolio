import { ThemeOverrides, ThemeTokenMap } from './theme.tokens';

export interface Theme {
  /** Identity. Persisted in localStorage, so do not rename a shipped code. */
  code: string;
  /** Display label for a future theme picker. */
  label: string;
  /** Drives `color-scheme` so native controls and scrollbars match. */
  scheme: 'light' | 'dark';
  /** Code of the theme this one inherits from. Undefined only for a base. */
  extends?: string;
  /** Only the tokens this theme sets on top of its parent. */
  properties: ThemeOverrides;
  /** Bases are resolvable parents but never selectable on their own. */
  enabled: boolean;
}

/** A fully resolved theme: every token in the contract has a value. */
export type ResolvedTheme = ThemeTokenMap;
