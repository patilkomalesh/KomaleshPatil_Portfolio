import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, startWith, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommandPaletteService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpenSubject.asObservable();

  private commands = [
    { id: 'home', label: 'Go to Home', action: () => this.navigateTo('/') },
    { id: 'experience', label: 'View Experience', action: () => this.navigateTo('/experience') },
    { id: 'projects', label: 'View Projects', action: () => this.navigateTo('/projects') },
    { id: 'skills', label: 'View Skills', action: () => this.navigateTo('/skills') },
    { id: 'education', label: 'View Education', action: () => this.navigateTo('/education') },
    { id: 'contact', label: 'Contact Me', action: () => this.navigateTo('/contact') },
    { id: 'toggle-theme', label: 'Toggle Theme', action: () => this.toggleTheme() }
  ];

  constructor() {
    this.setupKeyboardListener();
  }

  private setupKeyboardListener(): void {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        debounceTime(50)
      )
      .subscribe(event => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
          event.preventDefault();
          this.toggle();
        }
        if (event.key === 'Escape') {
          this.close();
        }
      });
  }

  toggle(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  open(): void {
    this.isOpenSubject.next(true);
  }

  close(): void {
    this.isOpenSubject.next(false);
  }

  getCommands() {
    return this.commands;
  }

  executeCommand(commandId: string): void {
    const command = this.commands.find(cmd => cmd.id === commandId);
    if (command) {
      command.action();
      this.close();
    }
  }

  private navigateTo(route: string): void {
    // This will be injected with Router service when needed
    window.location.hash = route;
  }

  private toggleTheme(): void {
    // This will be injected with ThemeService when needed
    document.dispatchEvent(new CustomEvent('toggle-theme'));
  }
}
