import { IngredientTableState } from './ingredient-table-state';
import { TableData } from '../types/table.types';

describe('IngredientTableState', () => {
  let service: IngredientTableState;

  beforeEach(() => {
    service = new IngredientTableState();
  });

  it('должен создавать сервис', () => {
    expect(service).toBeTruthy();
  });

  it('должен иметь начальное состояние null', () => {
    const state = service.ingredientTableState();
    expect(state).toBeNull();
  });

  describe('setIngredientTableState', () => {
    it('должен добавлять первый элемент в состояние', () => {
      const tableData: TableData = {
        id: 1,
        name: 'Test',
        description: 'Description',
        price: 100,
        unit: 'шт',
        category: 'herb',
        color: '#000'
      };

      service.setIngredientTableState(tableData);

      const state = service.ingredientTableState();
      expect(state).toBeTruthy();
      expect(state?.content.length).toBe(1);
      expect(state?.content[0]).toEqual(tableData);
    });

    it('должен добавлять новые элементы в начало', () => {
      const firstItem: TableData = {
        id: 1,
        name: 'First',
        description: 'First description',
        price: 50,
        unit: 'шт',
        category: 'herb',
        color: '#000'
      };

      const secondItem: TableData = {
        id: 2,
        name: 'Second',
        description: 'Second description',
        price: 100,
        unit: 'гр',
        category: 'mineral',
        color: '#FFF'
      };

      service.setIngredientTableState(firstItem);
      service.setIngredientTableState(secondItem);

      const state = service.ingredientTableState();
      expect(state?.content.length).toBe(2);
      expect(state?.content[0]).toEqual(secondItem);
      expect(state?.content[1]).toEqual(firstItem);
    });

    it('должен сохранять другие свойства состояния при добавлении новых элементов', () => {
      const privateService = service as any;
      const initialContent = [{
        id: 1,
        name: 'Test',
        description: 'Test',
        price: 10,
        unit: 'шт',
        category: 'herb',
        color: '#000'
      }];

      privateService._ingredientTableState.set({
        content: initialContent,
        totalElements: 5,
        totalPages: 2
      });

      const newData: TableData = {
        id: 2,
        name: 'New',
        description: 'New',
        price: 20,
        unit: 'гр',
        category: 'mineral',
        color: '#FFF'
      };

      service.setIngredientTableState(newData);

      const state = service.ingredientTableState();
      expect(state).toEqual({
        content: [newData, ...initialContent],
        totalElements: 5,
        totalPages: 2
      });
    });
  });
});
