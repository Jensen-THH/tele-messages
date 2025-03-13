import { CommonModule } from '@angular/common';
import { ConfirmDialogData } from './../../interfaces/interfaces'
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() data: ConfirmDialogData = { message: '' }
  @Output() confirmed = new EventEmitter<boolean>();

  onCancel() {
    this.confirmed.emit(false);
  }

  onConfirm() {
    this.confirmed.emit(true);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(): void {
    this.confirmed.emit(false);
  }
}
