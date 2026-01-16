import { TestBed } from '@angular/core/testing';

import { OrderPotionModalService } from './order-potion-modal.service';

describe('OrderPotionModalService', () => {
  let service: OrderPotionModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPotionModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
