import { Component, computed, input, signal } from '@angular/core';
import { Person } from '../../content/content.model';
import { isRealLink } from '../../content/content.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  template: `
    <section class="contact" id="contact" data-tone="ember">
      <a href="#top" class="contact__mark" appReveal aria-label="Back to top">KP</a>
      <h2 class="reveal--scale" [appReveal]="80">Let's talk.</h2>
      <p class="lead" [appReveal]="150">
        I'm open to software developer roles. Email is the quickest way to reach me.
      </p>

      <div class="mail" [appReveal]="300">
        <a [href]="'mailto:' + person().email" class="mail__link">{{ person().email }}</a>
        <button type="button" class="mail__copy" (click)="copy()">
          {{ copied() ? 'Copied' : 'Copy' }}
        </button>
      </div>

      @if (person().phone) {
        <a [href]="'tel:' + person().phone" class="phone" [appReveal]="380">{{ person().phone }}</a>
      }

      <div class="more" [appReveal]="450">
        @for (s of socials(); track s.url) {
          <a [href]="s.url" target="_blank" rel="noopener" class="btn btn--secondary">{{ s.label }}</a>
        }
        <a [href]="resumeUrl()" target="_blank" rel="noopener" class="btn btn--secondary">Résumé</a>
      </div>
    </section>
  `,
  styles: `
    .contact {
      padding: 180px 0 140px;
      text-align: center;
    }
    .contact__mark {
      display: inline-grid;
      place-items: center;
      width: 48px;
      height: 48px;
      margin-bottom: 28px;
      border-radius: 50%;
      background: var(--accent);
      color: var(--on-accent);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      transition: transform 0.7s var(--ease-out-slow);
    }
    .contact__mark:hover {
      transform: rotate(-12deg) scale(1.08);
    }
    h2 {
      font-size: clamp(56px, 10vw, 132px);
      font-weight: 700;
      letter-spacing: -0.045em;
      line-height: 0.95;
    }
    .lead {
      max-width: 44ch;
      margin: 24px auto 0;
      font-size: 18px;
      color: var(--text-muted);
    }
    .mail {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 44px;
    }
    .mail__link {
      position: relative;
      font-family: var(--font-display);
      font-size: clamp(22px, 3.6vw, 40px);
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--text);
      text-decoration: none;
      word-break: break-all;
      background: linear-gradient(var(--accent), var(--accent)) left bottom / 100% 2px no-repeat;
      transition: background-size 0.9s var(--ease-out-slow), color 0.5s ease;
    }
    .mail__link:hover {
      color: var(--on-accent);
      background-size: 100% 100%;
    }
    .mail__copy {
      height: 34px;
      padding: 0 14px;
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      background: transparent;
      color: var(--text-muted);
      font: 14px var(--font-sans);
      cursor: pointer;
      transition: color 0.4s ease, border-color 0.4s ease;
    }
    .mail__copy:hover {
      color: var(--text);
      border-color: var(--accent);
    }
    .phone {
      display: block;
      margin-top: 12px;
      color: var(--text-muted);
      font-size: 16px;
      text-decoration: none;
    }
    .phone:hover {
      color: var(--text);
    }
    .more {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 36px;
    }
    @media (max-width: 640px) {
      .contact {
        padding: 120px 0 96px;
      }
    }
  `,
})
export class ContactComponent {
  readonly person = input.required<Person>();
  readonly resumeUrl = input.required<string>();

  protected readonly socials = computed(() => this.person().socials.filter((s) => isRealLink(s.url)));
  protected readonly copied = signal(false);

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.person().email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      // Clipboard blocked; the address is still selectable.
    }
  }
}
