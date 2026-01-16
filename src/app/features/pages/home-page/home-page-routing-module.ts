import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PotionsPage} from '../potions-page/potions-page';
import {IngredientsPage} from '../ingredients-page/ingredients-page';
import {OrdersPage} from '../orders-page/orders-page';
import {HomePage} from './home-page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        component: OrdersPage
      },
      {
        path: 'potions',
        component: PotionsPage
      },
      {
        path: 'ingredients',
        component: IngredientsPage
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
