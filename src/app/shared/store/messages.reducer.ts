import { MessageDetail } from './../interfaces/interfaces';
import { createReducer, on } from '@ngrx/store';
import * as Messages from './actions';

export interface MessagesState {
    data: MessageDetail[],
    error: any,
    loading: boolean
};

const initialState: MessagesState = {
    data: [],
    error: null,
    loading: false
};

export const messagesReducer = createReducer(
    initialState,
    on(
        Messages.loadMessages,
        (state) => ({ ...state, loading: true, error: null }),
    ),
    on(
        Messages.loadMessagesSuccess,
        (state, { data }) => ({ ...state, data: data, loading: false, error: null })
    ),
    on(
        Messages.loadMessagesFailure,
        (state, { error }) => ({ ...state, data: [], loading: false, error: error })
    )
);
