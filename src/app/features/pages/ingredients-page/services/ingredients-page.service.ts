import { Injectable } from '@angular/core';
import {TableData} from '../../../../core/types/table.types';
import {ingredients} from '../../../../core/models/ingredients-data';

@Injectable({
  providedIn: 'root',
})
export class IngredientsPageService {
  public transformIngredientsToTableData(): Array<TableData> {
    return ingredients.map(ingredient => ({
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
      price: ingredient.price,
      unit: this.formatUnit(ingredient.unit),
      category: this.translateCategory(ingredient.category),
      color: ingredient.color
    }));
  }

  private formatUnit(unit: string): string {
    const unitsMap: { [key: string]: string } = {
      'шт': 'шт.',
      'гр': 'гр.',
      'мл': 'мл.'
    };
    return unitsMap[unit] || unit;
  }

  private translateCategory(category: string): string {
    const categoriesMap: { [key: string]: string } = {
      'herb': 'Трава',
      'essence': 'Эссенция',
      'mineral': 'Минерал',
      'crystal': 'Кристалл'
    };

    return categoriesMap[category] || category;
  }
}
