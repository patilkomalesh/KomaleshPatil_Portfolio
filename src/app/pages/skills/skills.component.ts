import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { SiteContent } from '../../models/content.interface';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, BadgeComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  content: SiteContent | null = null;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe((content: SiteContent | null) => {
      this.content = content;
    });
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Frontend': '🎨',
      'Backend': '⚙️',
      'Database': '🗄️',
      'Databases': '🗄️',
      'Cloud': '☁️',
      'Cloud & DevOps': '☁️',
      'DevOps': '🚀',
      'Tools': '🔧',
      'Mobile': '📱',
      'Languages': '💻',
      'Frameworks': '🏗️'
    };
    
    return icons[category] || '💡';
  }

  getSkillLevelClass(level?: string): string {
    if (!level) return '';
    return `skill-level-${level.toLowerCase()}`;
  }

  getLevelBadgeVariant(level?: string): 'primary' | 'secondary' | 'success' | 'warning' | 'error' {
    switch (level) {
      case 'Advanced': return 'success';
      case 'Intermediate': return 'warning';
      case 'Beginner': return 'secondary';
      default: return 'primary';
    }
  }

  getLevelPercentage(level?: string): number {
    switch (level) {
      case 'Advanced': return 90;
      case 'Intermediate': return 65;
      case 'Beginner': return 35;
      default: return 50;
    }
  }

  getCloudSize(level?: string): 'small' | 'medium' | 'large' {
    switch (level) {
      case 'Advanced': return 'large';
      case 'Intermediate': return 'medium';
      default: return 'small';
    }
  }

  getTotalSkills(): number {
    if (!this.content) return 0;
    return this.content.skills.reduce((total, category) => total + category.items.length, 0);
  }

  getAdvancedSkills(): number {
    if (!this.content) return 0;
    return this.content.skills.reduce((total, category) => 
      total + category.items.filter(skill => skill.level === 'Advanced').length, 0
    );
  }

  getCategories(): number {
    return this.content?.skills.length || 0;
  }

  getAllSkills(): any[] {
    if (!this.content) return [];
    
    const allSkills: any[] = [];
    this.content.skills.forEach(category => {
      allSkills.push(...category.items);
    });
    
    return allSkills.sort((a, b) => {
      const levelOrder = { 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
      const aLevel = levelOrder[a.level as keyof typeof levelOrder] || 0;
      const bLevel = levelOrder[b.level as keyof typeof levelOrder] || 0;
      return bLevel - aLevel;
    });
  }
}
