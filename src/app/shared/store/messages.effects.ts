import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as Messages from './actions';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Injectable()
export class MessagesTeleEffects {
    private apiService = inject(ApiService);
    private actions$ = inject(Actions);
    private notificationService = inject(NotificationService);

    loadMessages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(Messages.loadMessages),
            mergeMap((action) => {
                console.log('Dispatching with params:', action);
                return this.apiService.getMessages(action).pipe(
                    map((response) => {
                        this.notificationService.addNotificaton('success', 'Get data successfully', 3000);
                        return Messages.loadMessagesSuccess({ messages: response.data });
                    }),
                    catchError((error) => {
                        return of(Messages.loadMessagesFailure({ error: error.message }));
                    })
                );
            })
        )
    );
}