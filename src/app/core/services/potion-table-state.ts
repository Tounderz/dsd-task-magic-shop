import {computed, Injectable, signal} from '@angular/core';
import {Pageable, TableData} from '../types/table.types';
import {SelectData} from '../types/select-data.types';

@Injectable({
  providedIn: 'root',
})
export class PotionTableState {
  private _potionTableState = signal<Pageable<TableData> | null>(null);
  public potionTableState = this._potionTableState.asReadonly();

  public potionOptions = computed<Array<SelectData>>(() => {
    const content = this._potionTableState()?.content;
    if (!content) { return []; }

    return content.map(item => ({
      name: String(item.id),
      label: String(item['name'] || `Зелье #${item.id}`)
    }));
  });

  public setPotionTableState(tableData: TableData): void {
    this._potionTableState.update(current => {
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

  public getPotionById(id: string | number): TableData | null {
    return this._potionTableState()?.content.find(i => i.id === id) || null;
  }

  public getPotionByName(name: string): TableData | null {
    return this._potionTableState()?.content.find(i => i['name'] === name) || null;
  }

  public removePotion(id: string | number): void {
    this._potionTableState.update(current => {
      if (!current) return null;

      const newContent = current.content.filter(item => item.id !== id);

      return {
        ...current,
        content: newContent
      };
    });
  }
}
