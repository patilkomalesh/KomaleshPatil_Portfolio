import { Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Tilts the element towards the pointer and moves a highlight with it, via
 * --tilt-x, --tilt-y, --glare-x and --glare-y. The easing is in CSS and kept
 * slow, so the card leans rather than snaps.
 */
@Directive({
  selector: '[appTilt]',
  host: {
    class: 'tilt',
    '(pointermove)': 'move($event)',
    '(pointerleave)': 'reset()',
  },
})
export class TiltDirective {
  /** Maximum lean in degrees. */
  readonly strength = input(8, { alias: 'appTilt', transform: (v: unknown) => Number(v) || 8 });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly finePointer =
    typeof matchMedia !== 'undefined' && matchMedia('(pointer: fine)').matches;

  move(e: PointerEvent): void {
    if (!this.finePointer) return;
    const node = this.el.nativeElement;
    const r = node.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const s = this.strength();
    node.style.setProperty('--tilt-x', `${(0.5 - py) * s}deg`);
    node.style.setProperty('--tilt-y', `${(px - 0.5) * s}deg`);
    node.style.setProperty('--glare-x', `${px * 100}%`);
    node.style.setProperty('--glare-y', `${py * 100}%`);
  }

  reset(): void {
    const s = this.el.nativeElement.style;
    s.setProperty('--tilt-x', '0deg');
    s.setProperty('--tilt-y', '0deg');
  }
}
