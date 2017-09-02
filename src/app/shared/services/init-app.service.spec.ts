import { TestBed, inject } from '@angular/core/testing';

import { InitAppService } from './init-app.service';

describe('InitAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitAppService]
    });
  });

  it('should be created', inject([InitAppService], (service: InitAppService) => {
    expect(service).toBeTruthy();
  }));
});
