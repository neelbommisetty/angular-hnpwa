import { TestBed, inject } from '@angular/core/testing';

import { HnapiService } from './hnapi.service';

describe('HnapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HnapiService]
    });
  });

  it('should be created', inject([HnapiService], (service: HnapiService) => {
    expect(service).toBeTruthy();
  }));
});
