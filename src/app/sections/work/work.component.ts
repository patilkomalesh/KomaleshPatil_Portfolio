import { Component, ElementRef, HostListener, inject, input, signal } from '@angular/core';
import { Job } from '../../content/content.model';
import { formatMonth } from '../../content/content.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-work',
  imports: [RevealDirective],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent {
  readonly jobs = input.required<Job[]>();

  protected readonly month = formatMonth;

  /** 0..1, how much of the timeline the reader has scrolled past. */
  protected readonly fill = signal(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private queued = false;

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onScroll(): void {
    if (this.queued) return;
    this.queued = true;
    requestAnimationFrame(() => {
      this.queued = false;
      const rail = this.el.nativeElement.querySelector('.timeline');
      if (!rail) return;
      const r = rail.getBoundingClientRect();
      // The line fills up to wherever the middle of the screen is.
      const mid = window.innerHeight * 0.55;
      this.fill.set(Math.max(0, Math.min(1, (mid - r.top) / r.height)));
    });
  }

  endLabel(end: string | undefined): string {
    return formatMonth(end === 'Present' ? undefined : end);
  }

  company(job: Job): string {
    return job.company.split(',')[0];
  }
}
