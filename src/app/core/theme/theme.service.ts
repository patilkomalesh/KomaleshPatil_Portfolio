import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { ALL_TOKENS, DEFAULT_THEME_CODE, getTheme, resolveTheme } from './theme.registry';
import { Theme } from './theme.types';

const STORAGE_KEY = 'kp-theme';

/**
 * Applies a resolved theme by writing every token onto :root as an inline
 * custom property. index.html sets the stored scheme before Angular boots so
 * the first paint is already the right colour.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly active = signal<Theme>(this.initial());

  constructor() {
    this.apply(this.active());
  }

  set(code: string): void {
    const theme = getTheme(code);
    if (!theme) return;
    this.active.set(theme);
    this.apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme.code);
    } catch {
      // Private mode or blocked storage: the choice just won't persist.
    }
  }

  toggle(): void {
    this.set(this.active().scheme === 'dark' ? 'light' : 'dark');
  }

  private initial(): Theme {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    const prefersLight = this.doc.defaultView?.matchMedia('(prefers-color-scheme: light)').matches;
    return getTheme(stored) ?? getTheme(prefersLight ? 'light' : DEFAULT_THEME_CODE)!;
  }

  private apply(theme: Theme): void {
    const root = this.doc.documentElement;
    const resolved = resolveTheme(theme.code);
    for (const token of ALL_TOKENS) root.style.removeProperty(token);
    for (const token of ALL_TOKENS) root.style.setProperty(token, resolved[token]);
    root.dataset['theme'] = theme.code;
    root.style.colorScheme = theme.scheme;
  }
}
