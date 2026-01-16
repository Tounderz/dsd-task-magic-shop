export type PotionIngredient = {
  ingredient: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  color: string;
  [key: string]: string | number;
}
