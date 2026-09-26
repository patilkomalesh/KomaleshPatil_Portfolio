import { Component, input } from '@angular/core';
import { Project } from '../../content/content.model';
import { isRealLink } from '../../content/content.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';

type Art = 'clusters' | 'parking' | 'trace' | 'dashboard' | null;

interface Point {
  x: number;
  y: number;
  c: number;
  d: number;
}

/** Deterministic pseudo-random so the drawing is the same on every load. */
function seeded(seed: number): () => number {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, TiltDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly projects = input.required<Project[]>();

  /** Three clusters for the K-means drawing; c is the cluster, d an animation delay. */
  protected readonly centroids = [
    { x: 70, y: 62 },
    { x: 180, y: 110 },
    { x: 262, y: 48 },
  ];
  protected readonly points: Point[] = (() => {
    const rnd = seeded(7);
    return this.centroids.flatMap((ctr, c) =>
      Array.from({ length: 11 }, () => ({
        x: ctr.x + (rnd() - 0.5) * 70,
        y: ctr.y + (rnd() - 0.5) * 52,
        c,
        d: Math.round(rnd() * 6000),
      })),
    );
  })();

  /** Car park: two rows of eight bays, some taken. */
  protected readonly bays = (() => {
    const rnd = seeded(3);
    return [0, 1].flatMap((row) =>
      Array.from({ length: 8 }, (_, i) => ({ x: 14 + i * 38, y: row === 0 ? 14 : 98, taken: rnd() > 0.45 })),
    );
  })();

  /** Layers a root-cause trace climbs through, deepest first. */
  protected readonly traceLayers = [
    { y: 130, w: 300, label: 'UI' },
    { y: 96, w: 250, label: 'API' },
    { y: 62, w: 190, label: 'Service' },
    { y: 28, w: 120, label: 'Data' },
  ];

  /** Weekly bars an AI observation gets drawn over. */
  protected readonly dashboardBars = (() => {
    const rnd = seeded(11);
    return Array.from({ length: 9 }, (_, i) => ({
      x: 12 + i * 35,
      h: 20 + rnd() * 90,
    }));
  })();

  art(p: Project): Art {
    if (/traceiq/i.test(p.name)) return 'trace';
    if (/financial analytics|dashboard/i.test(p.name)) return 'dashboard';
    if (/housing|recommend/i.test(p.name)) return 'clusters';
    if (/parking/i.test(p.name)) return 'parking';
    return null;
  }

  /**
   * A project usually gets one link, but a published paper also gets its
   * e-certificate alongside it as separate proof of publication.
   */
  links(p: Project): { label: string; url: string }[] {
    const l = p.links ?? {};
    const out: { label: string; url: string }[] = [];
    if (isRealLink(l.live)) out.push({ label: 'Visit the site', url: l.live });
    if (isRealLink(l.caseStudy)) out.push({ label: 'Read the case study', url: l.caseStudy });
    if (isRealLink(l.publication)) out.push({ label: 'Read the paper', url: l.publication });
    if (isRealLink(l.certificate)) out.push({ label: 'View certificate', url: l.certificate });
    if (out.length === 0 && isRealLink(l.repo)) out.push({ label: 'View the source', url: l.repo });
    return out;
  }
}
