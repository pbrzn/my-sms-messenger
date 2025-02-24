import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageCommunicationService {
  private messageSubmittedSource = new Subject<void>();

  messageSubmitted$ = this.messageSubmittedSource.asObservable();

  notifyMessageSubmitted() {
    this.messageSubmittedSource.next();
  }
}
