import { MessagesState } from './../../shared/store/messages.reducer';
import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BaseComponent } from '../../shared/components/base/base.component';
import { MessageDetail, SearchParams } from '../../shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import * as Messages from '../../shared/store/actions'
import { SimpleMessagesListComponent } from '../simple-messages-list/simple-messages-list.component';
@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SimpleMessagesListComponent],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class MessageListComponent extends BaseComponent {
  messages: MessageDetail[] = [];
  private store = inject(Store<{ messages: MessagesState }>);
  messages$ = this.store.select(state => state.messages.data);
  // loading$: Observable<boolean>; 
  // error$: Observable<string | null>;
  searchParams: SearchParams = {
    chat_id: 'nghienplusofficial',
    offset_date: '',
    end_date: '',
    keyword: '',
    limit: 10,
    img_flag: false,
    topic_id: null,
    fetch_username: false,
    from_user: '',
  };
  selectedMessage: any = null;

  activeTab: string = 'messages';

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  constructor() {
    super();
    this.searchMessages();
  }

  getParam = () => {
    const params: any = {
      chat_id: this.searchParams.chat_id,
      limit: this.searchParams.limit.toString(),
      img_flag: this.searchParams.img_flag.toString(),
      fetch_username: this.searchParams.fetch_username.toString()
    };
    if (this.searchParams.offset_date) params.offset_date = new Date(this.searchParams.offset_date).toISOString();
    if (this.searchParams.end_date) params.end_date = new Date(this.searchParams.end_date).toISOString();
    if (this.searchParams.keyword) params.keyword = this.searchParams.keyword;
    if (this.searchParams.topic_id) params.topic_id = this.searchParams.topic_id.toString();
    if (this.searchParams.from_user) params.from_user = this.searchParams.from_user;
    return params
  }

  searchMessages(): void {
    // this.apiService.getMessages(this.getParam()).pipe(
    //   takeUntilDestroyed(this.destroyRef)
    // ).subscribe({
    //   next: (response) => {
    //     this.messages = response.data || [];
    //   },
    //   error: (error) => {
    //     console.error('Error fetching messages:', error);
    //   }
    // });
    this.store.dispatch(Messages.loadMessages(this.getParam()))
  }

  showDetails(message: any): void {
    this.selectedMessage = message;
  }

  closePopup(): void {
    this.selectedMessage = null;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(): void {
    this.closePopup();
  }
}