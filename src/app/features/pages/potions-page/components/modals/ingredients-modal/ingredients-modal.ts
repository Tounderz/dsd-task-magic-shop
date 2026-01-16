import {Component, inject, OnInit} from '@angular/core';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {PotionIngredientsColumnState} from '../../../../../../core/services/potion-ingredients-column-state';
import {PotionIngredient} from '../../../../../../core/types/potion.types';
import {IngredientsModalComponentsModule} from './components/ingredients-modal-components-module';

@Component({
  selector: 'app-ingredients-modal',
  imports: [
    IngredientsModalComponentsModule
  ],
  templateUrl: './ingredients-modal.html',
  styleUrl: './ingredients-modal.scss',
})
export class IngredientsModal implements OnInit {
  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private potionIngredientsColumnState: PotionIngredientsColumnState = inject(PotionIngredientsColumnState);

  public data: Array<PotionIngredient> = []

  public ngOnInit(): void {
    this.data = this.potionIngredientsColumnState.getPotionIngredients(this.config.data);
  }
}
