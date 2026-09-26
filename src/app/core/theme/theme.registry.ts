import { BaseDark } from './themes/base-dark.theme';
import { Dark } from './themes/dark.theme';
import { Light } from './themes/light.theme';
import { THEME_TOKENS, ThemeToken } from './theme.tokens';
import { ResolvedTheme, Theme } from './theme.types';

const BASES: Theme[] = [BaseDark];

/** Every concrete theme, in picker order. */
export const ALL_THEMES: Theme[] = [Dark, Light];

export const SELECTABLE_THEMES: Theme[] = ALL_THEMES.filter((t) => t.enabled);

export const DEFAULT_THEME_CODE = 'dark';

const BY_CODE = new Map<string, Theme>();
for (const theme of [...BASES, ...ALL_THEMES]) {
  BY_CODE.set(theme.code, theme);
}

export function getTheme(code: string | null | undefined): Theme | undefined {
  if (!code) return undefined;
  const found = BY_CODE.get(code);
  return found?.enabled ? found : undefined;
}

/**
 * Walks the extends chain and merges parent-first, so a child's overrides win.
 * Throws on a cycle or a dangling parent rather than silently resolving short.
 */
export function resolveTheme(code: string): ResolvedTheme {
  const chain: Theme[] = [];
  let current = BY_CODE.get(code);
  if (!current) throw new Error(`Unknown theme code: ${code}`);

  while (current) {
    if (chain.includes(current)) throw new Error(`Cyclic theme inheritance at: ${current.code}`);
    chain.unshift(current);
    if (!current.extends) break;
    const parent = BY_CODE.get(current.extends);
    if (!parent) throw new Error(`Theme ${current.code} extends unknown theme ${current.extends}`);
    current = parent;
  }

  const out = {} as ResolvedTheme;
  for (const theme of chain) Object.assign(out, theme.properties);
  return out;
}

export const ALL_TOKENS: readonly ThemeToken[] = THEME_TOKENS;
