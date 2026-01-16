import {FormFieldItem} from './form-field.types';
import {ValidationErrors} from '@angular/forms';

export type GetErrorMessageParams = {
  errors?: ValidationErrors | null;
  fieldName: string;
  orderFormFields?: Array<FormFieldItem>;
}
