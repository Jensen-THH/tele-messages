import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap, distinctUntilChanged, catchError, shareReplay, debounceTime } from 'rxjs/operators';
import { ApiResponse, FilterQuery, MessagePayload } from '../shared/interfaces/interfaces';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private apiUrl = 'http://localhost:8000/api/messages_db/';

  private pageSubject = new BehaviorSubject<number>(0);
  private sizeSubject = new BehaviorSubject<number>(10);
  private totalCountSubject = new BehaviorSubject<number>(0);
  private filterQuerySubject = new BehaviorSubject<FilterQuery>({});
  private sortBySubject = new BehaviorSubject<string | null>(null);
  private limitSubject = new BehaviorSubject<number | null>(null);

  currentPage$: Observable<number> = this.pageSubject.asObservable().pipe(distinctUntilChanged());
  currentSize$: Observable<number> = this.sizeSubject.asObservable().pipe(distinctUntilChanged());
  totalCount$: Observable<number> = this.totalCountSubject.asObservable().pipe(distinctUntilChanged());
  filterQuery$: Observable<FilterQuery> = this.filterQuerySubject.asObservable().pipe(
    debounceTime(500),
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
  );
  sortBy$: Observable<string | null> = this.sortBySubject.asObservable().pipe(
    distinctUntilChanged() //chỉ phát khi giá trị thực sự thay đổi
  );
  limit$: Observable<number | null> = this.limitSubject.asObservable().pipe(distinctUntilChanged());

  messages$: Observable<ApiResponse> = combineLatest([
    this.currentPage$,
    this.currentSize$,
    this.filterQuery$,
    this.sortBy$,
    this.limit$
  ] as const).pipe(
    debounceTime(100),
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),  // So sánh payload
    switchMap(([page, perPage, filterQuery, sortBy, limit]) => {
      const payload: MessagePayload = {
        page,
        perPage,
        filterQuery,
        sort_by: sortBy,
        limit
      };
      console.log('Fetching with payload:', payload);
      return this.fetchMessages(payload);
    }),
    map(response => {
      if (response.status === 'success' && typeof response.total === 'number') {
        this.totalCountSubject.next(response.total);
      } else {
        this.totalCountSubject.next(0);
      }
      return response;
    }),
    catchError(error => {
      return of({ status: 'error', data: [], total: 0 } as ApiResponse);
    }),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  private fetchMessages(payload: MessagePayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, payload);
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
}