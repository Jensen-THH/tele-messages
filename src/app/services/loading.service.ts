import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();
  activaRequest = 0;
  show() {
    this.activaRequest++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.activaRequest--;
    if (this.activaRequest <= 0) {
      this.activaRequest = 0;
      this.loadingSubject.next(false);
    }
  }
}