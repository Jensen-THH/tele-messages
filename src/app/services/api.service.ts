import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getMessages(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}get_messages/`, { params });
  }

  deleteMessage(messageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete_messages/${messageId}`);
  }

  deleteMessages(messageIds: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}delete_messages_by_ids/`, { message_ids: messageIds });
  }

  sendMessage(recipient: string, text: string, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('recipient', recipient);
    formData.append('text', text);
    if (files) {
      for (const file of files) {
        formData.append('files', file);
      }
    }
    return this.http.post(`${this.apiUrl}send_message/`, formData);
  }

  getChannels(): Observable<any> {
    return this.http.get(`${this.apiUrl}get_channels`);
  }
}