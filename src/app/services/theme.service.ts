import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemePreference } from '../models/content.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  private themeSubject = new BehaviorSubject<string>('light');
  
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = 'light';
    
    if (savedTheme) {
      theme = savedTheme;
    } else if (prefersDark) {
      theme = 'dark';
    }
    
    this.setTheme(theme);
  }

  setTheme(theme: string): void {
    this.themeSubject.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getCurrentTheme(): string {
    return this.themeSubject.value;
  }
}
