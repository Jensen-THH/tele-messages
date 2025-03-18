import { SimpleMessagesListComponent } from './components/simple-messages-list/simple-messages-list.component';
import { Router, Routes } from "@angular/router";

const routeConfig: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./components/message-list/message-list.component').then(m => m.MessageListComponent) },
    { path: 'messages-db', loadComponent: () => import('./components/messages-db/messages-db.component').then(m => m.MessagesDbComponent) },
    { path: 'messages', loadComponent: () => import('./components/simple-messages-list/simple-messages-list.component').then(m => m.SimpleMessagesListComponent) }
];

export default routeConfig;