import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePotionModal } from './create-potion-modal';

describe('CreatePotionModal', () => {
  let component: CreatePotionModal;
  let fixture: ComponentFixture<CreatePotionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePotionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePotionModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
