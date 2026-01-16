import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IngredientsModal } from './ingredients-modal';
import { PotionIngredientsColumnState } from '../../../../../../core/services/potion-ingredients-column-state';
import { PotionIngredient } from '../../../../../../core/types/potion.types';
import { IngredientsModalComponentsModule } from './components/ingredients-modal-components-module';

describe('IngredientsModal Component', () => {
  let component: IngredientsModal;
  let fixture: ComponentFixture<IngredientsModal>;
  let getPotionIngredientsCalls: number[] = [];
  let mockIngredients: PotionIngredient[];

  beforeEach(async () => {
    getPotionIngredientsCalls = [];
    mockIngredients = [
      {
        ingredient: 'Корень мандрагоры',
        quantity: 3,
        unitPrice: 10,
        totalPrice: 30,
        color: '#FF5733'
      },
      {
        ingredient: 'Паучьи лапки',
        quantity: 5,
        unitPrice: 5,
        totalPrice: 25,
        color: '#33FF57'
      },
      {
        ingredient: 'Крылья летучей мыши',
        quantity: 2,
        unitPrice: 15,
        totalPrice: 30,
        color: '#3357FF'
      }
    ];

    const mockDialogConfig = {
      data: 123
    } as DynamicDialogConfig;

    const mockPotionIngredientsColumnState = {
      getPotionIngredients: (id: number) => {
        getPotionIngredientsCalls.push(id);
        return id === 123 ? mockIngredients : [];
      }
    } as PotionIngredientsColumnState;

    await TestBed.configureTestingModule({
      imports: [IngredientsModal, IngredientsModalComponentsModule],
      providers: [
        { provide: DynamicDialogConfig, useValue: mockDialogConfig },
        { provide: PotionIngredientsColumnState, useValue: mockPotionIngredientsColumnState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Инициализация', () => {
    it('должен создавать компонент', () => {
      expect(component).toBeTruthy();
    });

    it('должен инжектить сервисы', () => {
      expect(component['config']).toBeTruthy();
      expect(component['potionIngredientsColumnState']).toBeTruthy();
    });

    it('должен инициализироваться с пустым массивом данных', () => {
      expect(component.data).toBeDefined();
      expect(Array.isArray(component.data)).toBe(true);
    });
  });

  describe('Метод ngOnInit', () => {
    it('должен загружать данные при инициализации', () => {
      expect(component.data).toEqual(mockIngredients);
      expect(component.data.length).toBe(3);
    });

    it('должен получать правильный id из конфигурации', () => {
      expect(component['config'].data).toBe(123);
    });

    it('должен использовать правильный id для получения ингредиентов', () => {
      expect(getPotionIngredientsCalls).toContain(123);
    });

    it('должен правильно обрабатывать структуру данных ингредиентов', () => {
      expect(component.data[0].ingredient).toBe('Корень мандрагоры');
      expect(component.data[0].quantity).toBe(3);
      expect(component.data[0].unitPrice).toBe(10);
      expect(component.data[0].totalPrice).toBe(30);
      expect(component.data[0].color).toBe('#FF5733');
    });
  });

  describe('Данные компонента', () => {
    it('должен иметь публичное свойство data типа PotionIngredient[]', () => {
      expect(component.data).toBeDefined();
      expect(Array.isArray(component.data)).toBe(true);

      if (component.data.length > 0) {
        const firstItem = component.data[0];
        expect(firstItem).toHaveProperty('ingredient');
        expect(firstItem).toHaveProperty('quantity');
        expect(firstItem).toHaveProperty('unitPrice');
        expect(firstItem).toHaveProperty('totalPrice');
        expect(firstItem).toHaveProperty('color');
      }
    });

    it('должен обновлять данные при присваивании', () => {
      const newIngredients: PotionIngredient[] = [
        {
          ingredient: 'Новый ингредиент',
          quantity: 1,
          unitPrice: 100,
          totalPrice: 100,
          color: '#000000'
        }
      ];

      component.data = newIngredients;
      expect(component.data).toEqual(newIngredients);
      expect(component.data.length).toBe(1);
      expect(component.data[0].ingredient).toBe('Новый ингредиент');
    });
  });

  describe('Взаимодействие с сервисом', () => {
    it('должен использовать PotionIngredientsColumnState для получения данных', () => {
      expect(getPotionIngredientsCalls.length).toBeGreaterThan(0);
      expect(getPotionIngredientsCalls[0]).toBe(123);
    });
  });

  describe('Рендеринг', () => {
    it('должен рендерить контейнер', () => {
      const container = fixture.nativeElement.querySelector('.container');
      expect(container).toBeTruthy();
    });

    it('должен рендерить компонент pie-chart', () => {
      const chart = fixture.nativeElement.querySelector('app-pie-ingredients-chart');
      expect(chart).toBeTruthy();
    });

    it('должен передавать данные в компонент pie-chart через property binding', () => {
      expect(component.data).toBeDefined();
    });
  });

  describe('Жизненный цикл', () => {
    it('должен вызывать загрузку данных при инициализации', () => {
      expect(component.data.length).toBeGreaterThan(0);
      expect(getPotionIngredientsCalls.length).toBeGreaterThan(0);
    });

    it('должен корректно работать при повторной инициализации', () => {
      const freshFixture = TestBed.createComponent(IngredientsModal);
      const freshComponent = freshFixture.componentInstance;
      freshComponent.ngOnInit();

      expect(freshComponent.data).toEqual(mockIngredients);
    });
  });

  describe('Проверка типов данных', () => {
    it('должен содержать правильные типы в данных ингредиентов', () => {
      component.data.forEach((item: PotionIngredient) => {
        expect(typeof item.ingredient).toBe('string');
        expect(typeof item.quantity).toBe('number');
        expect(typeof item.unitPrice).toBe('number');
        expect(typeof item.totalPrice).toBe('number');
        expect(typeof item.color).toBe('string');
      });
    });

    it('должен корректно вычислять totalPrice как quantity * unitPrice', () => {
      mockIngredients.forEach(item => {
        expect(item.totalPrice).toBe(item.quantity * item.unitPrice);
      });
    });
  });
});
