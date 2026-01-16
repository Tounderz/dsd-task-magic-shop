import { TestBed } from '@angular/core/testing';
import { OrderTableState } from './order-table-state';
import { TableData } from '../types/table.types';

describe('OrderTableState', () => {
  let service: OrderTableState;
  const mockTableData1: TableData = {
    id: 0,
    potion: 'Зелье силы',
    name: 'Иван Иванов',
    orderDate: '2024-01-15',
    readyDate: '2024-01-20',
    deliveryAddress: 'ул. Центральная, д. 1',
    deliveryMethod: 'Курьер',
    paymentMethod: 'Карта'
  };

  const mockTableData2: TableData = {
    id: 0,
    potion: 'Зелье здоровья',
    name: 'Петр Петров',
    orderDate: '2024-01-16',
    readyDate: '2024-01-21',
    deliveryAddress: 'ул. Лесная, д. 5',
    deliveryMethod: 'Самовывоз',
    paymentMethod: 'Наличные'
  };

  const mockTableData3: TableData = {
    id: 0,
    potion: 'Зелье силы',
    name: 'Сергей Сергеев',
    orderDate: '2024-01-17',
    readyDate: '2024-01-22',
    deliveryAddress: 'пр. Победы, д. 10',
    deliveryMethod: 'Почта',
    paymentMethod: 'Карта'
  };

  const mockTableDataMinimal: TableData = {
    id: 0,
    potion: 'Зелье маны',
    name: 'Анна Аннова'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderTableState]
    });
    service = TestBed.inject(OrderTableState);
  });

  describe('Инициализация', () => {
    it('должен создавать сервис', () => {
      expect(service).toBeTruthy();
    });

    it('должен иметь начальное состояние null', () => {
      const state = service.orderTableState();
      expect(state).toBeNull();
    });

    it('должен предоставлять readonly сигнал', () => {
      const signal = service.orderTableState;
      expect(typeof signal).toBe('function');

      const state = signal();
      expect(state).toBeNull();
    });
  });

  describe('Метод setTableState', () => {
    it('должен устанавливать состояние при первом добавлении', () => {
      service.setTableState(mockTableData1);

      const state = service.orderTableState();
      expect(state).toBeTruthy();
      expect(state?.content).toHaveLength(1);

      const addedItem = state?.content[0];
      expect(addedItem?.['potion']).toBe('Зелье силы');
      expect(addedItem?.['name']).toBe('Иван Иванов');
      expect(addedItem?.['deliveryMethod']).toBe('Курьер');
      expect(addedItem?.['paymentMethod']).toBe('Карта');
      expect(addedItem?.['status']).toBeUndefined();
      expect(addedItem?.['customer']).toBeUndefined();
      expect(addedItem?.id).toBe(1);
    });

    it('должен присваивать инкрементируемые id', () => {
      service.setTableState(mockTableData1);
      let state = service.orderTableState();
      expect(state?.content[0].id).toBe(1);

      service.setTableState(mockTableData2);
      state = service.orderTableState();
      expect(state?.content[0].id).toBe(2);
      expect(state?.content[1].id).toBe(1);

      service.setTableState(mockTableData3);
      state = service.orderTableState();
      expect(state?.content[0].id).toBe(3);
      expect(state?.content[1].id).toBe(2);
      expect(state?.content[2].id).toBe(1);
    });

    it('должен добавлять новые элементы в начало массива', () => {
      service.setTableState(mockTableData1);
      service.setTableState(mockTableData2);
      service.setTableState(mockTableData3);

      const state = service.orderTableState();
      expect(state?.content).toHaveLength(3);
      expect(state?.content[0]['potion']).toBe('Зелье силы');
      expect(state?.content[0]['name']).toBe('Сергей Сергеев');
      expect(state?.content[0].id).toBe(3);

      expect(state?.content[1]['potion']).toBe('Зелье здоровья')
      expect(state?.content[1].id).toBe(2);

      expect(state?.content[2]['potion']).toBe('Зелье силы');
      expect(state?.content[2].id).toBe(1);
    });

    it('должен сохранять все поля из TableData', () => {
      const complexTableData: TableData = {
        id: 0,
        potion: 'Сложное зелье',
        name: 'Тест Клиент',
        orderDate: '2024-01-15',
        readyDate: '2024-01-20',
        deliveryAddress: 'ул. Тестовая, д. 1',
        deliveryMethod: 'Курьер',
        paymentMethod: 'Карта',
        notes: 'Особые указания'
      };

      service.setTableState(complexTableData);

      const state = service.orderTableState();
      const addedItem = state?.content[0];

      expect(addedItem?.['potion']).toBe('Сложное зелье');
      expect(addedItem?.['name']).toBe('Тест Клиент');
      expect(addedItem?.['orderDate']).toBe('2024-01-15');
      expect(addedItem?.['readyDate']).toBe('2024-01-20');
      expect(addedItem?.['deliveryAddress']).toBe('ул. Тестовая, д. 1');
      expect(addedItem?.['deliveryMethod']).toBe('Курьер');
      expect(addedItem?.['paymentMethod']).toBe('Карта');
      expect(addedItem?.['notes']).toBe('Особые указания');
    });

    it('должен корректно работать с числовыми id в TableData', () => {
      const dataWithStringId: TableData = {
        id: 'custom-id-123',
        potion: 'Тестовое зелье',
        name: 'Тест'
      };

      service.setTableState(dataWithStringId);

      const state = service.orderTableState();
      const addedItem = state?.content[0];

      expect(addedItem?.id).toBe(1);
      expect(addedItem?.['potion']).toBe('Тестовое зелье');
      expect(addedItem?.['name']).toBe('Тест');
    });
  });

  describe('Метод getOrderByPotionName', () => {
    beforeEach(() => {
      service.setTableState(mockTableData1);
      service.setTableState(mockTableData2);
      service.setTableState(mockTableData3);
    });

    it('должен возвращать все заказы по имени зелья', () => {
      const strengthPotions = service.getOrderByPotionName('Зелье силы');

      expect(strengthPotions).toHaveLength(2);
      expect(strengthPotions[0]['potion']).toBe('Зелье силы');
      expect(strengthPotions[0]['name']).toBe('Сергей Сергеев');
      expect(strengthPotions[0].id).toBe(3);
      expect(strengthPotions[1]['potion']).toBe('Зелье силы');
      expect(strengthPotions[1]['name']).toBe('Иван Иванов');
      expect(strengthPotions[1].id).toBe(1);
    });

    it('должен возвращать заказы по имени зелья здоровья', () => {
      const healthPotions = service.getOrderByPotionName('Зелье здоровья');

      expect(healthPotions).toHaveLength(1);
      expect(healthPotions[0]['potion']).toBe('Зелье здоровья');
      expect(healthPotions[0]['name']).toBe('Петр Петров');
      expect(healthPotions[0].id).toBe(2);
    });

    it('должен возвращать пустой массив для несуществующего имени', () => {
      const nonexistent = service.getOrderByPotionName('Несуществующее зелье');

      expect(nonexistent).toEqual([]);
      expect(nonexistent).toHaveLength(0);
    });

    it('должен учитывать регистр при поиске', () => {
      const lowerCaseSearch = service.getOrderByPotionName('зелье силы');
      const upperCaseSearch = service.getOrderByPotionName('ЗЕЛЬЕ СИЛЫ');
      const mixedCaseSearch = service.getOrderByPotionName('Зелье Силы');

      expect(lowerCaseSearch).toHaveLength(0);
      expect(upperCaseSearch).toHaveLength(0);
      expect(mixedCaseSearch).toHaveLength(0);
    });

    it('должен возвращать пустой массив если состояние null', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [OrderTableState]
      });
      const emptyService = TestBed.inject(OrderTableState);

      const result = emptyService.getOrderByPotionName('Зелье силы');
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('должен корректно работать с минимальным набором данных', () => {
      service.setTableState(mockTableDataMinimal);

      const manaPotions = service.getOrderByPotionName('Зелье маны');

      expect(manaPotions).toHaveLength(1);
      expect(manaPotions[0]['potion']).toBe('Зелье маны');
      expect(manaPotions[0]['name']).toBe('Анна Аннова');
      expect(manaPotions[0]['orderDate']).toBeUndefined();
    });
  });

  describe('Метод removeOrder', () => {
    beforeEach(() => {
      service.setTableState(mockTableData1);
      service.setTableState(mockTableData2);
      service.setTableState(mockTableData3);
    });

    it('должен удалять заказ по числовому id', () => {
      let state = service.orderTableState();
      expect(state?.content).toHaveLength(3);

      service.removeOrder(2);

      state = service.orderTableState();
      expect(state?.content).toHaveLength(2);

      const remainingIds = state?.content.map(item => item.id);
      expect(remainingIds).toContain(1);
      expect(remainingIds).toContain(3);
      expect(remainingIds).not.toContain(2);
      expect(state?.content[0].id).toBe(3);
      expect(state?.content[1].id).toBe(1);
    });

    it('должен безопасно обрабатывать удаление несуществующего id', () => {
      const initialState = service.orderTableState();
      expect(initialState?.content).toHaveLength(3);

      service.removeOrder(999);
      service.removeOrder('nonexistent');

      const finalState = service.orderTableState();
      expect(finalState?.content).toHaveLength(3);
      expect(finalState?.content.length).toBe(initialState?.content.length);
      expect(finalState?.content.map(item => item.id)).toEqual(initialState?.content.map(item => item.id));
    });

    it('должен корректно работать при удалении всех заказов', () => {
      service.removeOrder(1);
      service.removeOrder(2);
      service.removeOrder(3);

      const state = service.orderTableState();
      expect(state?.content).toHaveLength(0);
      expect(state?.content).toEqual([]);
      expect(state).toEqual({ content: [] });
    });

    it('должен корректно обрабатывать удаление из пустого состояния', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [OrderTableState]
      });
      const emptyService = TestBed.inject(OrderTableState);

      expect(() => {
        emptyService.removeOrder(1);
        emptyService.removeOrder('test');
      }).not.toThrow();

      const state = emptyService.orderTableState();
      expect(state).toBeNull();
    });

    it('должен сохранять порядок оставшихся элементов', () => {
      service.removeOrder(2);

      const state = service.orderTableState();
      expect(state?.content).toHaveLength(2);
      expect(state?.content[0].id).toBe(3);
      expect(state?.content[0]['potion']).toBe('Зелье силы');
      expect(state?.content[0]['name']).toBe('Сергей Сергеев');

      expect(state?.content[1].id).toBe(1);
      expect(state?.content[1]['potion']).toBe('Зелье силы');
      expect(state?.content[1]['name']).toBe('Иван Иванов');
    });
  });

  describe('Edge cases', () => {
    it('должен корректно обрабатывать TableData с минимальным набором полей', () => {
      const minimalData: TableData = {
        id: 0
      };

      service.setTableState(minimalData);

      const state = service.orderTableState();
      expect(state?.content[0].id).toBe(1);
      expect(state?.content[0]['potion']).toBeUndefined();
      expect(state?.content[0]['name']).toBeUndefined();
    });

    it('должен корректно работать с большими объемами данных', () => {
      for (let i = 0; i < 100; i++) {
        service.setTableState({
          id: 0,
          potion: `Зелье ${i}`,
          name: `Клиент ${i}`,
          orderDate: `2024-01-${(i % 30) + 1}`
        });
      }

      const state = service.orderTableState();
      expect(state?.content).toHaveLength(100);
      expect(state?.content[0].id).toBe(100);
      expect(state?.content[0]['potion']).toBe('Зелье 99');
      expect(state?.content[99].id).toBe(1);
      expect(state?.content[99]['potion']).toBe('Зелье 0');

      const potion50 = service.getOrderByPotionName('Зелье 50');
      expect(potion50).toHaveLength(1);
      expect(potion50[0].id).toBe(51);
    });

    it('должен корректно обрабатывать специальные символы в именах', () => {
      const specialCharData: TableData = {
        id: 0,
        potion: 'Зелье с "кавычками" & символами',
        name: 'Клиент-О\'Коннор',
        deliveryAddress: 'ул. "Центральная", д. 1'
      };

      service.setTableState(specialCharData);

      const found = service.getOrderByPotionName('Зелье с "кавычками" & символами');
      expect(found).toHaveLength(1);
      expect(found[0]['name']).toBe('Клиент-О\'Коннор');
      expect(found[0]['deliveryAddress']).toBe('ул. "Центральная", д. 1');
    });

    it('должен сохранять иммутабельность при операциях', () => {
      service.setTableState(mockTableData1);
      const state1 = service.orderTableState();

      service.setTableState(mockTableData2);
      const state2 = service.orderTableState();

      expect(state1).not.toBe(state2);
      expect(state1?.content).not.toBe(state2?.content);
      expect(state1?.content).toHaveLength(1);
      expect(state2?.content).toHaveLength(2);
    });
  });
});
