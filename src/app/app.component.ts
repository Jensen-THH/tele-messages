import { Component } from '@angular/core';
import { MessageListComponent } from './components/message-list/message-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MessageListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cyberpunk-messages';
}
