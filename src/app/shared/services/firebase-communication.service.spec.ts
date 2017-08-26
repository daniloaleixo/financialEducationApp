import { TestBed, inject } from '@angular/core/testing';

import { FirebaseCommunicationService } from './firebase-communication.service';

describe('FirebaseCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseCommunicationService]
    });
  });

  it('should be created', inject([FirebaseCommunicationService], (service: FirebaseCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
