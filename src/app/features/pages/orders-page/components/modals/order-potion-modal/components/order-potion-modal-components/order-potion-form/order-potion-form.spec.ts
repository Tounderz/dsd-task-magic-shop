import { TestBed } from '@angular/core/testing';
import { OrderPotionForm } from './order-potion-form';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrderPotionForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPotionForm],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('должен компилироваться', () => {
    expect(() => {
      const fixture = TestBed.createComponent(OrderPotionForm);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    }).not.toThrow();
  });

  it('должен иметь ожидаемые методы', () => {
    const fixture = TestBed.createComponent(OrderPotionForm);
    const component = fixture.componentInstance;

    expect(typeof component.getOptions).toBe('function');
    expect(typeof component.inputValueChange).toBe('function');
    expect(typeof component.selectValueChange).toBe('function');
  });
});
