import { TestBed } from '@angular/core/testing';

import { IngredientTableState } from './ingredient-table-state';

describe('IngredientTableState', () => {
  let service: IngredientTableState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientTableState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
