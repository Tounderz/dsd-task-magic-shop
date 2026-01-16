import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toaster } from './toaster';
import { ToasterState } from '../../../../core/services/toaster-state';
import { ToastConfig, ToastType } from '../../../../core/types/toast.types';

describe('ToasterComponent', () => {
  let component: Toaster;
  let fixture: ComponentFixture<Toaster>;
  let toasterState: ToasterState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toaster],
      providers: [ToasterState]
    }).compileComponents();

    fixture = TestBed.createComponent(Toaster);
    component = fixture.componentInstance;
    toasterState = TestBed.inject(ToasterState);
    toasterState.hideToast();
  });

  describe('Базовые тесты', () => {
    it('должен создавать компонент', () => {
      expect(component).toBeTruthy();
    });

    it('должен инжектить ToasterState', () => {
      expect(component.toasterState).toBe(toasterState);
    });
  });

  describe('Рендеринг', () => {
    it('не должен отображать тост при начальном состоянии', () => {
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement).toBeNull();
    });

    it('должен отображать тост когда есть состояние', () => {
      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Успешно!'
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement).toBeTruthy();
      expect(toastElement?.textContent?.trim()).toBe(testConfig.message);
    });

    it('должен применять класс типа тоста', () => {
      const testConfig: ToastConfig = {
        type: 'error',
        message: 'Ошибка!'
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement?.classList.contains('error')).toBe(true);
    });

    it('должен поддерживать все типы тостов', () => {
      const toastTypes: ToastType[] = ['success', 'error', 'warning'];

      toastTypes.forEach(type => {
        const config: ToastConfig = {
          type,
          message: `Сообщение типа ${type}`
        };

        toasterState.showToast(config);
        fixture.detectChanges();

        const toastElement = fixture.nativeElement.querySelector('.toast');
        expect(toastElement?.classList.contains(type)).toBe(true);
        expect(toastElement?.textContent?.trim()).toBe(`Сообщение типа ${type}`);

        toasterState.hideToast();
        fixture.detectChanges();
      });
    });

    it('должен скрывать тост когда состояние становится null', () => {
      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Тестовый тост'
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      let toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement).toBeTruthy();

      toasterState.hideToast();
      fixture.detectChanges();

      toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement).toBeNull();
    });
  });

  describe('Динамические изменения', () => {
    it('должен обновлять сообщение при изменении состояния', () => {
      const firstConfig: ToastConfig = {
        type: 'success',
        message: 'Первое сообщение'
      };

      const secondConfig: ToastConfig = {
        type: 'error',
        message: 'Второе сообщение'
      };

      toasterState.showToast(firstConfig);
      fixture.detectChanges();

      let toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement?.textContent?.trim()).toBe(firstConfig.message);
      expect(toastElement?.classList.contains('success')).toBe(true);

      toasterState.showToast(secondConfig);
      fixture.detectChanges();

      toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement?.textContent?.trim()).toBe(secondConfig.message);
      expect(toastElement?.classList.contains('error')).toBe(true);
      expect(toastElement?.classList.contains('success')).toBe(false);
    });

    it('должен обновлять тип тоста при изменении', () => {
      const config: ToastConfig = {
        type: 'warning',
        message: 'Сообщение'
      };

      toasterState.showToast(config);
      fixture.detectChanges();

      let toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement?.classList.contains('warning')).toBe(true);
      expect(toastElement?.classList.contains('success')).toBe(false);
      expect(toastElement?.classList.contains('error')).toBe(false);

      const newConfig: ToastConfig = {
        type: 'success',
        message: 'Новое сообщение'
      };

      toasterState.showToast(newConfig);
      fixture.detectChanges();

      toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement?.classList.contains('success')).toBe(true);
      expect(toastElement?.classList.contains('warning')).toBe(false);
    });
  });

  describe('Автоматическое скрытие (синхронная проверка)', () => {
    it('должен использовать таймер для скрытия тоста', () => {
      const originalSetTimeout = window.setTimeout;
      let setTimeoutCalled = false;
      let setTimeoutDelay: number | null = null;

      window.setTimeout = ((callback: Function, delay: number) => {
        setTimeoutCalled = true;
        setTimeoutDelay = delay;
        return 0 as any;
      }) as any;

      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Автоматическое скрытие',
        duration: 2000
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement).toBeTruthy();
      expect(setTimeoutCalled).toBe(true);
      expect(setTimeoutDelay).toBe(2000);

      window.setTimeout = originalSetTimeout;
    });

    it('должен использовать дефолтную длительность 3000ms если не указана', () => {
      const originalSetTimeout = window.setTimeout;
      let setTimeoutDelay: number | null = null;

      window.setTimeout = ((callback: Function, delay: number) => {
        setTimeoutDelay = delay;
        return 0 as any;
      }) as any;

      const testConfig: ToastConfig = {
        type: 'error',
        message: 'Без указания длительности'
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      expect(setTimeoutDelay).toBe(3000);

      window.setTimeout = originalSetTimeout;
    });
  });

  describe('Шаблон', () => {
    it('должен правильно отображать HTML шаблон', () => {
      const testConfig: ToastConfig = {
        type: 'warning',
        message: 'Простое сообщение'
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');

      expect(toastElement?.classList.contains('toast')).toBe(true);
      expect(toastElement?.classList.contains('warning')).toBe(true);
      expect(toastElement?.textContent?.trim()).toBe('Простое сообщение');
      expect(toastElement?.classList.contains('exiting')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('должен корректно работать с специальными символами в сообщении', () => {
      const specialMessage = 'Сообщение с "кавычками", <тегами> & амперсандами';
      const testConfig: ToastConfig = {
        type: 'error',
        message: specialMessage
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement?.textContent?.trim()).toBe(specialMessage);
    });

    it('должен корректно обрабатывать переносы строк в сообщении', () => {
      const multilineMessage = 'Первая строка\nВторая строка\nТретья строка';
      const testConfig: ToastConfig = {
        type: 'warning',
        message: multilineMessage
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement?.textContent).toContain('Первая строка');
      expect(toastElement?.textContent).toContain('Вторая строка');
    });
  });

  describe('Состояние шаблона', () => {
    it('должен использовать правильный синтаксис @if', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.toast')).toBeNull();

      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Тест'
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.toast')).toBeTruthy();
    });

    it('должен правильно биндить свойства через сигналы', () => {
      const testConfig: ToastConfig = {
        type: 'error',
        message: 'Тестовое сообщение'
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');

      expect(toastElement?.classList.contains('toast')).toBe(true);
      expect(toastElement?.classList.contains('error')).toBe(true);
      expect(toastElement?.textContent?.trim()).toBe('Тестовое сообщение');
    });

    it('должен правильно применять класс через [class] биндинг', () => {
      const testConfig: ToastConfig = {
        type: 'warning',
        message: 'Тест'
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');

      expect(toastElement?.classList.contains('warning')).toBe(true);
      expect(toastElement?.classList.contains('success')).toBe(false);
      expect(toastElement?.classList.contains('error')).toBe(false);
    });
  });

  describe('Проверка реактивности', () => {
    it('должен реагировать на изменения в ToasterState', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.toast')).toBeNull();

      const testConfig: ToastConfig = {
        type: 'success',
        message: 'Интеграционный тест'
      };

      toasterState.showToast(testConfig);
      fixture.detectChanges();

      const toastElement = fixture.nativeElement.querySelector('.toast');
      expect(toastElement).toBeTruthy();
      expect(toastElement?.textContent?.trim()).toBe(testConfig.message);

      toasterState.hideToast();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.toast')).toBeNull();
    });

    it('должен обновляться при быстрых изменениях состояния', () => {
      const configs: ToastConfig[] = [
        { type: 'error', message: 'Тост 2' },
        { type: 'warning', message: 'Тост 3' }
      ];

      configs.forEach(config => {
        toasterState.showToast(config);
        fixture.detectChanges();

        const toastElement = fixture.nativeElement.querySelector('.toast');
        expect(toastElement?.textContent?.trim()).toBe(config.message);
        expect(toastElement?.classList.contains(config.type)).toBe(true);
      });
    });
  });
});
