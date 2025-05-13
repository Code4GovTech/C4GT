import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() logoUrl: string = '';
  @Input() userAvatarUrl: string = '';
  @Input() navLinks: object = {};
  @Input() showAuthButton: boolean = false;
}
