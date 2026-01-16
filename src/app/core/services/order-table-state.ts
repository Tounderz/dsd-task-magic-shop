import {Injectable, signal} from '@angular/core';
import {Pageable, TableData, TableDataValue} from '../types/table.types';

@Injectable({
  providedIn: 'root',
})
export class OrderTableState {
  private _orderTableState = signal<Pageable<TableData> | null>(null);
  public orderTableState = this._orderTableState.asReadonly();

  public setTableState(tableData: TableData): void {
    this._orderTableState.update(current => {
      tableData.id = !current ? 1 : current.content.length + 1;
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

  public getOrderByPotionName(name: TableDataValue): Array<TableData> {
    return this._orderTableState()?.content.filter(i => i['potion'] === name) || [];
  }

  public removeOrder(id: string | number): void {
    this._orderTableState.update(current => {
      if (!current) return null;

      const newContent = current.content.filter(item => item.id !== id);

      return {
        ...current,
        content: newContent
      };
    });
  }
}
