import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPotionForm } from './order-potion-form';

describe('OrderPotionForm', () => {
  let component: OrderPotionForm;
  let fixture: ComponentFixture<OrderPotionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPotionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPotionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
