import {Validators} from '@angular/forms';

export type FormFieldItem = {
  name: string;
  label: string;
  type: FormFieldType;
  inputType?: string;
  validators?: Validators;
}
export type FormFieldType = 'input' | 'date' | 'select' | 'multi-select';

export type FieldChangedParams = {
  field: string;
  value: string | null;
}
