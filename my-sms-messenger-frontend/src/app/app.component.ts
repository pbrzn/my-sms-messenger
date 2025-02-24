import { Component, OnInit, Output } from '@angular/core';
import { MessageService } from './message.service';
import { SessionService } from './session.service';
import { Message } from './models/Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-sms-messenger-frontend';
  session!: any;
  messages: Message[] = [];
  messageCount: number = 0;

  constructor(private messageService: MessageService, private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.createSession().subscribe(data => {
      this.session = data;
      this.messageService.getAllMessages(this.session.session_id).subscribe(data => {
        if (data) {
          this.messages = data;
          this.messageCount = data.length;
        }
      });
    });
  }
}
