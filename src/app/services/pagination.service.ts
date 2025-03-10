import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { ApiResponse, FilterQuery, MessageDetail, MessagePayload } from '../shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private apiUrl = 'http://localhost:8000/api/get_messages_db/';

  private pageSubject = new BehaviorSubject<number>(0);
  private sizeSubject = new BehaviorSubject<number>(10);
  private totalCountSubject = new BehaviorSubject<number>(0);

  currentPage$: Observable<number> = this.pageSubject.asObservable().pipe(distinctUntilChanged());
  currentSize$: Observable<number> = this.sizeSubject.asObservable().pipe(distinctUntilChanged());
  totalCount$: Observable<number> = this.totalCountSubject.asObservable().pipe(distinctUntilChanged());
  currentOffset$: Observable<number> = combineLatest([this.currentPage$, this.currentSize$] as const).pipe(
    map(([page, size]) => page * size),
    distinctUntilChanged()
  );

  messages$: Observable<ApiResponse> = combineLatest([this.currentPage$, this.currentSize$] as const).pipe(
    switchMap(([page, perPage]) =>
      this.fetchMessages({
        page: page + 1,
        perPage,
        sort_by: null,
        filter_query: { chat_id: 'nghienplusofficial' }
      })
    ),
    map(response => {
      if (response.status === 'success') {
        this.totalCountSubject.next(response.total || 0);
      }
      return response;
    }),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  private fetchMessages(payload: MessagePayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, {
      filter_query: payload.filter_query || null,
      sort_by: payload.sort_by || null,
      limit: payload.limit || null,
      page: payload.page ?? 0,
      perPage: payload.perPage ?? 10
    });
  }

  updatePage(newPage: number) {
    if (newPage >= 0 && newPage !== this.pageSubject.value) {
      this.pageSubject.next(newPage);
    }
  }

  updateSize(newSize: number) {
    if (newSize > 0 && newSize !== this.sizeSubject.value) {
      this.sizeSubject.next(newSize);
      this.pageSubject.next(0);
    }
  }
}