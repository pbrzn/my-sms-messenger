import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Message } from './models/Message';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient, private sessionService: SessionService) { }

  sendMessage(message: Message): Observable<any> {
    console.log('Message in queue:', message.body, message.from);
    return of(this.http.post('http://localhost:3000/messages', message, this.sessionService.getHttpOptions()).subscribe(data => {
      console.log('Message send:', data);
    }, error => {
      console.log('Error sending message:', error);
    }));
  }

  getAllMessages(sessionId: string): Observable<Message[]> {
    return this.http.post<Message[]>('http://localhost:3000/messages/all', { message: { session_id : sessionId } }, this.sessionService.getHttpOptions());
  }
}