import {TableHeaderData} from '../../../../core/types/table.types';

export const tableHeaderData: Array<TableHeaderData> = [
  {
    key: 'id',
    value: 'Номер зелья',
    sortable: true,
    type: 'numeric'
  },
  {
    key: 'name',
    value: 'Зелье',
    sortable: true,
    type: 'text'
  },
  {
    key: 'description',
    value: 'Описание',
    sortable: false,
    type: 'text'
  },
  {
    key: 'ingredients',
    value: 'Ингредиенты',
    sortable: false,
    type: 'modal'
  },
  {
    key: 'totalPrice',
    value: 'Цена в золоте',
    sortable: true,
    type: 'numeric'
  }
]
