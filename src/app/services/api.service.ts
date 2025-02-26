import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/get_messages/';

  constructor(private http: HttpClient) { }

  getMessages(params: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }
}