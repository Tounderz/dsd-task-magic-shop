import {FormFieldItem} from '../../../../../../../core/types/form-field.types';
import {Validators} from '@angular/forms';
import {
  dateGreaterThanValidator,
  dateLessThanValidator,
  notPastDateValidator
} from '../../../../../../../core/validators/date.validators';

export const orderFormFields: Array<FormFieldItem> = [
  {
    name: 'potion',
    label: 'Номер зелья',
    type: 'select',
    validators: [Validators.required]
  },
  {
    name: 'name',
    label: 'Кто зелье заказал',
    type: 'input',
    validators: [Validators.required]
  },
  {
    name: 'orderDate',
    label: 'Когда заказали зелье',
    type: 'date',
    validators: [
      Validators.required,
      notPastDateValidator(),
      dateLessThanValidator('readyDate')
    ]
  },
  {
    name: 'readyDate',
    label: 'Когда зелье должно быть готово',
    type: 'date',
    validators: [
      Validators.required,
      notPastDateValidator(),
      dateGreaterThanValidator('orderDate')
    ]
  },
  {
    name: 'deliveryAddress',
    label: 'Куда зелье нужно доставить',
    type: 'input',
    inputType: 'text',
    validators: [Validators.required]
  },
  {
    name: 'deliveryMethod',
    label: 'Способ доставки зелья',
    type: 'select',
    validators: [Validators.required]
  },
  {
    name: 'paymentMethod',
    label: 'Способ оплаты',
    type: 'select',
    validators: [Validators.required]
  }
]
