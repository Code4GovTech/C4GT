import { Component } from '@angular/core';

@Component({
  selector: 'host-component',
  template: `
    <app-button
      [label]="label"
      [variant]="variant"
      [disabled]="disabled"
    ></app-button>
  `,
})
export class HostComponent {
  label: string = 'Primary Button';
  variant: 'primary' | 'secondary' = 'primary';
  disabled: boolean = false;
}
