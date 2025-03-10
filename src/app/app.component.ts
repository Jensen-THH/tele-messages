import { Component } from '@angular/core';
import { MessageListComponent } from './components/message-list/message-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MessageListComponent, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading$;
  }
  isLoading$!: Observable<boolean>; // Subscribe trạng thái loading
  title = 'cyberpunk-messages';
}
