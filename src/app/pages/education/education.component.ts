import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { SiteContent } from '../../models/content.interface';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, BadgeComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit {
  content: SiteContent | null = null;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe((content: SiteContent | null) => {
      this.content = content;
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }

  calculateDuration(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const years = endDate.getFullYear() - startDate.getFullYear();
    
    if (years === 0) {
      return '< 1 year';
    } else if (years === 1) {
      return '1 year';
    } else {
      return `${years} years`;
    }
  }

  getEducationCount(): number {
    return this.content?.education?.length || 0;
  }

  getCertificationCount(): number {
    return this.content?.certifications?.length || 0;
  }

  getLatestYear(): string {
    if (!this.content) return '—';
    
    const years: number[] = [];
    
    // Add education years
    this.content.education?.forEach(edu => {
      years.push(new Date(edu.end).getFullYear());
    });
    
    // Add certification years
    this.content.certifications?.forEach(cert => {
      if (cert.year) {
        years.push(parseInt(cert.year));
      }
    });
    
    return years.length > 0 ? Math.max(...years).toString() : '—';
  }

  getTotalAchievements(): number {
    if (!this.content) return 0;
    
    let total = 0;
    this.content.education?.forEach(edu => {
      total += edu.achievements?.length || 0;
    });
    
    return total;
  }
}
