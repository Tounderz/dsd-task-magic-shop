import { TestBed } from '@angular/core/testing';

import { PotionIngredientsColumnState } from './potion-ingredients-column-state';

describe('PotionIngredientsColumnState', () => {
  let service: PotionIngredientsColumnState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotionIngredientsColumnState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
