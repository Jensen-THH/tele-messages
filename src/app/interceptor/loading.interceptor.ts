import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const notifitionService = inject(NotificationService)
  loadingService.show();
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        loadingService.hide();
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Error: ${error.error.message}`;
      } else {
        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
      }
      return throwError(errorMsg);
    }),
    finalize(() => {
      loadingService.hide()
    })
  );
};
