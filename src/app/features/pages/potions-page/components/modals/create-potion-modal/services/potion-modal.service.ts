import {inject, Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TableData} from '../../../../../../../core/types/table.types';
import {tableHeaderData} from '../../../../configs/potions-page-config';
import {ingredients} from '../../../../../../../core/models/ingredients-data';
import {defaultCreatePotionFields} from '../configs/create-potion-modal-config';
import {PotionIngredient} from '../../../../../../../core/types/potion.types';
import {PotionTableState} from '../../../../../../../core/services/potion-table-state';
import {PotionIngredientsColumnState} from '../../../../../../../core/services/potion-ingredients-column-state';

@Injectable({
  providedIn: 'root',
})
export class PotionModalService {
  private potionTableState: PotionTableState = inject(PotionTableState);
  private potionIngredientsColumnState: PotionIngredientsColumnState = inject(PotionIngredientsColumnState);

  public initForm(): FormGroup {
    const group: { [name: string]: FormControl } = {};

    ingredients.forEach(field => {
      group[field.id] = new FormControl(null);
    });

    defaultCreatePotionFields.forEach(field => {
      group[field.name] = new FormControl(null, field.validators);
    })

    return new FormGroup(group);
  }

  public transformTableData(formGroup: FormGroup): TableData {
    const formValue = formGroup.value;
    const length = this.potionTableState.potionTableState()?.content.length || 0;
    const result: TableData = { id: length + 1 };

    tableHeaderData.forEach(header => {
      if (header.key !== 'id') {
        const value = formValue[header.key];
        switch (header.key) {
          case 'ingredients':
            this.setPotionIngredients(formValue, Number(result.id));
            result[header.key] = {
              id: Number(result.id)
            };
            break;
          case 'totalPrice':
            const totalPrice = this.potionIngredientsColumnState.getPotionTotalPrice(Number(result.id));
            result[header.key] = totalPrice;
            break;
          default:
            result[header.key] = value || '';
        }
      }
    });

    return result;
  }

  private setPotionIngredients(formValue: FormGroup['value'], id: number): void {
    const potionIngredients: Array<PotionIngredient> = this.getPotionIngredients(formValue);
    this.potionIngredientsColumnState.setPotionTableState(id, potionIngredients);
  }

  private getPotionIngredients(formValue: FormGroup['value']): Array<PotionIngredient> {
    const potionIngredients: Array<PotionIngredient> = [];

    ingredients.forEach(ingredient => {
      const formKey = ingredient.id.toString();
      const quantity = formValue[formKey];

      if (quantity !== null && quantity !== undefined && quantity !== '' && !!Number(quantity)) {
        const quantityNum = Number(quantity);
        const totalPrice = ingredient.price * quantityNum;

        potionIngredients.push({
          ingredient: ingredient.name,
          quantity: quantityNum,
          unitPrice: ingredient.price,
          totalPrice: totalPrice,
          color: ingredient.color
        });
      }
    });

    return potionIngredients;
  }
}
