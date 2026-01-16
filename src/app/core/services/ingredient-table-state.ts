import {Injectable, signal} from '@angular/core';
import {Pageable, TableData} from '../types/table.types';

@Injectable({
  providedIn: 'root',
})
export class IngredientTableState {
  private _ingredientTableState = signal<Pageable<TableData> | null>(null);
  public ingredientTableState = this._ingredientTableState.asReadonly();

  public setIngredientTableState(tableData: TableData): void {
    this._ingredientTableState.update(current => {
      if (!current) {
        return {
          content: [tableData]
        };
      }

      const newContent = [tableData, ...current.content];

      return {
        ...current,
        content: newContent
      };
    });
  }
}
