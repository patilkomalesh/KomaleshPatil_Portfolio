import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { SiteContent } from '../../models/content.interface';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, BadgeComponent, ButtonComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  content: SiteContent | null = null;
  allTags: string[] = [];
  selectedTags = new Set<string>();
  featuredProjects: any[] = [];
  otherProjects: any[] = [];

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe((content: SiteContent | null) => {
      this.content = content;
      if (content) {
        this.updateProjectsData();
        this.checkQueryParams();
      }
    });
  }

  private updateProjectsData(): void {
    if (!this.content) return;
    
    // Extract all tags from projects
    const tagsSet = new Set<string>();
    this.content.projects.forEach(project => {
      project.stack?.forEach(tech => tagsSet.add(tech));
      project.tags?.forEach(tag => tagsSet.add(tag));
    });
    this.allTags = Array.from(tagsSet).sort();
    
    this.filterProjects();
  }

  private checkQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['project']) {
        // Scroll to or highlight specific project
        setTimeout(() => {
          const element = document.querySelector(`[data-project="${params['project']}"]`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    });
  }

  toggleTagFilter(tag: string): void {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.add(tag);
    }
    this.filterProjects();
  }

  clearFilters(): void {
    this.selectedTags.clear();
    this.filterProjects();
  }

  private filterProjects(): void {
    if (!this.content) return;
    
    let filteredProjects = this.content.projects;
    
    if (this.selectedTags.size > 0) {
      filteredProjects = filteredProjects.filter(project => 
        project.stack?.some(tech => this.selectedTags.has(tech)) ||
        project.tags?.some(tag => this.selectedTags.has(tag))
      );
    }
    
    this.featuredProjects = filteredProjects.filter(p => p.featured);
    this.otherProjects = filteredProjects.filter(p => !p.featured);
  }

  getProjectImage(project: any): string {
    if (project.images && project.images.length > 0) {
      return `assets/projects/${project.images[0]}`;
    }
    // Return a placeholder image
    return 'assets/images/project-placeholder.jpg';
  }

  openProjectDetail(project: any): void {
    // In a real application, this could open a modal or navigate to a detail page
    console.log('Opening project detail for:', project.name);
  }
}
