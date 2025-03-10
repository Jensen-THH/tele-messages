import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageDetail, ViewModel } from '../../shared/interfaces/interfaces';
import { PaginationService } from '../../services/pagination.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-messages-db',
  imports: [CommonModule],
  templateUrl: './messages-db.component.html',
  styleUrl: './messages-db.component.scss'
})
export class MessagesDbComponent {
  vm$!: Observable<ViewModel>;

  constructor(public paginationService: PaginationService) { }

  ngOnInit() {
    this.vm$ = combineLatest([
      this.paginationService.currentPage$,
      this.paginationService.currentSize$,
      this.paginationService.totalCount$,
      this.paginationService.currentOffset$
    ] as const).pipe(
      map(([currentPage, currentSize, totalCount, currentOffset]) => ({
        currentPage,
        currentSize,
        totalCount,
        currentOffset
      }))
    );
  }

  onPageChanged(newPage: number) {
    this.paginationService.updatePage(newPage);
  }

  onSizeChanged(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = +selectElement.value; // Chuyển sang number
    this.paginationService.updateSize(newSize);
  }

  onDelete(messageId: string) {
    // Logic xóa (gọi API hoặc cập nhật local data)
    console.log(`Delete message with ID: ${messageId}`);
    // Ví dụ: this.paginationService.deleteMessage(messageId).subscribe();
  }
}
