import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterQuery, MessageDetail, ViewModel } from '../../shared/interfaces/interfaces';
import { PaginationService } from '../../services/pagination.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-messages-db',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages-db.component.html',
  styleUrls: ['./messages-db.component.scss']
})
export class MessagesDbComponent implements OnInit {
  vm$!: Observable<ViewModel>;
  filterQuery: FilterQuery = {};
  sortBy: string = '';

  constructor(public paginationService: PaginationService) { }

  ngOnInit() {
    this.vm$ = combineLatest([
      this.paginationService.currentPage$,
      this.paginationService.currentSize$,
      this.paginationService.totalCount$,
      this.paginationService.filterQuery$,
      this.paginationService.sortBy$
    ] as const).pipe(
      map(([currentPage, currentSize, totalCount, filterQuery, sortBy]) => ({
        currentPage,
        currentSize,
        totalCount,
        filterQuery,
        sortBy,
      }))
    );

    this.paginationService.updatePage(0);
    this.paginationService.updateSize(5);
    this.updateFilters();
  }

  onPageChanged(newPage: number) {
    this.paginationService.updatePage(newPage);
  }

  onSizeChanged(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = +selectElement.value;
    this.paginationService.updateSize(newSize);
  }

  onDelete(messageId: string) {
    console.log(`Delete message with ID: ${messageId}`);
  }

  updateFilters() {
    const cloneFilter: FilterQuery = { ...this.filterQuery };
    if (typeof this.filterQuery.text === 'string' && this.filterQuery.text.trim() !== '') {
      cloneFilter.text = { $regex: this.filterQuery.text.trim(), $options: "i" };
    } else {
      delete cloneFilter.text;
    }

    this.paginationService.updateFilterQuery(cloneFilter);
    this.paginationService.updateSortBy(this.sortBy || null);
  }
}