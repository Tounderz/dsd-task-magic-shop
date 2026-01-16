import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieIngredientsChart } from './pie-ingredients-chart';
import { PotionIngredient } from '../../../../../../../../../core/types/potion.types';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {IngredientsModalComponentsModule} from '../../ingredients-modal-components-module';

describe('PieIngredientsChart', () => {
  let component: PieIngredientsChart;
  let fixture: ComponentFixture<PieIngredientsChart>;

  const mockIngredients: PotionIngredient[] = [
    {
      ingredient: 'Тестовый ингредиент',
      quantity: 5,
      unitPrice: 10,
      totalPrice: 50,
      color: '#FF0000'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsModalComponentsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PieIngredientsChart);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ingredients', mockIngredients);

    fixture.detectChanges();
  });

  describe('Базовые тесты', () => {
    it('должен создавать компонент', () => {
      expect(component).toBeTruthy();
    });

    it('должен принимать входные данные', () => {
      expect(component.ingredients()).toEqual(mockIngredients);
    });

    it('должен инициализировать график', () => {
      component.ngOnInit();
      expect(component.chartData).toBeDefined();
    });
  });

  describe('Логика графика', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('должен создавать labels из названий ингредиентов', () => {
      expect(component.chartData?.labels).toEqual(['Тестовый ингредиент']);
    });

    it('должен создавать data из количеств', () => {
      expect(component.chartData?.datasets?.[0]?.data).toEqual([5]);
    });

    it('должен создавать colors из цветов ингредиентов', () => {
      expect(component.chartData?.datasets?.[0]?.backgroundColor).toEqual(['#FF0000']);
    });
  });
});
