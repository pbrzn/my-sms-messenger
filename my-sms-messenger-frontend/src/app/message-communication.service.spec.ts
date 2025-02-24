import { TestBed } from '@angular/core/testing';

import { MessageCommunicationService } from './message-communication.service';

describe('MessageCommunicationService', () => {
  let service: MessageCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
