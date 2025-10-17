import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { SiteContent } from '../../models/content.interface';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeadingComponent, ButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  content: SiteContent | null = null;
  emailCopied = false;
  isSubmitting = false;
  
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe((content: SiteContent | null) => {
      this.content = content;
    });
  }

  async copyEmail(): Promise<void> {
    if (!this.content?.person?.email) return;
    
    try {
      await navigator.clipboard.writeText(this.content.person.email);
      this.emailCopied = true;
      
      setTimeout(() => {
        this.emailCopied = false;
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      this.createEmailLink();
    }
  }

  private createEmailLink(): void {
    if (!this.content?.person?.email) return;
    window.location.href = `mailto:${this.content.person.email}`;
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

  submitForm(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }
    
    this.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! This is a demo form - in a real application, this would send an email.');
      this.resetForm();
      this.isSubmitting = false;
    }, 1500);
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
