import { TestBed } from '@angular/core/testing';

import { PotionModalService } from './potion-modal.service';

describe('PotionModalService', () => {
  let service: PotionModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotionModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
