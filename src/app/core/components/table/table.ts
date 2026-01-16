import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Pageable, TableData, TableHeaderData} from '../../types/table.types';
import {Button} from '../../../shared/components/ui/button/button';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    Button
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  tableHeaderData = input<Array<TableHeaderData>>([]);
  tableData = input<Pageable<TableData> | null>(null);
  needDeleteColumn = input<boolean>(false);
  @Output() handleDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() handleModalOpen: EventEmitter<number> = new EventEmitter<number>();

  public safeTableData = computed(() => {
    const data = this.tableData();
    return data?.content || [];
  });

  public handleModalOpenClick(id: number): void {
    this.handleModalOpen.emit(id);
  }

  public handleDeleteClick(id: number): void {
    this.handleDelete.emit(id)
  }
}
