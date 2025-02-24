import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { Message } from '../models/Message';
import { switchMap } from 'rxjs';
import { MessageCommunicationService } from '../message-communication.service';

@Component({
  selector: 'app-message-form',
  standalone: false,
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})

export class MessageFormComponent implements OnInit, OnChanges {
  message!: Message;
  messageForm!: FormGroup;
  charCount: number = 0;
  @Input() session: any;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private messageCommunicationService: MessageCommunicationService
  ) { }

  ngOnInit() {

    this.messageForm = this.formBuilder.group({
      body: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      from: new FormControl('', [Validators.required, Validators.pattern(/^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/)]),
      session_id: new FormControl(this.session)
    });
    
    this.messageForm.get('body')?.valueChanges.subscribe(value => {
      this.charCount = value.length || 0;
    });

    this.charCount = this.messageForm.get('body')?.value.length || 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['session'] && this.session && this.session.session_id) {
      this.messageForm.get('session_id')?.setValue(this.session.session_id);
    }
  }

  onSubmit() {
    if (this.messageForm.valid) {
      this.message = this.messageForm.value;
      console.log(this.message);
      this.messageService.sendMessage(this.message).pipe(
        switchMap(() => {
          this.messageCommunicationService.notifyMessageSubmitted();
          return this.messageCommunicationService.messageSubmitted$;
        })
      ).subscribe(() => {
        this.clearForm();
      });
    } else {
      if (this.messageForm.hasError('body')) {
        alert('Message body is required and must be 250 characters or less');
      } else if (this.messageForm.hasError('from')) {
        alert('Phone number is required and must be 10 digits');
      }
    }

    if (this.message.body && this.message.from) {
      console.log('Message:', this.message.body, this.message.from);
      this.clearForm();
    }
  }

  getCharCount() {
    return this.charCount;
  }

  clearForm() {
    this.messageForm.reset();
    this.messageForm.get('session_id')?.setValue(this.session)
    this.charCount = 0;
  }
}