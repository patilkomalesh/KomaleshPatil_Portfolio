import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { ContentService } from '../../services/content.service';
import { SiteContent } from '../../models/content.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  mobileMenuOpen = false;
  personName = '';

  constructor(
    private contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe((content: SiteContent | null) => {
      if (content) {
        this.personName = content.person.name;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  openCommandPalette(): void {
    document.dispatchEvent(new CustomEvent('open-command-palette'));
  }
}
