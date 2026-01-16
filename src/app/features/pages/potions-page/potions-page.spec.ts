import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotionsPage } from './potions-page';

describe('PotionsPage', () => {
  let component: PotionsPage;
  let fixture: ComponentFixture<PotionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotionsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotionsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
