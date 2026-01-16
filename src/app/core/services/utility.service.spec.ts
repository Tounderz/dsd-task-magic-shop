import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    service = new UtilityService();
  });

  it('должен создавать сервис', () => {
    expect(service).toBeTruthy();
  });

  describe('formatDateIntl', () => {
    it('должен форматировать корректную дату', () => {
      const date = '2024-01-15';
      const result = service.formatDateIntl(date);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toContain('2024');
    });

    it('должен возвращать строку как есть для некорректной даты', () => {
      const invalidDate = 'не-дата';
      const result = service.formatDateIntl(invalidDate);

      expect(result).toBe('не-дата');
    });

    it('должен возвращать пустую строку для пустого значения', () => {
      const result = service.formatDateIntl('');
      expect(result).toBe('');
    });

    it('должен использовать русскую локаль', () => {
      const date = '2024-01-15';
      const result = service.formatDateIntl(date);

      expect(result).toMatch(/\d{2}\.\d{2}\.\d{4}/);
    });
  });
});
