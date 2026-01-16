import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Select } from './select';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SelectData } from '../../../../core/types/select-data.types';

describe('SelectComponent', () => {
  let component: Select;
  let fixture: ComponentFixture<Select>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, Select],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Select);
    component = fixture.componentInstance;
  });

  describe('Базовые тесты', () => {
    it('должен создавать компонент', () => {
      expect(component).toBeTruthy();
    });

    it('должен иметь дефолтные значения', () => {
      fixture.detectChanges();
      expect(component.label()).toBe('');
      expect(component.options()).toEqual([]);
      expect(component.selectedValue()).toBe('');
      expect(component.searchTerm).toBe('');
      expect(component.showOptions()).toBe(false);
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

    it('должен добавлять класс options-open при открытых опциях', () => {
      component.showOptions.set(true);
      fixture.detectChanges();

      const wrapperElement = fixture.nativeElement.querySelector('.input-wrapper');
      expect(wrapperElement?.classList.contains('options-open')).toBe(true);
    });

    it('не должен добавлять класс options-open при закрытых опциях', () => {
      component.showOptions.set(false);
      fixture.detectChanges();

      const wrapperElement = fixture.nativeElement.querySelector('.input-wrapper');
      expect(wrapperElement?.classList.contains('options-open')).toBe(false);
    });
  });

  describe('Входные параметры', () => {
    it('должен устанавливать label', () => {
      const testLabel = 'Выберите опцию';
      fixture.componentRef.setInput('label', testLabel);
      fixture.detectChanges();

      const labelElement = fixture.nativeElement.querySelector('.label');
      expect(labelElement?.textContent).toBe(testLabel);
    });

    it('должен устанавливать options', () => {
      const testOptions: SelectData[] = [
        { name: 'Опция 1', label: '1' },
        { name: 'Опция 2', label: '2' }
      ];

      fixture.componentRef.setInput('options', testOptions);
      fixture.detectChanges();

      expect(component.options()).toEqual(testOptions);
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

  describe('Метод handleInputChange', () => {
    it('должен обновлять searchTerm', () => {
      const testValue = 'test search';
      component.handleInputChange(testValue);
      expect(component.searchTerm).toBe(testValue);
    });
  });

  describe('Метод getOptions', () => {
    const mockOptions: SelectData[] = [
      { name: 'JavaScript', label: 'JavaScript' },
      { name: 'TypeScript', label: 'TypeScript' },
      { name: 'Angular', label: 'Angular' }
    ];

    beforeEach(() => {
      fixture.componentRef.setInput('options', mockOptions);
      fixture.detectChanges();
    });

    it('должен возвращать все опции если searchTerm пустой', () => {
      component.searchTerm = '';
      const result = component.getOptions();
      expect(result).toEqual(mockOptions);
    });

    it('должен фильтровать опции по searchTerm', () => {
      component.searchTerm = 'Script';
      const result = component.getOptions();
      expect(result).toEqual([
        { name: 'JavaScript', label: 'JavaScript' },
        { name: 'TypeScript', label: 'TypeScript' }
      ]);
    });

    it('должен фильтровать по label с учетом регистра', () => {
      component.searchTerm = 'TYPESCRIPT';
      const result = component.getOptions();
      expect(result).toEqual([
        { name: 'TypeScript', label: 'TypeScript' }
      ]);
    });

    it('должен возвращать пустой массив если options пустой', () => {
      fixture.componentRef.setInput('options', []);
      fixture.detectChanges();

      component.searchTerm = 'test';
      const result = component.getOptions();
      expect(result).toEqual([]);
    });
  });

  describe('Метод selectOption', () => {
    const mockOption: SelectData = { name: 'Test Option', label: 'test-label' };

    it('должен обновлять displayValue', () => {
      component.selectOption(mockOption);
      expect(component.displayValue()).toBe('test-label');
    });

    it('должен эмитить событие valueChange', () => {
      let emittedValue: SelectData | undefined;
      const subscription = component.valueChange.subscribe((value) => {
        emittedValue = value;
      });

      component.selectOption(mockOption);

      expect(emittedValue).toEqual(mockOption);
      subscription.unsubscribe();
    });

    it('должен закрывать опции', () => {
      component.showOptions.set(true);
      component.selectOption(mockOption);

      expect(component.showOptions()).toBe(false);
    });
  });

  describe('Метод onBlur', () => {
    it('должен закрывать опции', () => {
      component.showOptions.set(true);
      component.onBlur();

      expect(component.showOptions()).toBe(false);
    });
  });

  describe('Метод toggleOptions', () => {
    it('должен открывать опции если они закрыты', () => {
      component.showOptions.set(false);
      component.toggleOptions();

      expect(component.showOptions()).toBe(true);
    });

    it('должен закрывать опции если они открыты', () => {
      component.showOptions.set(true);
      component.toggleOptions();

      expect(component.showOptions()).toBe(false);
    });
  });

  describe('События DOM', () => {
    it('должен открывать опции при фокусе на input', () => {
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');

      component.showOptions.set(false);
      inputElement?.dispatchEvent(new Event('focus'));

      expect(component.showOptions()).toBe(true);
    });

    it('должен закрывать опции при blur с input', () => {
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');

      component.showOptions.set(true);
      inputElement?.dispatchEvent(new Event('blur'));

      expect(component.showOptions()).toBe(false);
    });

    it('должен обновлять searchTerm при изменении значения', () => {
      fixture.detectChanges();

      component.handleInputChange('test value');

      expect(component.searchTerm).toBe('test value');
    });
  });

  describe('Эффект displayValueEffect', () => {
    it('должен обновлять displayValue при изменении selectedValue', () => {
      fixture.componentRef.setInput('selectedValue', 'initial');
      fixture.detectChanges();
      expect(component.displayValue()).toBe('initial');

      fixture.componentRef.setInput('selectedValue', 'updated');
      fixture.detectChanges();
      expect(component.displayValue()).toBe('updated');
    });

    it('должен работать с пустым selectedValue', () => {
      fixture.componentRef.setInput('selectedValue', '');
      fixture.detectChanges();
      expect(component.displayValue()).toBe('');
    });
  });

  describe('Рендеринг опций', () => {
    const mockOptions: SelectData[] = [
      { name: 'Option 1', label: 'Option 1' },
      { name: 'Option 2', label: 'Option 2' }
    ];

    beforeEach(() => {
      fixture.componentRef.setInput('options', mockOptions);
      component.showOptions.set(true);
      fixture.detectChanges();
    });

    it('должен отображать контейнер опций при showOptions = true', () => {
      const optionsContainer = fixture.nativeElement.querySelector('.select-options');
      expect(optionsContainer).toBeTruthy();
    });

    it('не должен отображать контейнер опций при showOptions = false', () => {
      component.showOptions.set(false);
      fixture.detectChanges();

      const optionsContainer = fixture.nativeElement.querySelector('.select-options');
      expect(optionsContainer).toBeFalsy();
    });

    it('должен добавлять класс selected для выбранной опции', () => {
      component.displayValue.set('Option 1');
      fixture.detectChanges();

      const optionElements = fixture.nativeElement.querySelectorAll('.option');
      expect(optionElements[0].classList.contains('selected')).toBe(true);
      expect(optionElements[1].classList.contains('selected')).toBe(false);
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

    it('должен обновлять options динамически', () => {
      const initialOptions: SelectData[] = [{ name: 'Initial', label: '1' }];
      const updatedOptions: SelectData[] = [
        { name: 'Updated 1', label: '1' },
        { name: 'Updated 2', label: '2' }
      ];

      fixture.componentRef.setInput('options', initialOptions);
      fixture.detectChanges();
      expect(component.options()).toEqual(initialOptions);

      fixture.componentRef.setInput('options', updatedOptions);
      fixture.detectChanges();
      expect(component.options()).toEqual(updatedOptions);
    });
  });

  describe('Взаимодействие с пользователем', () => {
    it('должен выбирать опцию по клику и эмитить событие', () => {
      const options: SelectData[] = [
        { name: 'Option 1', label: 'label1' },
        { name: 'Option 2', label: 'label2' }
      ];

      fixture.componentRef.setInput('options', options);
      component.showOptions.set(true);
      fixture.detectChanges();

      let emittedValue: SelectData | undefined;
      const subscription = component.valueChange.subscribe((value) => {
        emittedValue = value;
      });

      const optionElements = fixture.nativeElement.querySelectorAll('.option');
      optionElements[1].dispatchEvent(new Event('mousedown'));

      expect(emittedValue).toEqual({ name: 'Option 2', label: 'label2' });
      expect(component.displayValue()).toBe('label2');
      expect(component.showOptions()).toBe(false);

      subscription.unsubscribe();
    });
  });
});
