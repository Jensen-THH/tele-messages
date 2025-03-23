import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FilePreviewDirective } from '../../shared/directives/filepreview.directive';
import { Router, NavigationExtras } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from '../../shared/components/base/base.component';
import { NotificationService } from '../../services/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [CommonModule, FormsModule, FilePreviewDirective],
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent extends BaseComponent {
  recipient = signal<string>('');
  text = signal<string>('');
  files = signal<File[]>([]);
  channel: any;
  isFormValid = computed(() => {
    return this.recipient().trim() !== '' && this.text().trim() !== '';
  });
  channels$ : any[] = [];
  notificatinon = inject(NotificationService)

  constructor(private apiService: ApiService, private router: Router) {
    super();
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.channel = navigation.extras.state['item'];
      this.recipient.set(this.channel?.username);
    }
  }

  updateRecipient(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.recipient.set(select.value);
  }

  updateText(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.text.set(textarea.value);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files.set(Array.from(input.files));
    }
  }

  onSubmit() {
    this.apiService.sendMessage(this.recipient(), this.text(), this.files()).subscribe(
      (response) => {
        this.notificatinon.addNotificaton(response.status, response.message, 3000)
      },
      (error) => {
        this.notificatinon.addNotificaton(error.status, error.message, 3000)
      }
    );
  }
  getFilePreview(file: File): string {
    return URL.createObjectURL(file);
  }
  onTemplateChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.text.set(select.value);
  }
}