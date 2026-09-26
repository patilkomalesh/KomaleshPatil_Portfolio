import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { ScrollAtmosphereService } from './core/scroll/scroll-atmosphere.service';
import { ThemeService } from './core/theme/theme.service';
import { ContentService } from './content/content.service';
import { BackgroundComponent } from './sections/background/background.component';
import { ContactComponent } from './sections/contact/contact.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { WorkComponent } from './sections/work/work.component';

@Component({
  selector: 'app-root',
  imports: [
    HeroComponent,
    WorkComponent,
    ProjectsComponent,
    SkillsComponent,
    BackgroundComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly theme = inject(ThemeService);
  protected readonly scroll = inject(ScrollAtmosphereService);
  protected readonly content = inject(ContentService).content;

  protected readonly resumeUrl = 'assets/Komalesh_Patil_FullStack.pdf';
  protected readonly year = new Date().getFullYear();

  readonly nav = [
    { label: 'Work', id: 'work' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
  ];

  private readonly main = viewChild<ElementRef<HTMLElement>>('main');

  constructor() {
    // Sections only exist once content.json has loaded, so start watching then.
    effect(() => {
      const el = this.main()?.nativeElement;
      if (el) queueMicrotask(() => this.scroll.watch(el));
    });
  }
}
