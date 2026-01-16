import { TestBed } from '@angular/core/testing';
import { OrderPotionModalService } from './order-potion-modal.service';
import { UtilityService } from '../../../../../../../core/services/utility.service';
import { PotionTableState } from '../../../../../../../core/services/potion-table-state';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {GetErrorMessageParams} from '../../../../../../../core/types/error-message.types';
import {FormFieldItem} from '../../../../../../../core/types/form-field.types';

describe('OrderPotionModalService', () => {
  let service: OrderPotionModalService;

  beforeEach(() => {
    const utilityServiceMock = {
      formatDateIntl: (date: string) => {
        if (!date) return '';
        try {
          return new Date(date).toLocaleDateString('ru-RU');
        } catch {
          return date;
        }
      }
    };

    const potionTableStateMock = {
      potionOptions: () => [
        { name: '1', label: 'Зелье исцеления' },
        { name: '2', label: 'Зелье силы' }
      ]
    };

    TestBed.configureTestingModule({
      providers: [
        OrderPotionModalService,
        { provide: UtilityService, useValue: utilityServiceMock },
        { provide: PotionTableState, useValue: potionTableStateMock }
      ]
    });

    service = TestBed.inject(OrderPotionModalService);
  });

  it('должен создавать сервис', () => {
    expect(service).toBeTruthy();
  });

  describe('initForm', () => {
    it('должен создавать FormGroup с контролами', () => {
      const formFields: Array<FormFieldItem> = [
        { name: 'field1', label: 'Поле 1', type: 'input', validators: [Validators.required] },
        { name: 'field2', label: 'Поле 2', type: 'select' }
      ];

      const form = service.initForm(formFields);

      expect(form).toBeDefined();
      expect(form.get('field1')).toBeTruthy();
      expect(form.get('field2')).toBeTruthy();
      expect(form.get('field1')?.hasValidator(Validators.required)).toBe(true);
    });

    it('должен создавать форму без валидаторов', () => {
      const formFields: Array<FormFieldItem> = [
        { name: 'field1', label: 'Поле 1', type: 'input' }
      ];

      const form = service.initForm(formFields);

      expect(form.get('field1')?.validator).toBeNull();
    });
  });

  describe('transformTableData', () => {
    it('должен преобразовывать данные формы', () => {
      const mockForm = new FormGroup({
        id: new FormControl(1),
        potion: new FormControl('1'),
        name: new FormControl('Тест')
      });

      const result = service.transformTableData(mockForm);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
    });

    it('должен форматировать даты', () => {
      const mockForm = new FormGroup({
        orderDate: new FormControl('2024-01-15')
      });

      const utilityService = TestBed.inject(UtilityService);
      const originalFormat = utilityService.formatDateIntl;
      let formatCalled = false;
      utilityService.formatDateIntl = (date: string) => {
        formatCalled = true;
        return originalFormat.call(utilityService, date);
      };

      service.transformTableData(mockForm);

      expect(formatCalled).toBe(true);

      utilityService.formatDateIntl = originalFormat;
    });
  });

  describe('getErrorMessage', () => {
    it('должен возвращать сообщение для required ошибки', () => {
      const params: GetErrorMessageParams = {
        errors: { required: true },
        fieldName: 'testField',
        orderFormFields: [
          { name: 'testField', label: 'Тестовое поле', type: 'input' }
        ]
      };

      const result = service.getErrorMessage(params);

      expect(result).toContain('Тестовое поле');
      expect(result).toContain('обязательно');
    });

    it('должен возвращать сообщение для minlength ошибки', () => {
      const params: GetErrorMessageParams = {
        errors: { minlength: { requiredLength: 5, actualLength: 3 } },
        fieldName: 'testField',
        orderFormFields: [
          { name: 'testField', label: 'Тестовое поле', type: 'input' }
        ]
      };

      const result = service.getErrorMessage(params);

      expect(result).toContain('5 символов');
    });

    it('должен возвращать пустую строку если нет ошибок', () => {
      const params: GetErrorMessageParams = {
        errors: null,
        fieldName: 'testField',
        orderFormFields: []
      };

      const result = service.getErrorMessage(params);

      expect(result).toBe('');
    });
  });
});
