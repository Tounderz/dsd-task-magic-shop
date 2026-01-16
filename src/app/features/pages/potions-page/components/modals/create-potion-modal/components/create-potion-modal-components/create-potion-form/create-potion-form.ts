import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldChangedParams, FormFieldItem} from '../../../../../../../../../core/types/form-field.types';
import {ingredients} from '../../../../../../../../../core/models/ingredients-data';
import {defaultCreatePotionFields} from '../../../configs/create-potion-modal-config';

@Component({
  selector: 'app-create-potion-form',
  standalone: false,
  templateUrl: './create-potion-form.html',
  styleUrl: './create-potion-form.scss',
})
export class CreatePotionForm {
  potionForm = input<FormGroup>(new FormGroup({}));
  potionFormFields = input<Array<FormFieldItem>>();
  @Output() fieldChanged: EventEmitter<FieldChangedParams> = new EventEmitter<FieldChangedParams>();

  public readonly defaultCreatePotionFields = defaultCreatePotionFields;
  public readonly ingredients = ingredients;

  public inputValueChange(value: string, fieldName: number | string): void {
    this.fieldChanged.emit({ field: String(fieldName), value });
  }
}
