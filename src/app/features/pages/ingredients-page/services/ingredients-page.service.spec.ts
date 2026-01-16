import { TestBed } from '@angular/core/testing';

import { IngredientsPageService } from './ingredients-page.service';

describe('IngredientsPageService', () => {
  let service: IngredientsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
