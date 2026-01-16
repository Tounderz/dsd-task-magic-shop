import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderPotionForm} from './order-potion-modal-components/order-potion-form/order-potion-form';
import {ReactiveFormsModule} from '@angular/forms';
import {Input} from '../../../../../../../shared/components/ui/input/input';
import {Select} from '../../../../../../../shared/components/ui/select/select';
import { DatePickerModule } from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';


@NgModule({
  declarations: [
    OrderPotionForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Input,
    Select,
    DatePickerModule,
    FloatLabel
  ],
  exports: [
    OrderPotionForm
  ]
})
export class OrderPotionModalComponentsModule { }
