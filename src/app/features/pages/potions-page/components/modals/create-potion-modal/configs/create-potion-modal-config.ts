import {FormFieldItem} from '../../../../../../../core/types/form-field.types';
import {Validators} from '@angular/forms';

export const defaultCreatePotionFields: Array<FormFieldItem> = [
  {
    name: 'name',
    label: 'Название',
    type: 'input',
    validators: [Validators.required]
  },
  {
    name: 'description',
    label: 'Описание',
    type: 'input'
  }
]
