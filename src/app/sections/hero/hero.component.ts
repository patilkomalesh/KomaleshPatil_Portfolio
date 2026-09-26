import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { SiteContent } from '../../content/content.model';
import { isRealLink } from '../../content/content.service';
import { TiltDirective } from '../../shared/tilt.directive';

@Component({
  selector: 'app-hero',
  imports: [TiltDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly content = input.required<SiteContent>();
  readonly resumeUrl = input.required<string>();

  protected readonly person = computed(() => this.content().person);
  protected readonly currentJob = computed(() => this.content().experience[0]);
  protected readonly socials = computed(() => this.person().socials.filter((s) => isRealLink(s.url)));

  /** First name alone for the greeting; the full name sits on the card. */
  protected readonly firstName = computed(() => this.person().name.split(' ')[0]);

  protected readonly initials = computed(() => {
    const parts = this.person().name.replace(/\./g, '').split(/\s+/).filter(Boolean);
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  /** Company without the trailing city, which the card already shows. */
  protected readonly company = computed(() => this.currentJob()?.company.split(',')[0] ?? '');

  protected readonly localTime = signal(this.puneTime());

  constructor() {
    const id = setInterval(() => this.localTime.set(this.puneTime()), 20_000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  private puneTime(): string {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    }).format(new Date());
  }
}
