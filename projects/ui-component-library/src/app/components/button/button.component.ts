import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  label: string = 'Click Me';
  variant: 'primary' | 'secondary' = 'primary';
  disabled: boolean = false;
}
