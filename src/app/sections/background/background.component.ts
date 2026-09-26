import { Component, input } from '@angular/core';
import { SiteContent } from '../../content/content.model';
import { formatMonth } from '../../content/content.service';
import { RevealDirective } from '../../shared/reveal.directive';

/** Education, the published paper and college roles. */
@Component({
  selector: 'app-background',
  imports: [RevealDirective],
  template: `
    <section class="background" data-tone="amber">
      <header class="section-head" appReveal>
        <h2>Before all this</h2>
      </header>

      <div class="cols">
        <div class="col">
          @for (e of content().education; track e.school) {
            <article class="block" appReveal>
              <p class="block__label">Studied</p>
              <h3>{{ e.program }}</h3>
              <p class="block__meta">{{ e.school }}</p>
              <p class="block__meta">
                {{ month(e.start) }} to {{ month(e.end) }}@if (e.grade) {<span class="grade">{{ e.grade }}</span>}
              </p>
            </article>
          }

          @for (pub of content().publications ?? []; track pub.title) {
            <article class="block" [appReveal]="150">
              <p class="block__label">Published</p>
              <h3>
                @if (pub.url) {
                  <a [href]="pub.url" target="_blank" rel="noopener">{{ pub.title }}</a>
                } @else {
                  {{ pub.title }}
                }
              </h3>
              <p class="block__meta"><em>{{ pub.journal }}</em>, {{ pub.year }}</p>
              <p class="block__authors">With {{ coauthors(pub.authors) }}</p>
              @if (pub.certificateUrl) {
                <a [href]="pub.certificateUrl" target="_blank" rel="noopener" class="block__cert">
                  View certificate
                </a>
              }
            </article>
          }
        </div>

        <div class="col">
          @for (r of content().leadership ?? []; track r.organization; let i = $index) {
            <article class="block reveal--right" [appReveal]="i * 150">
              <p class="block__label">{{ month(r.start) }} to {{ month(r.end) }}</p>
              <h3>{{ r.role }}</h3>
              <p class="block__meta">{{ r.organization }}</p>
              <ul>
                @for (h of r.highlights; track h) {
                  <li>{{ h }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .background {
      padding: 140px 0 60px;
    }
    .cols {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px;
      margin-top: 56px;
    }
    .col {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .block {
      padding: 26px 28px;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: color-mix(in srgb, var(--surface) 70%, transparent);
      backdrop-filter: blur(6px);
    }
    .block__label {
      margin-bottom: 10px;
      font-size: 13.5px;
      color: var(--accent-text);
    }
    h3 {
      font-size: 21px;
      letter-spacing: -0.01em;
      line-height: 1.25;
    }
    h3 a {
      color: inherit;
      text-decoration: underline;
      text-decoration-color: color-mix(in srgb, var(--accent) 60%, transparent);
      text-underline-offset: 5px;
    }
    h3 a:hover {
      color: var(--accent-text);
    }
    .block__meta {
      margin-top: 6px;
      color: var(--text-muted);
    }
    .grade {
      margin-left: 10px;
      padding: 2px 10px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--accent) 16%, transparent);
      color: var(--accent-text);
      font-size: 13.5px;
    }
    .block__authors {
      margin-top: 12px;
      font-size: 14px;
      color: var(--text-faint);
    }
    .block__cert {
      display: inline-block;
      margin-top: 14px;
      color: var(--text-muted);
      font-size: 14px;
      text-decoration: underline;
      text-decoration-color: var(--border-strong);
      text-underline-offset: 3px;
      transition: color 0.4s ease, text-decoration-color 0.4s ease;
    }
    .block__cert:hover {
      color: var(--accent-text);
      text-decoration-color: var(--accent);
    }
    ul {
      margin: 14px 0 0;
      padding-left: 18px;
      color: var(--text-muted);
    }
    li + li {
      margin-top: 6px;
    }
    li::marker {
      color: var(--accent);
    }
    @media (max-width: 820px) {
      .background {
        padding-top: 96px;
      }
      .cols {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class BackgroundComponent {
  readonly content = input.required<SiteContent>();
  protected readonly month = formatMonth;

  /** Everyone except the first author, who is the site owner. */
  coauthors(authors: string[]): string {
    return authors.slice(1).join(', ');
  }
}
