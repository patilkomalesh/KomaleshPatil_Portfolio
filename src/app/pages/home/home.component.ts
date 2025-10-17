import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { SiteContent } from '../../models/content.interface';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, BadgeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  content: SiteContent | null = null;
  featuredProjects: any[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe((content: SiteContent | null) => {
      this.content = content;
      if (content) {
        this.featuredProjects = content.projects.filter(p => p.featured).slice(0, 3);
      }
    });
  }

  downloadCV(): void {
    // In a real application, this would trigger a CV download
    // For now, we'll show an alert
    alert('CV download functionality would be implemented here');
  }

  getSocialIcon(platform: string): string {
    const icons: { [key: string]: string } = {
      'github': '🐙',
      'linkedin': '💼',
      'twitter': '🐦',
      'email': '📧',
      'website': '🌐'
    };
    
    return icons[platform.toLowerCase()] || '🔗';
  }

  getInitials(name?: string): string {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
