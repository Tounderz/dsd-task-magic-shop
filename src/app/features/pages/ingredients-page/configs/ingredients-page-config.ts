import {TableHeaderData} from '../../../../core/types/table.types';

export const tableHeaderData: Array<TableHeaderData> = [
  {
    key: 'id',
    value: '№',
    sortable: true,
    type: 'numeric'
  },
  {
    key: 'name',
    value: 'Название',
    sortable: true,
    type: 'text'
  },
  {
    key: 'description',
    value: 'Описание',
    sortable: true,
    type: 'text'
  },
  {
    key: 'price',
    value: 'Цена в золоте',
    sortable: true,
    type: 'numeric'
  },
  {
    key: 'unit',
    value: 'Ед. изм.',
    sortable: true,
    type: 'text'
  },
  {
    key: 'category',
    value: 'Категория',
    sortable: true,
    type: 'text'
  },
  {
    key: 'color',
    value: 'Цвет',
    sortable: false,
    type: 'color'
  }
]
