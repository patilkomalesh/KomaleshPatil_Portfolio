import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { SiteContent } from '../../models/content.interface';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  content: SiteContent | null = null;
  featuredProjects: any[] = [];
  currentYear = new Date().getFullYear();

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe((content: SiteContent | null) => {
      this.content = content;
      if (content) {
        this.featuredProjects = content.projects.filter(p => p.featured);
      }
    });
  }

  getShortSummary(): string {
    const summary = this.content?.person?.summary || '';
    return summary.length > 120 ? summary.substring(0, 120) + '...' : summary;
  }

  getSocialIcon(platform: string): string {
    const icons: { [key: string]: string } = {
      'github': '🐙',
      'linkedin': '💼',
      'twitter': '🐦',
      'instagram': '📸',
      'youtube': '📺',
      'website': '🌐',
      'blog': '📝'
    };
    
    return icons[platform.toLowerCase()] || '🔗';
  }

  getLastUpdated(): string {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  }
}
