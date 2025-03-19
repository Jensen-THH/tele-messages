import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MessagesState } from '../../shared/store/messages.reducer';
import { MessageDetail } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-simple-messages-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simple-messages-list.component.html',
  styleUrls: ['./simple-messages-list.component.scss'],
})
export class SimpleMessagesListComponent {
  private store = inject(Store<{ messages: MessagesState }>);
  messages$ = this.store.select(state => state.messages.data);

  constructor() {
  }
}