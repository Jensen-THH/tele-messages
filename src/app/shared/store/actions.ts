import { createAction, props } from "@ngrx/store";

export const loadMessages = createAction(
    '[nameSpace] Load Messages',
    props<{params: any}>()
);

export const loadMessagesSuccess = createAction(
    '[nameSpace] Load Messages Success',
    props<{data: any[]}>()
);

export const loadMessagesFailure = createAction(
    '[nameSpace] Load Messages Failure',
    props<{error: string}>()
);
