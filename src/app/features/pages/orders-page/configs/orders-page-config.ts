import {TableHeaderData} from '../../../../core/types/table.types';

export const tableHeaderData: Array<TableHeaderData> = [
  {
    key: 'id',
    value: 'Номер заказа',
    sortable: true,
    type: 'numeric'
  },
  {
    key: 'potion',
    value: 'Зелье',
    sortable: true,
    type: 'text'
  },
  {
    key: 'name',
    value: 'Кто зелье заказал',
    sortable: true,
    type: 'text'
  },
  {
    key: 'orderDate',
    value: 'Когда заказали зелье',
    sortable: true,
    type: 'date'
  },
  {
    key: 'readyDate',
    value: 'Когда зелье должно быть готово',
    sortable: true,
    type: 'date'
  },
  {
    key: 'deliveryAddress',
    value: 'Куда зелье нужно доставить',
    sortable: true,
    type: 'text'
  },
  {
    key: 'deliveryMethod',
    value: 'Способ доставки зелья',
    sortable: true,
    type: 'text'
  },
  {
    key: 'paymentMethod',
    value: 'Способ оплаты',
    sortable: true,
    type: 'text'
  }
]
