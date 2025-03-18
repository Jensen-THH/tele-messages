import { Component, inject } from '@angular/core';
import { SimpleMessagesListPaginationService } from '../../services/simple-messages-list-pagination.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-messages-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './simple-messages-list.component.html',
  styleUrl: './simple-messages-list.component.scss'
})
export class SimpleMessagesListComponent {
  simplePaginationService = inject(SimpleMessagesListPaginationService);
  data: any = [];
}
