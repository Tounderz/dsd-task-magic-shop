import {Injectable, signal} from '@angular/core';
import {PotionIngredient} from '../types/potion.types';

@Injectable({
  providedIn: 'root',
})
export class PotionIngredientsColumnState {
  private _potionIngredientsColumnState = signal<Record<number, Array<PotionIngredient>>>({});
  public potionIngredientsColumnState = this._potionIngredientsColumnState.asReadonly();

  public setPotionTableState(id: number, ingredients: Array<PotionIngredient>): void {
    this._potionIngredientsColumnState.update(current => {
      return {
        ...current,
        [id]: ingredients
      };
    });
  }

  public getPotionIngredients(id: number): Array<PotionIngredient> {
    return this.potionIngredientsColumnState()[id] || [];
  }

  public removePotionIngredients(id: number): void {
    this._potionIngredientsColumnState.update(current => {
      const newState = { ...current };
      delete newState[id];
      return newState;
    });
  }

  public getPotionTotalPrice(id: number): number {
    const ingredients = this.getPotionIngredients(id);
    return ingredients.reduce((sum, item) => sum + item.totalPrice, 0);
  }
}
