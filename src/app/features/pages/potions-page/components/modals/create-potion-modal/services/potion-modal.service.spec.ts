import { TestBed } from '@angular/core/testing';
import { PotionModalService } from './potion-modal.service';
import { FormGroup, FormControl } from '@angular/forms';

describe('PotionModalService', () => {
  let service: PotionModalService;

  beforeEach(() => {
    const mockPotionTableState = {
      potionTableState: () => ({ content: [] })
    };

    const mockPotionIngredientsColumnState = {
      setPotionTableState: () => {},
      getPotionTotalPrice: () => 150
    };

    TestBed.configureTestingModule({
      providers: [
        PotionModalService,
        { provide: 'PotionTableState', useValue: mockPotionTableState },
        { provide: 'PotionIngredientsColumnState', useValue: mockPotionIngredientsColumnState }
      ]
    });

    service = TestBed.inject(PotionModalService);
  });

  describe('Базовые проверки', () => {
    it('должен создавать сервис', () => {
      expect(service).toBeTruthy();
    });

    it('должен иметь публичные методы', () => {
      expect(typeof service.initForm).toBe('function');
      expect(typeof service.transformTableData).toBe('function');
    });
  });

  describe('Метод initForm', () => {
    it('должен возвращать FormGroup', () => {
      const form = service.initForm();
      expect(form instanceof FormGroup).toBe(true);
    });

    it('должен создавать форму с контролами', () => {
      const form = service.initForm();
      expect(Object.keys(form.controls).length).toBeGreaterThan(0);
    });
  });

  describe('Метод transformTableData', () => {
    it('должен возвращать объект с id', () => {
      const mockForm = new FormGroup({
        name: new FormControl('Тестовое зелье')
      });

      const result = service.transformTableData(mockForm);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('number');
    });

    it('должен устанавливать значения из формы', () => {
      const mockForm = new FormGroup({
        name: new FormControl('Зелье здоровья'),
        description: new FormControl('Лечебное зелье')
      });

      const result = service.transformTableData(mockForm);

      expect(result['name']).toBe('Зелье здоровья');
      expect(result['description']).toBe('Лечебное зелье');
    });
  });
});
