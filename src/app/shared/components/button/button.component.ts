import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'link' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Output() clicked = new EventEmitter<Event>();

  getButtonClasses(): string {
    return [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`,
      this.fullWidth ? 'btn-full-width' : '',
      this.disabled ? 'btn-disabled' : ''
    ].filter(Boolean).join(' ');
  }

  handleClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
