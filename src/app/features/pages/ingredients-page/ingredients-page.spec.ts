import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientsPage } from './ingredients-page';
import { IngredientTableState } from '../../../core/services/ingredient-table-state';
import { IngredientsPageService } from './services/ingredients-page.service';
import { Table } from '../../../core/components/table/table';
import { signal } from '@angular/core';

describe('IngredientsPage', () => {
  let component: IngredientsPage;
  let fixture: ComponentFixture<IngredientsPage>;

  beforeEach(() => {
    const mockIngredientTableState = {
      ingredientTableState: signal({ content: [] }),
      setIngredientTableState: () => {}
    };

    const mockIngredientsPageService = {
      transformIngredientsToTableData: () => [
        {
          id: 1,
          name: 'Корень мандрагоры',
          description: 'Основной компонент для зелий сна',
          price: 50,
          unit: 'шт.',
          category: 'Трава',
          color: '#8B4513'
        }
      ]
    };

    TestBed.configureTestingModule({
      imports: [IngredientsPage, Table],
    })
      .overrideComponent(IngredientsPage, {
        set: {
          providers: [
            { provide: IngredientTableState, useValue: mockIngredientTableState },
            { provide: IngredientsPageService, useValue: mockIngredientsPageService }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(IngredientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен иметь определенные данные заголовка таблицы', () => {
    expect(component.tableHeaderData).toBeDefined();
  });

  it('должен внедрять сервисы корректно', () => {
    const ingredientTableState = fixture.debugElement.injector.get(IngredientTableState);
    const ingredientsPageService = fixture.debugElement.injector.get(IngredientsPageService);

    expect(component.ingredientTableState).toBe(ingredientTableState);
    expect((component as any).ingredientsPageService).toBe(ingredientsPageService);
  });

  describe('ngOnInit', () => {
    it('должен вызывать initTableData когда состояние таблицы пустое', () => {
      let initTableDataCalled = false;
      const originalInitTableData = (component as any).initTableData;

      (component as any).initTableData = () => {
        initTableDataCalled = true;
        return originalInitTableData.call(component);
      };

      component.ngOnInit();
      expect(initTableDataCalled).toBe(true);
    });

    it('НЕ должен вызывать initTableData когда состояние таблицы уже имеет содержимое', () => {
      const mockTableStateWithContent = {
        ingredientTableState: signal({ content: [{ id: 1, name: 'Test' }] }),
        setIngredientTableState: () => {}
      };

      const mockIngredientsPageService = {
        transformIngredientsToTableData: () => []
      };

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [IngredientsPage, Table],
      })
        .overrideComponent(IngredientsPage, {
          set: {
            providers: [
              { provide: IngredientTableState, useValue: mockTableStateWithContent },
              { provide: IngredientsPageService, useValue: mockIngredientsPageService }
            ]
          }
        })
        .compileComponents();

      const newFixture = TestBed.createComponent(IngredientsPage);
      const newComponent = newFixture.componentInstance;
      newFixture.detectChanges();

      let initTableDataCalled = false;
      (newComponent as any).initTableData = () => {
        initTableDataCalled = true;
      };

      newComponent.ngOnInit();
      expect(initTableDataCalled).toBe(false);
    });
  });

  describe('шаблон', () => {
    it('должен отображать компонент таблицы', () => {
      const compiled = fixture.nativeElement;
      const tableElement = compiled.querySelector('app-table');
      expect(tableElement).toBeTruthy();
    });

    it('должен иметь контейнер', () => {
      const compiled = fixture.nativeElement;
      const container = compiled.querySelector('.container');
      expect(container).toBeTruthy();
    });
  });
});
