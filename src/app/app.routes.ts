import { Router, Routes } from "@angular/router";

const routeConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./components/message-list/message-list.component').then(m => m.MessageListComponent) },
    { path: 'messages-db', loadComponent: () => import('./components/messages-db/messages-db.component').then(m => m.MessagesDbComponent) }
];

export default routeConfig;