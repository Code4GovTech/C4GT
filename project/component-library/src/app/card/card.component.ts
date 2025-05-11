import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = "";
  @Input() subtitle?: string = "";
  @Input() badgeText?: string = "";
  @Input() bodyText: string = "";
  @Input() imageSrc: string = "";
  @Input() showBadge: boolean = true;
  @Input() showLikeBtn: boolean = true;
  @Input() showShareBtn: boolean = true;
  
  @Output() readMoreClick = new EventEmitter<void>();
  @Output() likeClick = new EventEmitter<void>();
  @Output() shareClick = new EventEmitter<void>();

  onReadMoreClick() {
    this.readMoreClick.emit();
  }

  onLikeClick() {
    this.likeClick.emit();
  }

  onShareClick() {
    this.shareClick.emit();
  }
}
