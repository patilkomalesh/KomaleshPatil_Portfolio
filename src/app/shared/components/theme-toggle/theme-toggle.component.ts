import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: string = 'light';
  isTransitioning: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleTheme(): void {
    this.isTransitioning = true;
    this.themeService.toggleTheme();
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 300);
  }
}
