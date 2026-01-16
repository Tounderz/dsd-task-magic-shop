export type Ingredient =  {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  color: string;
  category: IngredientCategory;
}

export type IngredientCategory = 'herb' | 'mineral' | 'essence' | 'crystal';
