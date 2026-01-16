import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PieIngredientsChart} from './ingredients-modal-components/pie-ingredients-chart/pie-ingredients-chart';
import {UIChart} from 'primeng/chart';


@NgModule({
  declarations: [
    PieIngredientsChart
  ],
  imports: [
    CommonModule,
    UIChart
  ],
  exports: [
    PieIngredientsChart
  ]
})
export class IngredientsModalComponentsModule { }
