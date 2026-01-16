import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';
import { BtnVariant } from './types/button.types';

describe('ButtonComponent', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
  });

  describe('Базовые тесты', () => {
    it('должен создавать компонент', () => {
      expect(component).toBeTruthy();
    });

    it('должен иметь дефолтные значения', () => {
      fixture.detectChanges();
      expect(component.variant()).toBe('primary');
      expect(component.icon()).toBeUndefined();
      expect(component.iconPosition()).toBe('left');
      expect(component.disabled()).toBe(false);
      expect(component.fullWidth()).toBe(false);
    });
  });

  describe('CSS классы', () => {
    it('должен применять базовый класс btn', () => {
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.classList.contains('btn')).toBe(true);
      expect(buttonElement?.classList.contains('btn-primary')).toBe(true);
    });

    it('должен применять класс варианта кнопки', () => {
      const variants: BtnVariant[] = ['primary', 'success', 'warning', 'magic', 'danger'];

      variants.forEach(variant => {
        const testFixture = TestBed.createComponent(Button);
        testFixture.componentRef.setInput('variant', variant);
        testFixture.detectChanges();

        const buttonElement = testFixture.nativeElement.querySelector('button');
        expect(buttonElement?.classList.contains(`btn-${variant}`)).toBe(true);
      });
    });

    it('должен применять класс full-width когда fullWidth true', () => {
      fixture.componentRef.setInput('fullWidth', true);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.classList.contains('btn-full-width')).toBe(true);
    });

    it('должен применять класс disabled когда disabled true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.classList.contains('btn-disabled')).toBe(true);
      expect(buttonElement?.disabled).toBe(true);
    });

    it('должен комбинировать несколько модификаторов', () => {
      fixture.componentRef.setInput('fullWidth', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.classList.contains('btn-full-width')).toBe(true);
      expect(buttonElement?.classList.contains('btn-disabled')).toBe(true);
      expect(buttonElement?.classList.contains('btn-primary')).toBe(true);
    });
  });

  describe('Иконки', () => {
    const testIconUrl = 'test-icon.svg';

    it('не должен отрисовывать иконку когда она не передана', () => {
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      const iconElement = buttonElement?.querySelector('img');
      expect(iconElement).toBeNull();
    });

    it('должен отрисовывать иконку слева по умолчанию', () => {
      fixture.componentRef.setInput('icon', testIconUrl);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      const iconElement = buttonElement?.querySelector('img');
      expect(iconElement).toBeTruthy();
      expect(iconElement?.getAttribute('src')).toBe(testIconUrl);
    });

    it('должен отрисовывать иконку справа когда iconPosition = right', () => {
      fixture.componentRef.setInput('icon', testIconUrl);
      fixture.componentRef.setInput('iconPosition', 'right');
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      const iconElement = buttonElement?.querySelector('img');
      expect(iconElement).toBeTruthy();
    });

    it('не должен отрисовывать иконку для center позиции', () => {
      fixture.componentRef.setInput('icon', testIconUrl);
      fixture.componentRef.setInput('iconPosition', 'center');
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      const iconElement = buttonElement?.querySelector('img');
      expect(iconElement).toBeNull();
    });

    it('должен применять правильные классы для иконки', () => {
      fixture.componentRef.setInput('icon', testIconUrl);

      fixture.componentRef.setInput('iconPosition', 'left');
      fixture.detectChanges();
      const buttonElementLeft = fixture.nativeElement.querySelector('button');
      const iconElementLeft = buttonElementLeft?.querySelector('img');
      expect(iconElementLeft?.classList.contains('icon-left')).toBe(true);

      fixture.componentRef.setInput('iconPosition', 'right');
      fixture.detectChanges();
      const buttonElementRight = fixture.nativeElement.querySelector('button');
      const iconElementRight = buttonElementRight?.querySelector('img');
      expect(iconElementRight?.classList.contains('icon-right')).toBe(true);
    });

    it('должен иметь правильные размеры иконки', () => {
      fixture.componentRef.setInput('icon', testIconUrl);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      const iconElement = buttonElement?.querySelector('img');
      expect(iconElement?.getAttribute('width')).toBe('24');
      expect(iconElement?.getAttribute('height')).toBe('24');
    });
  });

  describe('Контент', () => {
    it('должен иметь span для контента', () => {
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      const textSpan = buttonElement?.querySelector('.btn-text');
      expect(textSpan).toBeTruthy();
      expect(textSpan?.classList.contains('btn-text')).toBe(true);
    });
  });

  describe('Состояние disabled', () => {
    it('должен иметь атрибут disabled когда disabled = true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.disabled).toBe(true);
      expect(buttonElement?.getAttribute('disabled')).toBe('');
    });

    it('не должен иметь атрибут disabled когда disabled = false', () => {
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.disabled).toBe(false);
      expect(buttonElement?.getAttribute('disabled')).toBeNull();
    });

    it('должен иметь класс btn-disabled когда disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.classList.contains('btn-disabled')).toBe(true);
    });
  });

  describe('Клик', () => {
    it('должен эмитить событие при клике когда не disabled', () => {
      let eventEmitted = false;

      fixture.componentRef.setInput('disabled', false);

      const subscription = component.handleBtnClick.subscribe(() => {
        eventEmitted = true;
      });

      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      buttonElement?.click();

      expect(eventEmitted).toBe(true);
      subscription.unsubscribe();
    });

    it('не должен эмитить событие при клике когда disabled', () => {
      let eventEmitted = false;

      fixture.componentRef.setInput('disabled', true);

      const subscription = component.handleBtnClick.subscribe(() => {
        eventEmitted = true;
      });

      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      buttonElement?.click();

      expect(eventEmitted).toBe(false);
      subscription.unsubscribe();
    });

    it('должен вызывать handleClick метод при клике', () => {
      let eventEmitted = false;
      const subscription = component.handleBtnClick.subscribe(() => {
        eventEmitted = true;
      });

      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      buttonElement?.click();

      expect(eventEmitted).toBe(true);
      subscription.unsubscribe();
      expect(component.handleClick).toBeDefined();
    });
  });

  describe('Вычисляемые сигналы', () => {
    it('btnClasses должен генерировать правильные классы', () => {
      fixture.detectChanges();
      const classes = component.btnClasses();
      expect(classes.includes('btn')).toBe(true);
      expect(classes.includes('btn-primary')).toBe(true);
    });

    it('btnClasses должен включать модификаторы', () => {
      fixture.componentRef.setInput('fullWidth', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const classes = component.btnClasses();
      expect(classes.includes('btn-full-width')).toBe(true);
      expect(classes.includes('btn-disabled')).toBe(true);
      expect(classes.includes('btn-primary')).toBe(true);
    });

    it('iconClasses должен генерировать правильные классы для иконки', () => {
      fixture.componentRef.setInput('icon', 'test.svg');
      fixture.componentRef.setInput('iconPosition', 'left');
      fixture.detectChanges();

      const iconClasses = component.iconClasses();
      expect(iconClasses.includes('btn-icon')).toBe(true);
      expect(iconClasses.includes('icon-left')).toBe(true);
    });
  });

  describe('Доступность', () => {
    it('должен иметь type="button"', () => {
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.getAttribute('type')).toBe('button');
    });

    it('должен иметь tabindex="-1"', () => {
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Порядок элементов', () => {
    it('должен размещать иконку слева от текста при iconPosition = left', () => {
      fixture.componentRef.setInput('icon', 'test.svg');
      fixture.componentRef.setInput('iconPosition', 'left');
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      const children = buttonElement?.children;

      if (children && children.length >= 2) {
        const firstChild = children[0] as HTMLElement;
        const secondChild = children[1] as HTMLElement;

        expect(firstChild.tagName).toBe('IMG');
        expect(secondChild.classList.contains('btn-text')).toBe(true);
      } else {
        expect(children?.length).toBeGreaterThanOrEqual(2);
      }
    });

    it('должен размещать иконку справа от текста при iconPosition = right', () => {
      fixture.componentRef.setInput('icon', 'test.svg');
      fixture.componentRef.setInput('iconPosition', 'right');
      fixture.detectChanges();

      const buttonElement = fixture.nativeElement.querySelector('button');
      const children = buttonElement?.children;

      if (children && children.length >= 2) {
        const firstChild = children[0] as HTMLElement;
        const secondChild = children[1] as HTMLElement;

        expect(firstChild.classList.contains('btn-text')).toBe(true);
        expect(secondChild.tagName).toBe('IMG');
      } else {
        expect(children?.length).toBeGreaterThanOrEqual(2);
      }
    });

    it('должен содержать только текст когда нет иконки', () => {
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      const children = buttonElement?.children;

      expect(children?.length).toBe(1);
      if (children && children.length > 0) {
        const textElement = children[0] as HTMLElement;
        expect(textElement.classList.contains('btn-text')).toBe(true);
      }
    });
  });

  describe('Динамические изменения', () => {
    it('должен обновлять классы при изменении variant', () => {
      fixture.detectChanges();
      let buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.classList.contains('btn-primary')).toBe(true);

      fixture.componentRef.setInput('variant', 'success');
      fixture.detectChanges();

      buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.classList.contains('btn-primary')).toBe(false);
      expect(buttonElement?.classList.contains('btn-success')).toBe(true);
    });

    it('должен обновлять disabled состояние динамически', () => {
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();
      let buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.disabled).toBe(false);

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement?.disabled).toBe(true);
    });

    it('должен динамически показывать/скрывать иконку', () => {
      fixture.detectChanges();
      let buttonElement = fixture.nativeElement.querySelector('button');
      let iconElement = buttonElement?.querySelector('img');
      expect(iconElement).toBeNull();

      fixture.componentRef.setInput('icon', 'test.svg');
      fixture.detectChanges();
      buttonElement = fixture.nativeElement.querySelector('button');
      iconElement = buttonElement?.querySelector('img');
      expect(iconElement).toBeTruthy();

      fixture.componentRef.setInput('icon', undefined);
      fixture.detectChanges();
      buttonElement = fixture.nativeElement.querySelector('button');
      iconElement = buttonElement?.querySelector('img');
      expect(iconElement).toBeNull();
    });
  });

  describe('btnClasses метод', () => {
    it('должен возвращать строку классов', () => {
      fixture.detectChanges();
      const classes = component.btnClasses();
      expect(typeof classes).toBe('string');
      expect(classes.includes('btn')).toBe(true);
    });

    it('должен корректно обрабатывать пустые модификаторы', () => {
      fixture.componentRef.setInput('fullWidth', false);
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();

      const classes = component.btnClasses();
      expect(classes.includes('btn')).toBe(true);
      expect(classes.includes('btn-primary')).toBe(true);
    });

    it('должен добавлять только активные модификаторы', () => {
      fixture.componentRef.setInput('fullWidth', true);
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();

      let classes = component.btnClasses();
      expect(classes.includes('btn-full-width')).toBe(true);
      expect(classes.includes('btn-disabled')).toBe(false);

      fixture.componentRef.setInput('fullWidth', false);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      classes = component.btnClasses();
      expect(classes.includes('btn-full-width')).toBe(false);
      expect(classes.includes('btn-disabled')).toBe(true);
    });
  });
});
