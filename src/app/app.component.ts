import { NotificationComponent } from './shared/components/notification/notification.component';
import { Component } from '@angular/core';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [LoadingComponent, CommonModule, RouterOutlet, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private loadingService: LoadingService,
  ) {
    this.isLoading$ = this.loadingService.isLoading$;
  }
  isLoading$!: Observable<boolean>; // Subscribe trạng thái loading
  title = 'cyberpunk-messages';
}
