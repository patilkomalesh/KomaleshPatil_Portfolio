import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, effect, inject, signal } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { TONES, Tone } from './tones';

/**
 * Page-level scroll state: which tone the page is in, how far down it is, and
 * whether the reader is heading down (used to tuck the nav away).
 *
 * Colours are written to :root as --page-bg / --glow / --glow-alt. Those are
 * registered with @property in styles.scss, so the browser interpolates them
 * and the change reads as a slow wash rather than a cut.
 */
@Injectable({ providedIn: 'root' })
export class ScrollAtmosphereService {
  private readonly doc = inject(DOCUMENT);
  private readonly theme = inject(ThemeService);
  private readonly zone = inject(NgZone);

  readonly tone = signal<Tone>('base');
  readonly progress = signal(0);
  readonly scrollingDown = signal(false);
  readonly atTop = signal(true);

  private observer?: IntersectionObserver;
  private lastY = 0;
  private ticking = false;

  constructor() {
    effect(() => this.paint(this.tone(), this.theme.active().scheme));
  }

  /** Call once the sections are in the DOM. */
  watch(root: HTMLElement): void {
    this.observer?.disconnect();
    // A section "owns" the page while it crosses the middle band of the viewport.
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) this.tone.set((e.target as HTMLElement).dataset['tone'] as Tone);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    root.querySelectorAll<HTMLElement>('[data-tone]').forEach((s) => this.observer!.observe(s));

    const win = this.doc.defaultView!;
    this.zone.runOutsideAngular(() => win.addEventListener('scroll', () => this.onScroll(), { passive: true }));
    this.onScroll();
  }

  private onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      const win = this.doc.defaultView!;
      const y = win.scrollY;
      const max = this.doc.documentElement.scrollHeight - win.innerHeight;
      this.zone.run(() => {
        this.progress.set(max > 0 ? Math.min(1, y / max) : 0);
        // Small dead zone so trackpad jitter doesn't flicker the nav.
        if (Math.abs(y - this.lastY) > 6) this.scrollingDown.set(y > this.lastY && y > 160);
        this.atTop.set(y < 24);
      });
      this.lastY = y;
      this.ticking = false;
    });
  }

  private paint(tone: Tone, scheme: 'light' | 'dark'): void {
    const c = TONES[scheme][tone];
    const root = this.doc.documentElement.style;
    root.setProperty('--page-bg', c.bg);
    root.setProperty('--glow', c.glow);
    root.setProperty('--glow-alt', c.glowAlt);
  }
}
