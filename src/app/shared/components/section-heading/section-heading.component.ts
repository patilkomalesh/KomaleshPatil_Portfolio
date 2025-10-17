import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss'
})
export class SectionHeadingComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() overline?: string;
}
