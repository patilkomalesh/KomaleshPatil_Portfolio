import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { SiteContent } from '../../models/content.interface';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, BadgeComponent, ButtonComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  content: SiteContent | null = null;
  allSkills: string[] = [];
  selectedSkills = new Set<string>();
  filteredExperience: any[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe((content: SiteContent | null) => {
      this.content = content;
      if (content) {
        this.updateExperienceData();
      }
    });
  }

  private updateExperienceData(): void {
    if (!this.content) return;
    
    // Extract all skills from experience
    const skillsSet = new Set<string>();
    this.content.experience.forEach(exp => {
      exp.stack?.forEach(skill => skillsSet.add(skill));
    });
    this.allSkills = Array.from(skillsSet).sort();
    
    this.filterExperience();
  }

  toggleSkillFilter(skill: string): void {
    if (this.selectedSkills.has(skill)) {
      this.selectedSkills.delete(skill);
    } else {
      this.selectedSkills.add(skill);
    }
    this.filterExperience();
  }

  clearFilters(): void {
    this.selectedSkills.clear();
    this.filterExperience();
  }

  private filterExperience(): void {
    if (!this.content) return;
    
    if (this.selectedSkills.size === 0) {
      this.filteredExperience = this.content.experience;
    } else {
      this.filteredExperience = this.content.experience.filter(exp => 
        exp.stack?.some(skill => this.selectedSkills.has(skill))
      );
    }
  }

  formatDate(dateString: string): string {
    if (dateString === 'Present') {
      return 'Present';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }

  calculateDuration(start: string, end?: string): string {
    const startDate = new Date(start);
    const endDate = (end && end !== 'Present') ? new Date(end) : new Date();
    
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} yr${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} yr${years !== 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
    }
  }
}
