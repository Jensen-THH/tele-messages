import { CommonModule } from '@angular/common';
import { ConfirmDialogData } from './../../interfaces/interfaces'
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';

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

  @ViewChild('confirmButton') confirmButton!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit() {
    this.confirmButton.nativeElement.focus();
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent) {
    if (this.confirmButton.nativeElement === document.activeElement || document.activeElement === document.body) {
      this.onConfirm();
    }
  }
}
