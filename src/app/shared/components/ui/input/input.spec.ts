import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Input } from './input';

describe('InputComponent', () => {
  let component: Input;
  let fixture: ComponentFixture<Input>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Input]
    }).compileComponents();

    fixture = TestBed.createComponent(Input);
    component = fixture.componentInstance;
  });

  describe('Базовые тесты', () => {
    it('должен создавать компонент', () => {
      expect(component).toBeTruthy();
    });

    it('должен иметь дефолтные значения', () => {
      fixture.detectChanges();
      expect(component.label()).toBe('');
      expect(component.value()).toBe('');
      expect(component.inputType()).toBe('text');
    });
  });

  describe('Рендеринг', () => {
    it('должен отображать input элемент', () => {
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement).toBeTruthy();
      expect(inputElement?.classList.contains('input')).toBe(true);
    });

    it('должен иметь wrapper div', () => {
      fixture.detectChanges();
      const wrapperElement = fixture.nativeElement.querySelector('.input-wrapper');
      expect(wrapperElement).toBeTruthy();
    });

    it('должен отображать label span', () => {
      fixture.detectChanges();
      const labelElement = fixture.nativeElement.querySelector('.label');
      expect(labelElement).toBeTruthy();
    });
  });

  describe('Входные параметры', () => {
    it('должен устанавливать label', () => {
      const testLabel = 'Имя пользователя';
      fixture.componentRef.setInput('label', testLabel);
      fixture.detectChanges();

      const labelElement = fixture.nativeElement.querySelector('.label');
      expect(labelElement?.textContent).toBe(testLabel);
    });

    it('должен устанавливать value', () => {
      const testValue = 'test@example.com';
      fixture.componentRef.setInput('value', testValue);
      fixture.detectChanges();

      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.value).toBe(testValue);
    });

    it('должен устанавливать числовое value', () => {
      const testValue = 123;
      fixture.componentRef.setInput('value', testValue);
      fixture.detectChanges();

      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.value).toBe('123');
    });

    it('должен устанавливать inputType', () => {
      const testType = 'email';
      fixture.componentRef.setInput('inputType', testType);
      fixture.detectChanges();

      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.getAttribute('type')).toBe(testType);
    });

    it('должен поддерживать разные типы input', () => {
      const types = ['text', 'email', 'password', 'number', 'tel'];

      types.forEach(type => {
        const testFixture = TestBed.createComponent(Input);
        testFixture.componentRef.setInput('inputType', type);
        testFixture.detectChanges();

        const inputElement = testFixture.nativeElement.querySelector('input');
        expect(inputElement?.getAttribute('type')).toBe(type);
      });
    });
  });

  describe('Атрибуты', () => {
    it('должен иметь placeholder с пробелом', () => {
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.getAttribute('placeholder')).toBe(' ');
    });

    it('должен иметь tabindex="-1"', () => {
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.getAttribute('tabindex')).toBe('-1');
    });

    it('должен иметь класс input', () => {
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.classList.contains('input')).toBe(true);
    });
  });

  describe('События', () => {
    it('должен эмитить значение при изменении (blur)', () => {
      let emittedValue = '';
      const subscription = component.valueChange.subscribe((value) => {
        emittedValue = value;
      });

      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');

      inputElement.value = 'новое значение';
      inputElement.dispatchEvent(new Event('blur'));

      expect(emittedValue).toBe('новое значение');
      subscription.unsubscribe();
    });

    it('должен обрабатывать пустое значение', () => {
      let emittedValue = '';
      const subscription = component.valueChange.subscribe((value) => {
        emittedValue = value;
      });

      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');

      inputElement.value = '';
      inputElement.dispatchEvent(new Event('blur'));

      expect(emittedValue).toBe('');
      subscription.unsubscribe();
    });

    it('должен обрабатывать изменение с пробелами', () => {
      let emittedValue = '';
      const subscription = component.valueChange.subscribe((value) => {
        emittedValue = value;
      });

      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');

      inputElement.value = '  значение с пробелами  ';
      inputElement.dispatchEvent(new Event('blur'));

      expect(emittedValue).toBe('  значение с пробелами  ');
      subscription.unsubscribe();
    });
  });

  describe('Метод handleChange', () => {
    it('должен извлекать значение из target', () => {
      const mockInput = document.createElement('input');
      mockInput.value = 'test value';

      const mockEvent = { target: mockInput } as unknown as Event;

      let emittedValue = '';
      const subscription = component.valueChange.subscribe((value) => {
        emittedValue = value;
      });

      component.handleChange(mockEvent);

      expect(emittedValue).toBe('test value');
      subscription.unsubscribe();
    });

    it('должен правильно приводить тип target', () => {
      const mockInput = document.createElement('input');
      mockInput.value = '123';

      const mockEvent = { target: mockInput } as unknown as Event;

      let emittedValue = '';
      const subscription = component.valueChange.subscribe((value) => {
        emittedValue = value;
      });

      component.handleChange(mockEvent);

      expect(emittedValue).toBe('123');
      expect(typeof emittedValue).toBe('string');
      subscription.unsubscribe();
    });
  });

  describe('Динамические изменения', () => {
    it('должен обновлять label динамически', () => {
      fixture.detectChanges();
      let labelElement = fixture.nativeElement.querySelector('.label');
      expect(labelElement?.textContent).toBe('');

      fixture.componentRef.setInput('label', 'Новый заголовок');
      fixture.detectChanges();

      labelElement = fixture.nativeElement.querySelector('.label');
      expect(labelElement?.textContent).toBe('Новый заголовок');
    });

    it('должен обновлять value динамически', () => {
      fixture.detectChanges();
      let inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.value).toBe('');

      fixture.componentRef.setInput('value', 'новое значение');
      fixture.detectChanges();

      inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.value).toBe('новое значение');
    });

    it('должен обновлять type динамически', () => {
      fixture.detectChanges();
      let inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.getAttribute('type')).toBe('text');

      fixture.componentRef.setInput('inputType', 'password');
      fixture.detectChanges();

      inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.getAttribute('type')).toBe('password');
    });
  });

  describe('Интеграция с FormsModule', () => {
    it('должен корректно работать с двусторонней привязкой', () => {
      const testFixture = TestBed.createComponent(Input);
      const testComponent = testFixture.componentInstance;

      testFixture.componentRef.setInput('value', 'начальное');
      testFixture.detectChanges();

      const inputElement = testFixture.nativeElement.querySelector('input');
      expect(inputElement?.value).toBe('начальное');

      inputElement.value = 'измененное';
      inputElement.dispatchEvent(new Event('blur'));

      let emittedValue = '';
      const subscription = testComponent.valueChange.subscribe((value) => {
        emittedValue = value;
      });

      inputElement.dispatchEvent(new Event('blur'));

      expect(emittedValue).toBe('измененное');
      subscription.unsubscribe();
    });

    it('должен поддерживать реактивные обновления', () => {
      const testFixture = TestBed.createComponent(Input);
      const testComponent = testFixture.componentInstance;

      const emittedValues: string[] = [];
      const subscription = testComponent.valueChange.subscribe((value) => {
        emittedValues.push(value);
      });

      testFixture.detectChanges();
      const inputElement = testFixture.nativeElement.querySelector('input');

      inputElement.value = 'первое';
      inputElement.dispatchEvent(new Event('blur'));

      inputElement.value = 'второе';
      inputElement.dispatchEvent(new Event('blur'));

      inputElement.value = 'третье';
      inputElement.dispatchEvent(new Event('blur'));

      expect(emittedValues).toEqual(['первое', 'второе', 'третье']);
      subscription.unsubscribe();
    });
  });

  describe('Edge cases', () => {
    it('должен обрабатывать очень длинные значения', () => {
      const longValue = 'a'.repeat(1000);
      fixture.componentRef.setInput('value', longValue);
      fixture.detectChanges();

      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.value).toBe(longValue);
    });

    it('должен обрабатывать специальные символы', () => {
      const specialValue = 'test@example.com!@#$%^&*()_+{}|:"<>?';
      fixture.componentRef.setInput('value', specialValue);
      fixture.detectChanges();

      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement?.value).toBe(specialValue);
    });

    it('должен работать с пустым label', () => {
      fixture.componentRef.setInput('label', '');
      fixture.detectChanges();

      const labelElement = fixture.nativeElement.querySelector('.label');
      expect(labelElement?.textContent).toBe('');
    });

    it('должен сохранять пробел в placeholder', () => {
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');

      expect(inputElement?.getAttribute('placeholder')).toBe(' ');
      expect(inputElement?.getAttribute('placeholder')).not.toBe('');
    });

    it('должен обрабатывать разные типы данных в value', () => {
      const testCases = [
        { input: 'строка', expected: 'строка' },
        { input: 123, expected: '123' },
        { input: 0, expected: '0' },
        { input: true, expected: 'true' },
        { input: false, expected: 'false' },
      ];

      testCases.forEach(({ input, expected }) => {
        const testFixture = TestBed.createComponent(Input);
        testFixture.componentRef.setInput('value', input as any);
        testFixture.detectChanges();

        const inputElement = testFixture.nativeElement.querySelector('input');
        expect(inputElement?.value).toBe(expected);
      });
    });
  });

  describe('Валидация типов', () => {
    it('должен правильно типизировать value сигнал', () => {
      fixture.componentRef.setInput('value', 'строка');
      fixture.detectChanges();
      expect(typeof component.value()).toBe('string');

      fixture.componentRef.setInput('value', 123);
      fixture.detectChanges();
      expect(typeof component.value()).toBe('number');
    });

    it('должен правильно типизировать inputType сигнал', () => {
      fixture.componentRef.setInput('inputType', 'email');
      fixture.detectChanges();
      expect(component.inputType()).toBe('email');

      fixture.componentRef.setInput('inputType', 'password');
      fixture.detectChanges();
      expect(component.inputType()).toBe('password');
    });
  });
});
