import { TestBed } from '@angular/core/testing';
import { PotionIngredientsColumnState } from './potion-ingredients-column-state';
import { PotionIngredient } from '../types/potion.types';

describe('PotionIngredientsColumnState', () => {
  let service: PotionIngredientsColumnState;
  const mockIngredient1: PotionIngredient = {
    ingredient: 'Ингредиент 1',
    quantity: 2,
    unitPrice: 100,
    totalPrice: 200,
    color: '#ff0000'
  };

  const mockIngredient2: PotionIngredient = {
    ingredient: 'Ингредиент 2',
    quantity: 3,
    unitPrice: 50,
    totalPrice: 150,
    color: '#00ff00'
  };

  const mockIngredient3: PotionIngredient = {
    ingredient: 'Ингредиент 3',
    quantity: 1,
    unitPrice: 75,
    totalPrice: 75,
    color: '#0000ff'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PotionIngredientsColumnState]
    });
    service = TestBed.inject(PotionIngredientsColumnState);
  });

  describe('Инициализация', () => {
    it('должен создавать сервис', () => {
      expect(service).toBeTruthy();
    });

    it('должен иметь начальное пустое состояние', () => {
      const state = service.potionIngredientsColumnState();
      expect(state).toEqual({});
      expect(Object.keys(state)).toHaveLength(0);
    });

    it('должен предоставлять readonly сигнал', () => {
      const signal = service.potionIngredientsColumnState;
      expect(typeof signal).toBe('function');

      const state = signal();
      expect(state).toEqual({});
    });
  });

  describe('Метод setPotionTableState', () => {
    it('должен устанавливать ингредиенты для указанного id', () => {
      const potionId = 1;
      const ingredients = [mockIngredient1, mockIngredient2];

      service.setPotionTableState(potionId, ingredients);

      const state = service.potionIngredientsColumnState();
      expect(state[potionId]).toEqual(ingredients);
      expect(state[potionId]).toHaveLength(2);
    });

    it('должен добавлять новые записи без удаления существующих', () => {
      const potionId1 = 1;
      const ingredients1 = [mockIngredient1];

      const potionId2 = 2;
      const ingredients2 = [mockIngredient2, mockIngredient3];

      service.setPotionTableState(potionId1, ingredients1);
      let state = service.potionIngredientsColumnState();
      expect(state[potionId1]).toEqual(ingredients1);
      expect(state[potionId2]).toBeUndefined();

      service.setPotionTableState(potionId2, ingredients2);
      state = service.potionIngredientsColumnState();
      expect(state[potionId1]).toEqual(ingredients1);
      expect(state[potionId2]).toEqual(ingredients2);
    });

    it('должен обновлять существующие записи', () => {
      const potionId = 1;
      const initialIngredients = [mockIngredient1];
      const updatedIngredients = [mockIngredient1, mockIngredient2];

      service.setPotionTableState(potionId, initialIngredients);
      let state = service.potionIngredientsColumnState();
      expect(state[potionId]).toEqual(initialIngredients);
      expect(state[potionId]).toHaveLength(1);

      service.setPotionTableState(potionId, updatedIngredients);
      state = service.potionIngredientsColumnState();
      expect(state[potionId]).toEqual(updatedIngredients);
      expect(state[potionId]).toHaveLength(2);
    });

    it('должен корректно обрабатывать пустой массив ингредиентов', () => {
      const potionId = 1;
      const emptyIngredients: PotionIngredient[] = [];

      service.setPotionTableState(potionId, emptyIngredients);
      const state = service.potionIngredientsColumnState();
      expect(state[potionId]).toEqual([]);
      expect(state[potionId]).toHaveLength(0);
    });
  });

  describe('Метод getPotionIngredients', () => {
    beforeEach(() => {
      service.setPotionTableState(1, [mockIngredient1, mockIngredient2]);
      service.setPotionTableState(2, [mockIngredient3]);
    });

    it('должен возвращать ингредиенты для существующего id', () => {
      const ingredients1 = service.getPotionIngredients(1);
      expect(ingredients1).toEqual([mockIngredient1, mockIngredient2]);
      expect(ingredients1).toHaveLength(2);

      const ingredients2 = service.getPotionIngredients(2);
      expect(ingredients2).toEqual([mockIngredient3]);
      expect(ingredients2).toHaveLength(1);
    });

    it('должен возвращать пустой массив для несуществующего id', () => {
      const ingredients = service.getPotionIngredients(999);
      expect(ingredients).toEqual([]);
      expect(ingredients).toHaveLength(0);
    });

    it('должен корректно работать с пустыми массивами', () => {
      const emptyId = 3;
      service.setPotionTableState(emptyId, []);
      const ingredients = service.getPotionIngredients(emptyId);
      expect(ingredients).toEqual([]);
      expect(ingredients).toHaveLength(0);
    });
  });

  describe('Метод removePotionIngredients', () => {
    beforeEach(() => {
      service.setPotionTableState(1, [mockIngredient1]);
      service.setPotionTableState(2, [mockIngredient2]);
      service.setPotionTableState(3, [mockIngredient3]);
    });

    it('должен удалять ингредиенты для указанного id', () => {
      let state = service.potionIngredientsColumnState();
      expect(state[1]).toBeDefined();
      expect(state[2]).toBeDefined();
      expect(state[3]).toBeDefined();

      service.removePotionIngredients(2);
      state = service.potionIngredientsColumnState();
      expect(state[1]).toBeDefined();
      expect(state[2]).toBeUndefined();
      expect(state[3]).toBeDefined();
    });

    it('должен безопасно обрабатывать удаление несуществующего id', () => {
      const initialState = service.potionIngredientsColumnState();
      service.removePotionIngredients(999);
      const finalState = service.potionIngredientsColumnState();
      expect(finalState).toEqual(initialState);
    });
  });

  describe('Метод getPotionTotalPrice', () => {
    beforeEach(() => {
      service.setPotionTableState(1, [
        { ingredient: 'Ингредиент A', quantity: 2, unitPrice: 100, totalPrice: 200, color: '#ff0000' },
        { ingredient: 'Ингредиент B', quantity: 3, unitPrice: 50, totalPrice: 150, color: '#00ff00' }
      ]);

      service.setPotionTableState(2, [
        { ingredient: 'Ингредиент C', quantity: 1, unitPrice: 75, totalPrice: 75, color: '#0000ff' },
        { ingredient: 'Ингредиент D', quantity: 2, unitPrice: 200, totalPrice: 400, color: '#ffff00' }
      ]);

      service.setPotionTableState(3, []);
    });

    it('должен правильно вычислять общую стоимость', () => {
      const total1 = service.getPotionTotalPrice(1);
      expect(total1).toBe(350);

      const total2 = service.getPotionTotalPrice(2);
      expect(total2).toBe(475);
    });

    it('должен возвращать 0 для несуществующего id', () => {
      const total = service.getPotionTotalPrice(999);
      expect(total).toBe(0);
    });

    it('должен возвращать 0 для пустого списка', () => {
      const total = service.getPotionTotalPrice(3);
      expect(total).toBe(0);
    });
  });

  describe('Интеграционные тесты', () => {
    it('должен корректно работать с полным циклом операций', () => {
      const potionId = 1;

      expect(service.getPotionIngredients(potionId)).toEqual([]);
      expect(service.getPotionTotalPrice(potionId)).toBe(0);

      const ingredients1 = [mockIngredient1, mockIngredient2];
      service.setPotionTableState(potionId, ingredients1);
      expect(service.getPotionIngredients(potionId)).toEqual(ingredients1);
      expect(service.getPotionTotalPrice(potionId)).toBe(350);

      const ingredients2 = [mockIngredient3];
      service.setPotionTableState(potionId, ingredients2);
      expect(service.getPotionIngredients(potionId)).toEqual(ingredients2);
      expect(service.getPotionTotalPrice(potionId)).toBe(75);

      service.removePotionIngredients(potionId);
      expect(service.getPotionIngredients(potionId)).toEqual([]);
      expect(service.getPotionTotalPrice(potionId)).toBe(0);
    });

    it('должен корректно управлять несколькими зельями', () => {
      service.setPotionTableState(1, [mockIngredient1]);
      service.setPotionTableState(2, [mockIngredient2]);
      service.setPotionTableState(3, [mockIngredient3]);

      expect(service.getPotionIngredients(1)).toEqual([mockIngredient1]);
      expect(service.getPotionTotalPrice(1)).toBe(200);

      expect(service.getPotionIngredients(2)).toEqual([mockIngredient2]);
      expect(service.getPotionTotalPrice(2)).toBe(150);

      expect(service.getPotionIngredients(3)).toEqual([mockIngredient3]);
      expect(service.getPotionTotalPrice(3)).toBe(75);

      service.setPotionTableState(2, [mockIngredient1, mockIngredient3]);
      expect(service.getPotionIngredients(2)).toEqual([mockIngredient1, mockIngredient3]);
      expect(service.getPotionTotalPrice(2)).toBe(275);

      service.removePotionIngredients(1);
      expect(service.getPotionIngredients(1)).toEqual([]);
      expect(service.getPotionTotalPrice(1)).toBe(0);

      expect(service.getPotionIngredients(2)).toEqual([mockIngredient1, mockIngredient3]);
      expect(service.getPotionIngredients(3)).toEqual([mockIngredient3]);
    });
  });

  describe('Edge cases', () => {
    it('должен корректно обрабатывать ингредиенты с плавающей точкой', () => {
      const potionId = 1;
      const floatIngredients: PotionIngredient[] = [
        { ingredient: 'Ингредиент 1', quantity: 2, unitPrice: 99.99, totalPrice: 199.98, color: '#ff0000' },
        { ingredient: 'Ингредиент 2', quantity: 3, unitPrice: 50.50, totalPrice: 151.50, color: '#00ff00' }
      ];

      service.setPotionTableState(potionId, floatIngredients);
      const total = service.getPotionTotalPrice(potionId);
      expect(total).toBeCloseTo(351.48, 2);
    });

    it('должен корректно работать с нулевым id', () => {
      const zeroId = 0;
      const ingredients = [mockIngredient1];

      service.setPotionTableState(zeroId, ingredients);
      expect(service.getPotionIngredients(zeroId)).toEqual(ingredients);
      expect(service.getPotionTotalPrice(zeroId)).toBe(200);

      service.removePotionIngredients(zeroId);
      expect(service.getPotionIngredients(zeroId)).toEqual([]);
    });

    it('должен сохранять порядок ингредиентов', () => {
      const potionId = 1;
      const ingredients = [mockIngredient1, mockIngredient2, mockIngredient3];

      service.setPotionTableState(potionId, ingredients);
      const retrieved = service.getPotionIngredients(potionId);

      expect(retrieved[0].ingredient).toBe('Ингредиент 1');
      expect(retrieved[1].ingredient).toBe('Ингредиент 2');
      expect(retrieved[2].ingredient).toBe('Ингредиент 3');
    });
  });
});
