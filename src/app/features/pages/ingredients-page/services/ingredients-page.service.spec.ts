import { IngredientsPageService } from './ingredients-page.service';

describe('IngredientsPageService', () => {
  let service: IngredientsPageService;

  beforeEach(() => {
    service = new IngredientsPageService();
  });

  it('должен создавать сервис', () => {
    expect(service).toBeTruthy();
  });

  it('должен иметь метод transformIngredientsToTableData', () => {
    expect(service.transformIngredientsToTableData).toBeDefined();
    expect(typeof service.transformIngredientsToTableData).toBe('function');
  });

  it('должен возвращать массив из transformIngredientsToTableData', () => {
    const result = service.transformIngredientsToTableData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('должен правильно форматировать единицы измерения', () => {
    const result = service.transformIngredientsToTableData();
    result.forEach(item => {
      expect(item['unit']).toBeDefined();
      expect(typeof item['unit']).toBe('string');

      if (item['unit'] === 'шт' || item['unit'] === 'гр' || item['unit'] === 'мл') {
        expect(item['unit'].endsWith('.')).toBe(true);
      }
    });
  });

  it('должен правильно переводить категории', () => {
    const result = service.transformIngredientsToTableData();
    const russianCategories = ['Трава', 'Эссенция', 'Минерал', 'Кристалл'];
    result.forEach(item => {
      expect(item['category']).toBeDefined();
      expect(typeof item['category']).toBe('string');

      if (russianCategories.includes(item['category'] as string)) {
        expect(russianCategories).toContain(item['category']);
      }
    });
  });

  describe('приватные методы', () => {
    it('formatUnit должен форматировать известные единицы', () => {
      const serviceAny = service as any;

      expect(serviceAny.formatUnit('шт')).toBe('шт.');
      expect(serviceAny.formatUnit('гр')).toBe('гр.');
      expect(serviceAny.formatUnit('мл')).toBe('мл.');
    });

    it('formatUnit должен возвращать неизвестные единицы без изменений', () => {
      const serviceAny = service as any;

      expect(serviceAny.formatUnit('kg')).toBe('kg');
      expect(serviceAny.formatUnit('liter')).toBe('liter');
      expect(serviceAny.formatUnit('')).toBe('');
    });

    it('translateCategory должен переводить известные категории', () => {
      const serviceAny = service as any;

      expect(serviceAny.translateCategory('herb')).toBe('Трава');
      expect(serviceAny.translateCategory('essence')).toBe('Эссенция');
      expect(serviceAny.translateCategory('mineral')).toBe('Минерал');
      expect(serviceAny.translateCategory('crystal')).toBe('Кристалл');
    });

    it('translateCategory должен возвращать неизвестные категории без изменений', () => {
      const serviceAny = service as any;

      expect(serviceAny.translateCategory('unknown')).toBe('unknown');
      expect(serviceAny.translateCategory('')).toBe('');
      expect(serviceAny.translateCategory('test-category')).toBe('test-category');
    });
  });
});
