import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../../services/theme.service';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', ['toggleTheme'], {
      theme$: { subscribe: jasmine.createSpy().and.returnValue({ unsubscribe: jasmine.createSpy() }) }
    });

    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme when button is clicked', () => {
    const button = fixture.nativeElement.querySelector('.theme-toggle');
    button.click();
    
    expect(themeService.toggleTheme).toHaveBeenCalled();
  });

  it('should show correct icon for light theme', () => {
    component.currentTheme = 'light';
    fixture.detectChanges();
    
    const icon = fixture.nativeElement.querySelector('.icon');
    expect(icon.textContent.trim()).toBe('🌙');
  });

  it('should show correct icon for dark theme', () => {
    component.currentTheme = 'dark';
    fixture.detectChanges();
    
    const icon = fixture.nativeElement.querySelector('.icon');
    expect(icon.textContent.trim()).toBe('☀️');
  });
});
