import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() confirmText: string = '';
  @Input() cancelText: string = '';
  @Input() showCloseBtn = true;
  @Input() isOpen: boolean = false;
  @Input() showFooter: boolean = false;

  @Output() closeClick = new EventEmitter<void>();
  @Output() confirmClick = new EventEmitter<void>();
  @Output() cancelClick = new EventEmitter<void>();

  onClose() {
    this.closeClick.emit();
  }

  onConfirm() {
    this.confirmClick.emit();
  }

  onCancel() {
    this.cancelClick.emit();
  }
}
