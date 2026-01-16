import { TestBed } from '@angular/core/testing';

import { OrderTableState } from './order-table-state';

describe('OrderTableState', () => {
  let service: OrderTableState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderTableState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
