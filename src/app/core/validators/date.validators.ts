import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notPastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) { return null; }

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate < today ?
      { pastDate: true } :
      null;
  };
}

export function dateLessThanValidator(maxDateControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) { return null; }

    const maxDateControl = control.root.get(maxDateControlName);
    if (!maxDateControl || !maxDateControl.value) { return null; }

    const date = new Date(control.value);
    const maxDate = new Date(maxDateControl.value);

    return date > maxDate ?
      { dateGreaterThanMax: { maxDate: maxDateControl.value } } :
      null;
  };
}

export function dateGreaterThanValidator(minDateControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) { return null; }

    const minDateControl = control.root.get(minDateControlName);
    if (!minDateControl || !minDateControl.value) { return null; }

    const date = new Date(control.value);
    const minDate = new Date(minDateControl.value);

    return date < minDate ?
      { dateLessThanMin: { minDate: minDateControl.value } } :
      null;
  };
}
