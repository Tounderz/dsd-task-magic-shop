import {Component, inject, OnInit} from '@angular/core';
import {Table} from '../../../core/components/table/table';
import {tableHeaderData} from './configs/ingredients-page-config';
import {IngredientTableState} from '../../../core/services/ingredient-table-state';
import {IngredientsPageService} from './services/ingredients-page.service';

@Component({
  selector: 'app-ingredients-page',
  imports: [
    Table
  ],
  templateUrl: './ingredients-page.html',
  styleUrl: './ingredients-page.scss',
})
export class IngredientsPage implements OnInit {
  public ingredientTableState: IngredientTableState = inject(IngredientTableState);
  private ingredientsPageService: IngredientsPageService = inject(IngredientsPageService);

  public readonly tableHeaderData = tableHeaderData;

  public ngOnInit(): void {
    !this.ingredientTableState.ingredientTableState()?.content.length && this.initTableData();
  }

  private initTableData(): void {
    const tableData = this.ingredientsPageService.transformIngredientsToTableData();
    tableData?.forEach(ingredient => {
      this.ingredientTableState.setIngredientTableState(ingredient);
    });
  }
}
