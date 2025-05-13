import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() placeholder: string = 'Enter value';
  @Input() label?: string;
  @Input() disabled:boolean = false;
  @Input() readonly:boolean = false;
  @Input() required:boolean = false;
  @Input() autocomplete: boolean = false;
  @Input() variant: 'outline' | 'filled' = 'outline';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() fullWidth = false;
}
