import { Component } from '@angular/core';
import { MessageListComponent } from './components/message-list/message-list.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ LoadingComponent, CommonModule, RouterOutlet],
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
