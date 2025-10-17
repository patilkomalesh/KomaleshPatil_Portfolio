import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentService } from './services/content.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  title = 'Angular Portfolio';

  constructor(
    private contentService: ContentService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Load content on app initialization
    this.contentService.loadContent().subscribe();
    
    // Set up theme listener
    document.addEventListener('toggle-theme', () => {
      this.themeService.toggleTheme();
    });
  }
}
