import { Component } from '@angular/core';
import { MessageListComponent } from '../message-list/message-list.component'; // Adjust path
import { SimpleMessagesListComponent } from '../simple-messages-list/simple-messages-list.component'; // Adjust path
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule], // Import child components
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
}