import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { PotionsPage } from './potions-page';
import { tableHeaderData } from './configs/potions-page-config';

describe('PotionsPage Component - с сервисами', () => {
  let component: PotionsPage;
  let fixture: ComponentFixture<PotionsPage>;

  beforeEach(async () => {
    const mockDialogService = {
      open: () => ({
        onClose: of(null),
        close: () => {},
        destroy: () => {}
      })
    };

    const mockToasterState = {
      showToast: () => {}
    };

    const mockPotionTableState = {
      getPotionById: () => null,
      removePotion: () => {}
    };

    const mockOrderTableState = {
      getOrderByPotionName: () => []
    };

    const mockPotionIngredientsColumnState = {
      removePotionIngredients: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [PotionsPage],
      providers: [
        { provide: DialogService, useValue: mockDialogService },
        { provide: 'ToasterState', useValue: mockToasterState },
        { provide: 'PotionTableState', useValue: mockPotionTableState },
        { provide: 'OrderTableState', useValue: mockOrderTableState },
        { provide: 'PotionIngredientsColumnState', useValue: mockPotionIngredientsColumnState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PotionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен иметь данные заголовков таблицы', () => {
    expect(component.tableHeaderData).toBe(tableHeaderData);
  });

  it('метод handleOpenPotionModal должен существовать', () => {
    expect(typeof component.handleOpenPotionModal).toBe('function');
  });

  it('метод handleDelete должен существовать', () => {
    expect(typeof component.handleDelete).toBe('function');
  });

  it('метод handleModalOpen должен существовать', () => {
    expect(typeof component.handleModalOpen).toBe('function');
  });
});
