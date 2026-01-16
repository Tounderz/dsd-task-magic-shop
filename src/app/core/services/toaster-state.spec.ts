import { TestBed } from '@angular/core/testing';
import { ToasterState } from './toaster-state';
import { ToastConfig, ToastType } from '../types/toast.types';

describe('ToasterState', () => {
  let service: ToasterState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToasterState]
    });
    service = TestBed.inject(ToasterState);
    service.hideToast();
  });

  describe('Инициализация', () => {
    it('должен создавать сервис', () => {
      expect(service).toBeTruthy();
    });

    it('должен иметь начальное состояние null', () => {
      expect(service.toastState()).toBeNull();
    });
  });

  describe('Метод showToast', () => {
    it('должен устанавливать состояние тоста', () => {
      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Успешно сохранено!'
      };

      service.showToast(testConfig);
      expect(service.toastState()).toEqual(testConfig);
    });

    it('должен устанавливать duration по умолчанию если не указан', () => {
      const testConfig: ToastConfig = {
        type: 'error',
        message: 'Ошибка!'
      };

      service.showToast(testConfig);
      const state = service.toastState();
      expect(state).toEqual(testConfig);
      expect(state?.duration).toBeUndefined();
    });

    it('должен использовать переданную длительность', () => {
      const testConfig: ToastConfig = {
        type: 'warning',
        message: 'Предупреждение',
        duration: 5000
      };

      service.showToast(testConfig);
      const state = service.toastState();
      expect(state?.duration).toBe(5000);
    });

    it('должен перезаписывать предыдущий тост при показе нового', () => {
      const firstConfig: ToastConfig = {
        type: 'success',
        message: 'Первый тост',
        duration: 1000
      };

      const secondConfig: ToastConfig = {
        type: 'error',
        message: 'Второй тост',
        duration: 2000
      };

      service.showToast(firstConfig);
      expect(service.toastState()).toEqual(firstConfig);

      service.showToast(secondConfig);
      expect(service.toastState()).toEqual(secondConfig);
      expect(service.toastState()).not.toEqual(firstConfig);
    });

    it('должен работать со всеми типами тостов', () => {
      const toastTypes: ToastType[] = ['success', 'error', 'warning'];

      toastTypes.forEach(type => {
        const testConfig: ToastConfig = {
          type,
          message: `Сообщение типа ${type}`
        };

        service.showToast(testConfig);
        expect(service.toastState()?.type).toBe(type);
        expect(service.toastState()?.message).toBe(`Сообщение типа ${type}`);

        service.hideToast();
      });
    });

    it('должен корректно обрабатывать null/undefined в duration', () => {
      const config1: ToastConfig = {
        type: 'success',
        message: 'Без duration'
      };

      service.showToast(config1);
      expect(service.toastState()?.duration).toBeUndefined();

      const config2: ToastConfig = {
        type: 'error',
        message: 'С undefined duration',
        duration: undefined
      };

      service.showToast(config2);
      expect(service.toastState()?.duration).toBeUndefined();
    });
  });

  describe('Метод hideToast', () => {
    it('должен скрывать активный тост', () => {
      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Тестовый тост'
      };

      service.showToast(testConfig);
      expect(service.toastState()).toEqual(testConfig);

      service.hideToast();
      expect(service.toastState()).toBeNull();
    });

    it('должен безопасно вызываться когда нет активного тоста', () => {
      expect(service.toastState()).toBeNull();
      expect(() => {
        service.hideToast();
      }).not.toThrow();

      expect(service.toastState()).toBeNull();
    });

    it('должен позволять скрыть тост и сразу показать новый', () => {
      const firstConfig: ToastConfig = {
        type: 'success',
        message: 'Первый тост'
      };

      const secondConfig: ToastConfig = {
        type: 'error',
        message: 'Второй тост'
      };

      service.showToast(firstConfig);
      expect(service.toastState()).toEqual(firstConfig);

      service.hideToast();
      expect(service.toastState()).toBeNull();

      service.showToast(secondConfig);
      expect(service.toastState()).toEqual(secondConfig);
    });
  });

  describe('Сигнал toastState', () => {
    it('должен быть computed сигналом', () => {
      expect(typeof service.toastState).toBe('function');
      expect(service.toastState()).toBeNull();
    });

    it('должен обновляться при изменении состояния', () => {
      const testConfig: ToastConfig = {
        type: 'warning',
        message: 'Предупреждение!'
      };

      expect(service.toastState()).toBeNull();
      service.showToast(testConfig);
      expect(service.toastState()).toEqual(testConfig);
      service.hideToast();
      expect(service.toastState()).toBeNull();
    });

    it('должен возвращать полный конфиг тоста', () => {
      const testConfig: ToastConfig = {
        type: 'error',
        message: 'Ошибка соединения',
        duration: 5000
      };

      service.showToast(testConfig);

      const state = service.toastState();
      expect(state).toBeTruthy();
      expect(state?.type).toBe('error');
      expect(state?.message).toBe('Ошибка соединения');
      expect(state?.duration).toBe(5000);
    });

    it('должен быть реактивным (изменяться при вызове методов)', () => {
      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Тест'
      };
      const initialState = service.toastState();
      expect(initialState).toBeNull();

      service.showToast(testConfig);
      const afterShowState = service.toastState();
      expect(afterShowState).toEqual(testConfig);

      service.hideToast();
      const afterHideState = service.toastState();
      expect(afterHideState).toBeNull();
      expect(initialState).not.toEqual(afterShowState);
      expect(afterShowState).not.toEqual(afterHideState);
    });
  });

  describe('Типизация', () => {
    it('должен корректно типизировать тип тоста', () => {
      const validConfigs: ToastConfig[] = [
        { type: 'success', message: 'Успех' },
        { type: 'error', message: 'Ошибка' },
        { type: 'warning', message: 'Предупреждение' }
      ];

      validConfigs.forEach(config => {
        service.showToast(config);
        const state = service.toastState();

        expect(['success', 'error', 'warning']).toContain(state?.type);

        service.hideToast();
      });
    });

    it('должен опционально принимать duration', () => {
      const configs: ToastConfig[] = [
        { type: 'success', message: 'Без длительности' },
        { type: 'error', message: 'С длительностью', duration: 1000 },
        { type: 'warning', message: 'С нулевой длительностью', duration: 0 }
      ];

      configs.forEach(config => {
        service.showToast(config);
        const state = service.toastState();

        expect(state?.type).toBe(config.type);
        expect(state?.message).toBe(config.message);
        expect(state?.duration).toBe(config.duration);

        service.hideToast();
      });
    });
  });

  describe('Edge cases', () => {
    it('должен обрабатывать очень длинные сообщения', () => {
      const longMessage = 'Очень '.repeat(100) + 'длинное сообщение';
      const testConfig: ToastConfig = {
        type: 'success',
        message: longMessage
      };

      service.showToast(testConfig);
      expect(service.toastState()?.message).toBe(longMessage);
      expect(service.toastState()?.message.length).toBeGreaterThan(100);
    });

    it('должен корректно обрабатывать специальные символы в сообщении', () => {
      const specialMessage = 'Сообщение с "кавычками", <тегами> & символами';
      const testConfig: ToastConfig = {
        type: 'warning',
        message: specialMessage
      };

      service.showToast(testConfig);
      expect(service.toastState()?.message).toBe(specialMessage);
    });

    it('должен сохранять состояние между вызовами showToast', () => {
      const firstConfig: ToastConfig = {
        type: 'success',
        message: 'Первый',
        duration: 1000
      };

      const secondConfig: ToastConfig = {
        type: 'error',
        message: 'Второй',
        duration: 500
      };

      service.showToast(firstConfig);
      const state1 = service.toastState();
      expect(state1).toEqual(firstConfig);

      service.showToast(secondConfig);
      const state2 = service.toastState();
      expect(state2).toEqual(secondConfig);
      expect(state2).not.toEqual(firstConfig);
    });

    it('должен корректно обрабатывать быстрые вызовы hideToast', () => {
      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Тест'
      };

      service.hideToast();
      service.hideToast();
      service.hideToast();

      service.showToast(testConfig);
      service.hideToast();
      service.hideToast();

      expect(service.toastState()).toBeNull();
    });

    it('должен обрабатывать пустое сообщение', () => {
      const testConfig: ToastConfig = {
        type: 'success',
        message: ''
      };

      service.showToast(testConfig);
      expect(service.toastState()?.message).toBe('');
      expect(service.toastState()?.type).toBe('success');
    });
  });

  describe('Проверка таймеров (синхронные проверки)', () => {
    it('должен создавать таймер при showToast', () => {
      const originalSetTimeout = window.setTimeout;
      let setTimeoutCalled = false;
      let setTimeoutCallback: Function | null = null;
      let setTimeoutDelay: number | null = null;

      window.setTimeout = ((callback: Function, delay: number) => {
        setTimeoutCalled = true;
        setTimeoutCallback = callback;
        setTimeoutDelay = delay;
        return 0 as any;
      }) as any;

      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Тест',
        duration: 1000
      };

      service.showToast(testConfig);

      expect(setTimeoutCalled).toBe(true);
      expect(setTimeoutCallback).toBeInstanceOf(Function);
      expect(setTimeoutDelay).toBe(1000);

      window.setTimeout = originalSetTimeout;
    });

    it('должен использовать дефолтную длительность 3000ms если duration не указан', () => {
      const originalSetTimeout = window.setTimeout;
      let setTimeoutDelay: number | null = null;

      window.setTimeout = ((callback: Function, delay: number) => {
        setTimeoutDelay = delay;
        return 0 as any;
      }) as any;

      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Тест'
      };

      service.showToast(testConfig);

      expect(setTimeoutDelay).toBe(3000);

      window.setTimeout = originalSetTimeout;
    });
  });
});
