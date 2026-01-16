import {inject, Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FormFieldItem} from '../../../../../../../core/types/form-field.types';
import {TableData} from '../../../../../../../core/types/table.types';
import {UtilityService} from '../../../../../../../core/services/utility.service';
import {SelectData} from '../../../../../../../core/types/select-data.types';
import {paymentMethods} from '../../../../../../../core/models/payment-method-select';
import {deliveryMethods} from '../../../../../../../core/models/delivery-method-select';
import {tableHeaderData} from '../../../../configs/orders-page-config';
import {GetErrorMessageParams} from '../../../../../../../core/types/error-message.types';
import {PotionTableState} from '../../../../../../../core/services/potion-table-state';

@Injectable({
  providedIn: 'root',
})
export class OrderPotionModalService {
  private utilityService: UtilityService = inject(UtilityService);
  private potionTableState: PotionTableState = inject(PotionTableState);

  public initForm(formFields: Array<FormFieldItem>): FormGroup {
    const group: { [name: string]: FormControl } = {};

    formFields.forEach(field => {
      group[field.name] = new FormControl(null, field.validators);
    });

    return new FormGroup(group);
  }

  public transformTableData(formGroup: FormGroup): TableData {
    const formValue = formGroup.value;
    const result: TableData = { id: formValue['id'] || 0 };
    const potions = this.potionTableState.potionOptions();

    tableHeaderData.forEach(header => {
      if (header.key !== 'id') {
        const value = formValue[header.key];
        switch (header.key) {
          case 'deliveryMethod':
            result[header.key] = this.getLabel(value, deliveryMethods);
            break;
          case 'paymentMethod':
            result[header.key] = this.getLabel(value, paymentMethods);
            break;
          case 'potion':
            result[header.key] = this.getLabel(value, potions);
            break;
          case 'orderDate':
          case 'readyDate':
            result[header.key] = this.utilityService.formatDateIntl(value) || '';
            break;
          default:
            result[header.key] = value || '';
        }
      }
    });

    return result;
  }

  public getErrorMessage(getErrorMessageParams: GetErrorMessageParams): string {
    const { errors, fieldName } = getErrorMessageParams;
    if (!errors) { return ''; }

    const fieldLabel = this.getFieldLabel(getErrorMessageParams);
    const errorMessages = new Map<string, (error: any) => string>([
      ['required', () => `Поле "${fieldLabel}" обязательно для заполнения`],
      ['minlength', (error) => `Поле "${fieldLabel}" должно содержать минимум ${error.requiredLength} символов`],
      ['maxlength', (error) => `Поле "${fieldLabel}" должно содержать максимум ${error.requiredLength} символов`],
      ['pattern', () => `Поле "${fieldLabel}" содержит недопустимые символы`],
      ['pastDate', () => `Нельзя выбрать прошедшую дату в поле "${fieldLabel}"`],
      ['dateLessThanMin', () => fieldName === 'readyDate' ?
        'Дата готовности должна быть позже даты заказа' :
        `Дата в поле "${fieldLabel}" должна быть позже указанной даты`
      ],
      ['dateGreaterThanMax', () => fieldName === 'orderDate' ?
        'Дата заказа не может быть позже даты готовности' :
        `Дата в поле "${fieldLabel}" не может быть позже указанной даты`
      ]
    ]);

    for (const [errorKey, errorValue] of Object.entries(errors)) {
      const messageFn = errorMessages.get(errorKey);
      if (messageFn) {
        return messageFn(errorValue);
      }
    }

    return `Ошибка в поле "${fieldLabel}"`;
  }

  private getLabel(value: string, options: Array<SelectData>): string {
    if (!value) { return ''; }

    const option = options.find(opt => opt.name === value || opt.label === value);

    return option?.label || value;
  }

  private getFieldLabel({ fieldName, orderFormFields }: GetErrorMessageParams): string {
    const field = orderFormFields?.find(f => f.name === fieldName);
    return field?.label || fieldName;
  }
}
