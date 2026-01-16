import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {CreatePotionForm} from './create-potion-form';

describe('CreatePotionForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreatePotionForm],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('должен компилироваться', () => {
    expect(() => {
      const fixture = TestBed.createComponent(CreatePotionForm);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    }).not.toThrow();
  });

  it('должен иметь ожидаемые методы', () => {
    const fixture = TestBed.createComponent(CreatePotionForm);
    const component = fixture.componentInstance;

    expect(typeof component.inputValueChange).toBe('function');
  });

  it('должен иметь публичные свойства', () => {
    const fixture = TestBed.createComponent(CreatePotionForm);
    const component = fixture.componentInstance;

    expect(component.defaultCreatePotionFields).toBeDefined();
    expect(component.ingredients).toBeDefined();
    expect(component.fieldChanged).toBeDefined();
  });

  it('должен иметь входные сигналы', () => {
    const fixture = TestBed.createComponent(CreatePotionForm);
    const component = fixture.componentInstance;

    expect(typeof component.potionForm).toBe('function');
    expect(typeof component.potionFormFields).toBe('function');
  });
});
