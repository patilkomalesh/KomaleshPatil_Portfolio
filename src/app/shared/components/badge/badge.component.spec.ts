import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.badge')).toBeTruthy();
  });

  it('should apply correct variant class', () => {
    component.variant = 'primary';
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge).toHaveClass('badge-primary');
  });

  it('should apply correct size class', () => {
    component.size = 'large';
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge).toHaveClass('badge-large');
  });
});
