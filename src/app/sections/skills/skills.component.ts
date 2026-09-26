import { Component, input } from '@angular/core';
import { SkillGroup } from '../../content/content.model';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  template: `
    <section class="skills" id="skills" data-tone="base">
      <header class="section-head" appReveal>
        <h2>What I work with</h2>
      </header>

      <div class="lanes">
        @for (g of groups(); track g.category; let i = $index) {
          <div class="lane" [appReveal]="i * 150" [class.lane--reverse]="i % 2 === 1">
            <h3 class="lane__label">{{ g.category }}</h3>
            <div class="lane__track" [style.--speed]="40 + i * 8 + 's'">
              <!-- Two copies so the loop has no seam; the second is hidden from screen readers. -->
              @for (copy of [0, 1]; track copy) {
                <ul class="lane__items" [attr.aria-hidden]="copy === 1 ? 'true' : null">
                  @for (s of g.items; track s.name) {
                    <li [class.strong]="s.level === 'Advanced'">{{ s.name }}</li>
                  }
                  @for (s of g.items; track s.name + '-again') {
                    <li [class.strong]="s.level === 'Advanced'">{{ s.name }}</li>
                  }
                </ul>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .skills {
      padding: 140px 0 60px;
    }
    .lanes {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 56px;
    }
    .lane {
      display: grid;
      grid-template-columns: 200px minmax(0, 1fr);
      align-items: center;
      gap: 24px;
      padding: 18px 0;
      border-top: 1px solid var(--border);
    }
    .lane__label {
      font-family: var(--font-sans);
      font-size: 15px;
      font-weight: 500;
      color: var(--accent-text);
    }
    .lane__track {
      display: flex;
      overflow: hidden;
      mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
    }
    .lane__items {
      display: flex;
      flex: none;
      gap: 14px;
      margin: 0;
      padding: 0 14px 0 0;
      list-style: none;
      animation: slide var(--speed, 40s) linear infinite;
    }
    .lane--reverse .lane__items {
      animation-direction: reverse;
    }
    .lane:hover .lane__items {
      animation-play-state: paused;
    }
    li {
      flex: none;
      padding: 10px 20px;
      border: 1px solid var(--border-strong);
      border-radius: 999px;
      font-family: var(--font-display);
      font-size: 20px;
      white-space: nowrap;
      color: var(--text-muted);
      transition: color 0.5s ease, border-color 0.5s ease, background-color 0.5s ease;
    }
    li.strong {
      color: var(--text);
      border-color: color-mix(in srgb, var(--accent) 50%, var(--border-strong));
    }
    li:hover {
      color: var(--on-accent);
      background: var(--accent);
      border-color: var(--accent);
    }
    @keyframes slide {
      to {
        transform: translateX(-100%);
      }
    }
    @media (max-width: 760px) {
      .skills {
        padding-top: 96px;
      }
      .lane {
        grid-template-columns: minmax(0, 1fr);
        gap: 12px;
      }
      li {
        font-size: 17px;
        padding: 8px 16px;
      }
    }
  `,
})
export class SkillsComponent {
  readonly groups = input.required<SkillGroup[]>();
}
