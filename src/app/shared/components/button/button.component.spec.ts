import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clicked event when not disabled', () => {
    spyOn(component.clicked, 'emit');
    component.disabled = false;
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    spyOn(component.clicked, 'emit');
    component.disabled = true;
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should apply correct variant classes', () => {
    component.variant = 'secondary';
    component.size = 'large';
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.className).toContain('btn-secondary');
    expect(button.className).toContain('btn-large');
  });
});
