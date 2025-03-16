import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap, distinctUntilChanged, catchError, shareReplay, debounceTime } from 'rxjs/operators';
import { ApiResponse, FilterQuery, MessagePayload } from '../shared/interfaces/interfaces';
import { of } from 'rxjs';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private apiUrl = 'http://localhost:8000/api/messages_db/';

  public pageSubject = new BehaviorSubject<number>(0);
  private sizeSubject = new BehaviorSubject<number>(10);
  private totalCountSubject = new BehaviorSubject<number>(0);
  private filterQuerySubject = new BehaviorSubject<FilterQuery>({});
  private sortBySubject = new BehaviorSubject<string | null>(null);
  private limitSubject = new BehaviorSubject<number | null>(null);
  private messagesSubject = new BehaviorSubject<ApiResponse>({ status: 'success', data: [], total: 0 });

  currentPage$: Observable<number> = this.pageSubject.asObservable().pipe(distinctUntilChanged());
  currentSize$: Observable<number> = this.sizeSubject.asObservable().pipe(distinctUntilChanged());
  totalCount$: Observable<number> = this.totalCountSubject.asObservable().pipe(distinctUntilChanged());
  filterQuery$: Observable<FilterQuery> = this.filterQuerySubject.asObservable().pipe(
    debounceTime(500),
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
  );
  sortBy$: Observable<string | null> = this.sortBySubject.asObservable().pipe(distinctUntilChanged());
  limit$: Observable<number | null> = this.limitSubject.asObservable().pipe(distinctUntilChanged());
  messages$: Observable<ApiResponse> = this.messagesSubject.asObservable();
  notificationService = inject(NotificationService);
  constructor(private http: HttpClient) {
    this.fetchDataOnParamsChange();
  }

  private fetchDataOnParamsChange() {
    combineLatest([
      this.currentPage$,
      this.currentSize$,
      this.filterQuery$,
      this.sortBy$,
      this.limit$
    ] as const).pipe(
      debounceTime(100),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      switchMap(([page, perPage, filterQuery, sortBy, limit]) => {
        return this.fetchMessages({ page, perPage, filterQuery, sort_by: sortBy, limit });
      }),
      catchError(error => {
        return of({ status: 'error', data: [], total: 0 } as ApiResponse);
      })
    ).subscribe(response => {
      if (response.status === 'success' && typeof response.total === 'number') {
        this.totalCountSubject.next(response.total);
        this.messagesSubject.next(response);
      } else {
        this.totalCountSubject.next(0);
        this.messagesSubject.next({ status: 'success', data: [], total: 0 });
      }
    });
  }

  private fetchMessages(payload: MessagePayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, payload);
  }

  private forceRefresh() {
    const payload: MessagePayload = {
      page: this.pageSubject.value,
      perPage: this.sizeSubject.value,
      filterQuery: this.filterQuerySubject.value,
      sort_by: this.sortBySubject.value,
      limit: this.limitSubject.value
    };
    this.fetchMessages(payload).subscribe(response => {
      if (response.status === 'success' && typeof response.total === 'number') {
        this.totalCountSubject.next(response.total);
        this.messagesSubject.next(response);
      } else {
        this.totalCountSubject.next(0);
        this.messagesSubject.next({ status: 'success', data: [], total: 0 });
      }
    });
  }

  updatePage(newPage: number) {
    if (newPage >= 0) {
      this.pageSubject.next(newPage);
    }
  }

  updateSize(newSize: number) {
    if (newSize > 0 && newSize !== this.sizeSubject.value) {
      this.sizeSubject.next(newSize);
      this.pageSubject.next(0);
    }
  }

  updateFilterQuery(filterQuery: FilterQuery) {
    this.filterQuerySubject.next({ ...filterQuery });
  }

  updateSortBy(sortBy: string | null) {
    if (sortBy !== this.sortBySubject.value) {
      this.sortBySubject.next(sortBy);
    }
  }

  updateLimit(limit: number | null) {
    if (limit !== this.limitSubject.value) {
      this.limitSubject.next(limit);
    }
  }

  removeMessage(messageId: string) {
    const currentMessages = this.messagesSubject.value;
    if (currentMessages.status === 'success' && Array.isArray(currentMessages.data)) {
      const updatedData = currentMessages.data.filter((msg: any) => msg._id !== messageId);
      if (updatedData.length !== currentMessages.data.length) {
        const newTotal = typeof currentMessages.total === 'number' ? currentMessages.total - 1 : 0;

        if (updatedData.length === 0) {
          this.forceRefresh();
        } else {
          const updatedMessages = {
            ...currentMessages,
            data: updatedData,
            total: newTotal
          };
          this.messagesSubject.next(updatedMessages);
        }
      } else {
        this.notificationService.addNotificaton('warning',`No message found with _id: ${messageId}`, 3000)
      }
    }
  }
}