import { Routes } from '@angular/router';

const routeConfig: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
        import('./components/home/home.component').then(
          (m) => m.HomeComponent
        ),
  },
  {
    path: 'messages',
    loadComponent: () =>
        import('./components/message-list/message-list.component').then(
          (m) => m.MessageListComponent
        ),
  },
  {
    path: 'send_messages',
    loadComponent: () =>
        import('./components/send-message/send-message.component').then(
          (m) => m.SendMessageComponent
        ),
  },
  {
    path: 'channels',
    loadComponent: () =>
        import('./components/channels/channels.component').then(
          (m) => m.ChannelsComponent
        ),
  },
  {
    path: 'messages-db',
    loadComponent: () =>
      import('./components/messages-db/messages-db.component').then(
        (m) => m.MessagesDbComponent
      ),
  },
  { path: '**', redirectTo: '/home' }, // Optional wildcard route
];

export default routeConfig;