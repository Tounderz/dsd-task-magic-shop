import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPotionModal } from './order-potion-modal';

describe('OrderPotionModal', () => {
  let component: OrderPotionModal;
  let fixture: ComponentFixture<OrderPotionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPotionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPotionModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
