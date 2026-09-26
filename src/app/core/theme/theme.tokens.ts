// The theme token contract.
//
// Every CSS custom property a theme may set. A theme that sets a token not listed
// here is a compile error, and ThemeService clears every token in this list on
// switch, so a token missing from here is never written to :root.
//
// Same shape as the FiveStar shell's contract, kept deliberately small: add a
// token when a component needs a value that differs between themes, not before.

export const THEME_TOKENS = [
  // Surfaces, darkest to lightest in dark mode
  '--bg',
  '--surface',
  '--surface-raised',
  '--surface-hover',
  '--border',
  '--border-strong',

  // Text
  '--text',
  '--text-muted',
  '--text-faint',

  // Brand
  '--accent',
  '--accent-hover',
  '--accent-text',
  '--on-accent',
  '--link',

  // Status
  '--positive',
  '--negative',

  // Chrome
  '--header-bg',
  '--code-bg',
  '--code-text',
  '--focus-ring',
  '--selection',
] as const;

export type ThemeToken = (typeof THEME_TOKENS)[number];

/** Every token has a value. Only base themes satisfy this. */
export type ThemeTokenMap = Record<ThemeToken, string>;

/** Child themes override only what differs from their parent. */
export type ThemeOverrides = Partial<ThemeTokenMap>;
