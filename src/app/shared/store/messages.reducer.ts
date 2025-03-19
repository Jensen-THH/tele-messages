import { MessageDetail } from './../interfaces/interfaces';
import { createReducer, on } from '@ngrx/store';
import * as Messages from './actions';

export interface MessagesState {
    data: MessageDetail[],
    error: string | null;
    loading: boolean
};

const initialState: MessagesState = {
    data: [],
    error: null,
    loading: false
};

export const messagesReducer = createReducer(
    initialState,
    on(Messages.loadMessages, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(Messages.loadMessagesSuccess, (state, { messages }) => {
        return { ...state, data: messages, loading: false, error: null };
    }),
    on(Messages.loadMessagesFailure, (state, { error }) => {
        return { ...state, data: [], loading: false, error };
    })
);
