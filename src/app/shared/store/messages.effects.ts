import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Messages from './actions';
import { catchError, map, mergeMap, Observer, of, skipWhile } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from '../components/base/base.component';

@Injectable({
    providedIn: 'root'
})
export class MessagesTeleEffects extends BaseComponent {
    private apiService = inject(ApiService);
    private actions$ = inject(Actions);
    constructor() { super(); }
    loadMessages$ = createEffect(() => {
        return this.actions$.pipe(ofType(Messages.loadMessages),
        mergeMap((params) => {
                return this.apiService.getMessages(params).pipe(
                    takeUntilDestroyed(this.destroyRef),
                    map(res => Messages.loadMessagesSuccess(res)),
                    catchError((error) => of(Messages.loadMessagesFailure({ error: error.message })))
                )
            }
            )
        )
    }
    )
}