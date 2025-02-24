import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Message } from '../models/Message';
import { MessageService } from '../message.service';
import { SessionService } from '../session.service';
import { Observable, of } from 'rxjs';
import { MessageCommunicationService } from '../message-communication.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() sessionId: any;
  @Input() messages!: Message[];
  
  constructor(
    private messageService: MessageService,
    private messageCommunicationService: MessageCommunicationService
  ) { }

  ngOnInit() {
    this.messageCommunicationService.messageSubmitted$.subscribe(() => {
      setTimeout(()=> this.fetchMessages(), 200);
    });

    this.fetchMessages();
  }

  fetchMessages() {
    if (this.sessionId) {
      this.messageService.getAllMessages(this.sessionId).subscribe((messages: Message[]) => {
        this.messages = messages;
        this.messages.forEach(message => {
          console.log('Message:', message.body, message.from);
        });
      });
    }
  }
}
