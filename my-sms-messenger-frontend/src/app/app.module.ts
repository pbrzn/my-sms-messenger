import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageService } from './message.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';
import { ScrollerModule } from 'primeng/scroller';
import { SessionService } from './session.service';
import { MessageCommunicationService } from './message-communication.service';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    HttpClientModule,
    DataViewModule,
    ScrollerModule,
    ButtonModule
  ],
  providers: [MessageService, SessionService, MessageCommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
