import { TestBed } from '@angular/core/testing';

import { ToasterState } from './toaster-state';

describe('ToasterState', () => {
  let service: ToasterState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
