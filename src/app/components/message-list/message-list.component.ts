import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service'; // Thêm import
import { LoadingComponent } from '../loading/loading.component'; // Thêm import
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, LoadingComponent], // Thêm LoadingComponent
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class MessageListComponent {
  messages: any[] = [];
  searchParams = {
    chat_id: 'nghienplusofficial',
    offset_date: '',
    end_date: '',
    keyword: '',
    limit: 10,
    img_flag: false,
    topic_id: null as number | null,
    fetch_username: false,
    from_user: ''
  };
  selectedMessage: any = null;
  isLoading$!: Observable<boolean>; // Subscribe trạng thái loading

  constructor(
    private apiService: ApiService,
    private loadingService: LoadingService // Inject LoadingService
  ) {
    this.isLoading$ = this.loadingService.isLoading$;
  }

  searchMessages(): void {
    this.loadingService.show(); // Bật loading
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

    this.apiService.getMessages(params).subscribe({
      next: (response) => {
        this.messages = response.data || [];
        this.loadingService.hide(); // Tắt loading khi xong
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
        this.loadingService.hide(); // Tắt loading khi lỗi
      }
    });
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