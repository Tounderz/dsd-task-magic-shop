export type TableHeaderData = {
  key: string;
  value: string;
  sortable: boolean;
  type: 'text' | 'numeric' | 'date' | 'modal' | 'color';
}

export type Pageable<T> = {
  content: Array<T>;
}

export type TableData = {
  id: number | string;
  [key: string]: TableDataValue
}

export type TableDataValue = string | number | ColumnModal;

export type ColumnModal = {
  id: number;
}
