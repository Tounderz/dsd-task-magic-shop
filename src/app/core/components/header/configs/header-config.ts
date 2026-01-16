import {HeaderLink} from '../types/header.types';

export const headerLinks: Array<HeaderLink> = [
  {
    path: '',
    label: 'Заказы',
    exact: true
  },
  {
    path: '/potions',
    label: 'Зелья',
    exact: false
  },
  {
    path: '/ingredients',
    label: 'Ингредиенты',
    exact: false
  }
]
