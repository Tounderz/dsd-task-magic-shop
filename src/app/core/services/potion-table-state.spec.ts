import { TestBed } from '@angular/core/testing';

import { PotionTableState } from './potion-table-state';

describe('PotionTableState', () => {
  let service: PotionTableState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotionTableState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
