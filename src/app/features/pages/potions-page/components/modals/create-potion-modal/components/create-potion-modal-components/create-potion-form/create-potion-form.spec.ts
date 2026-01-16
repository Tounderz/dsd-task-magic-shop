import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePotionForm } from './create-potion-form';

describe('CreatePotionForm', () => {
  let component: CreatePotionForm;
  let fixture: ComponentFixture<CreatePotionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePotionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePotionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
