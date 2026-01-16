import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatePotionForm} from './create-potion-modal-components/create-potion-form/create-potion-form';
import {ReactiveFormsModule} from '@angular/forms';
import {Input} from '../../../../../../../shared/components/ui/input/input';



@NgModule({
  declarations: [
    CreatePotionForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Input
  ],
  exports: [
    CreatePotionForm
  ]
})
export class CreatePotionModalComponentsModule { }
