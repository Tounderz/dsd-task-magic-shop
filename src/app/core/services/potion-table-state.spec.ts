import { PotionTableState } from './potion-table-state';

describe('PotionTableState', () => {
  let service: PotionTableState;

  beforeEach(() => {
    service = new PotionTableState();
  });

  it('должен создавать сервис', () => {
    expect(service).toBeTruthy();
  });

  it('должен иметь начальное состояние null', () => {
    expect(service.potionTableState()).toBeNull();
  });

  describe('setPotionTableState', () => {
    it('должен устанавливать первое зелье', () => {
      const tableData = { id: 1, name: 'Зелье исцеления' };

      service.setPotionTableState(tableData as any);

      const state = service.potionTableState();
      expect(state).toBeTruthy();
      expect(state?.content.length).toBe(1);
      expect(state?.content[0]).toEqual(tableData);
    });

    it('должен добавлять новые зелья в начало', () => {
      const firstPotion = { id: 1, name: 'Первое зелье' };
      const secondPotion = { id: 2, name: 'Второе зелье' };

      service.setPotionTableState(firstPotion as any);
      service.setPotionTableState(secondPotion as any);

      const state = service.potionTableState();
      expect(state?.content.length).toBe(2);
      expect(state?.content[0]).toEqual(secondPotion);
      expect(state?.content[1]).toEqual(firstPotion);
    });
  });

  describe('potionOptions', () => {
    it('должен возвращать пустой массив если нет зелий', () => {
      const options = service.potionOptions();
      expect(options).toEqual([]);
    });

    it('должен преобразовывать зелья в SelectData', () => {
      const potion = { id: 1, name: 'Зелье исцеления' };
      service.setPotionTableState(potion as any);

      const options = service.potionOptions();

      expect(options.length).toBe(1);
      expect(options[0].name).toBe('1');
      expect(options[0].label).toBe('Зелье исцеления');
    });

    it('должен использовать id как fallback для label', () => {
      const potion = { id: 1 };
      service.setPotionTableState(potion as any);

      const options = service.potionOptions();

      expect(options[0].label).toBe('Зелье #1');
    });
  });

  describe('getPotionById', () => {
    it('должен возвращать null если зелье не найдено', () => {
      const result = service.getPotionById(999);
      expect(result).toBeNull();
    });

    it('должен находить зелье по id', () => {
      const potion = { id: 1, name: 'Тест' };
      service.setPotionTableState(potion as any);

      const result = service.getPotionById(1);
      expect(result).toEqual(potion);
    });
  });

  describe('getPotionByName', () => {
    it('должен возвращать null если зелье не найдено', () => {
      const result = service.getPotionByName('Несуществующее');
      expect(result).toBeNull();
    });

    it('должен находить зелье по имени', () => {
      const potion = { id: 1, name: 'Зелье силы' };
      service.setPotionTableState(potion as any);

      const result = service.getPotionByName('Зелье силы');
      expect(result).toEqual(potion);
    });
  });

  describe('removePotion', () => {
    it('должен удалять зелье по id', () => {
      const potion1 = { id: 1, name: 'Зелье 1' };
      const potion2 = { id: 2, name: 'Зелье 2' };

      service.setPotionTableState(potion1 as any);
      service.setPotionTableState(potion2 as any);

      service.removePotion(1);

      const state = service.potionTableState();
      expect(state?.content.length).toBe(1);
      expect(state?.content[0]).toEqual(potion2);
    });

    it('не должен падать при удалении несуществующего зелья', () => {
      expect(() => {
        service.removePotion(999);
      }).not.toThrow();
    });
  });
});
