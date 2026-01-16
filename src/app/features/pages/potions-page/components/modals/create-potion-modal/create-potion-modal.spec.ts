import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CreatePotionModal } from './create-potion-modal';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PotionTableState } from '../../../../../../core/services/potion-table-state';
import { PotionModalService } from './services/potion-modal.service';
import { ToasterState } from '../../../../../../core/services/toaster-state';

describe('CreatePotionModal - с правильными провайдерами', () => {
  let component: CreatePotionModal;
  let fixture: ComponentFixture<CreatePotionModal>;

  beforeEach(() => {
    const mockDialogRef = {} as DynamicDialogRef;
    const mockPotionTableState = {} as PotionTableState;
    const mockPotionModalService = {} as PotionModalService;
    const mockToasterState = {} as ToasterState;

    TestBed.configureTestingModule({
      imports: [CreatePotionModal],
      providers: [
        { provide: DynamicDialogRef, useValue: mockDialogRef },
        { provide: PotionTableState, useValue: mockPotionTableState },
        { provide: PotionModalService, useValue: mockPotionModalService },
        { provide: ToasterState, useValue: mockToasterState }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(CreatePotionModal);
    component = fixture.componentInstance;
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен инициализировать форму', () => {
    expect(component.potionForm).toBeDefined();
  });
});
