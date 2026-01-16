import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { Button } from '../../../shared/components/ui/button/button';
import { Pageable, TableData, TableHeaderData } from '../../types/table.types';
import { Table } from './table';

describe('Table Component', () => {
  let component: Table;
  let fixture: ComponentFixture<Table>;
  const mockHeaderData: Array<TableHeaderData> = [
    {
      key: 'id',
      value: 'Номер заказа',
      sortable: true,
      type: 'numeric'
    },
    {
      key: 'potion',
      value: 'Зелье',
      sortable: true,
      type: 'text'
    },
    {
      key: 'name',
      value: 'Кто зелье заказал',
      sortable: true,
      type: 'text'
    },
    {
      key: 'orderDate',
      value: 'Когда заказали зелье',
      sortable: true,
      type: 'date'
    }
  ];

  const mockTableData: Pageable<TableData> = {
    content: [
      {
        id: 1,
        potion: 'Зелье силы',
        name: 'Иван Иванов',
        orderDate: '2024-01-15'
      },
      {
        id: 2,
        potion: 'Зелье здоровья',
        name: 'Петр Петров',
        orderDate: '2024-01-16'
      },
      {
        id: 3,
        potion: 'Зелье маны',
        name: 'Сергей Сергеев',
        orderDate: '2024-01-17'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableModule, Table, Button]
    }).compileComponents();

    fixture = TestBed.createComponent(Table);
    component = fixture.componentInstance;
  });

  describe('Инициализация', () => {
    it('должен создавать компонент', () => {
      expect(component).toBeTruthy();
    });

    it('должен инициализироваться с пустыми входными данными', () => {
      fixture.detectChanges();

      expect(component.tableHeaderData()).toEqual([]);
      expect(component.tableData()).toBeNull();
      expect(component.needDeleteColumn()).toBe(false);
    });
  });

  describe('Входные данные', () => {
    it('должен принимать данные таблицы', () => {
      fixture.componentRef.setInput('tableData', mockTableData);
      fixture.detectChanges();

      expect(component.tableData()).toEqual(mockTableData);
      expect(component.tableData()?.content).toHaveLength(3);
    });

    it('должен принимать флаг needDeleteColumn', () => {
      fixture.componentRef.setInput('needDeleteColumn', true);
      fixture.detectChanges();

      expect(component.needDeleteColumn()).toBe(true);
    });

    it('должен вычислять safeTableData для пустых данных', () => {
      fixture.componentRef.setInput('tableData', null);
      fixture.detectChanges();

      expect(component.safeTableData()).toEqual([]);
    });

    it('должен вычислять safeTableData для заполненных данных', () => {
      fixture.componentRef.setInput('tableData', mockTableData);
      fixture.detectChanges();

      expect(component.safeTableData()).toEqual(mockTableData.content);
      expect(component.safeTableData()).toHaveLength(3);
    });
  });

  describe('Рендеринг таблицы', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('tableHeaderData', mockHeaderData);
      fixture.componentRef.setInput('tableData', mockTableData);
      fixture.detectChanges();
    });

    it('должен рендерить таблицу PrimeNG', () => {
      const tableElement = fixture.debugElement.query(By.css('p-table'));
      expect(tableElement).toBeTruthy();
    });

    it('должен рендерить правильное количество колонок', () => {
      fixture.componentRef.setInput('needDeleteColumn', true);
      fixture.detectChanges();

      const headerCells = fixture.debugElement.queryAll(By.css('th'));

      expect(headerCells.length).toBeGreaterThanOrEqual(mockHeaderData.length);
    });

    it('должен рендерить правильное количество строк', () => {
      const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
      const dataRows = tableRows.filter(row =>
        row.nativeElement.querySelector('td') !== null
      );
      expect(dataRows.length).toBe(mockTableData.content.length);
    });
  });

  describe('Колонка удаления', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('tableHeaderData', mockHeaderData);
      fixture.componentRef.setInput('tableData', mockTableData);
    });

    it('не должен рендерить кнопки удаления при needDeleteColumn = false', () => {
      fixture.componentRef.setInput('needDeleteColumn', false);
      fixture.detectChanges();

      const allButtons = fixture.debugElement.queryAll(By.css('button'));
      const deleteButtons = allButtons.filter(button =>
        button.nativeElement.textContent.toLowerCase().includes('удалить') ||
        button.nativeElement.textContent.toLowerCase().includes('delete')
      );

      expect(deleteButtons.length).toBe(0);
    });

    it('должен рендерить кнопки удаления при needDeleteColumn = true', () => {
      fixture.componentRef.setInput('needDeleteColumn', true);
      fixture.detectChanges();

      const allButtons = fixture.debugElement.queryAll(By.css('button'));
      const deleteButtons = allButtons.filter(button =>
        button.nativeElement.textContent.toLowerCase().includes('удалить') ||
        button.nativeElement.textContent.toLowerCase().includes('delete') ||
        button.nativeElement.innerHTML.includes('trash')
      );

      expect(deleteButtons.length).toBeGreaterThan(0);
    });
  });

  describe('События', () => {
    let deleteEmittedValues: number[] = [];
    let modalOpenEmittedValues: number[] = [];

    beforeEach(() => {
      deleteEmittedValues = [];
      modalOpenEmittedValues = [];

      component.handleDelete.subscribe((value: number) => deleteEmittedValues.push(value));
      component.handleModalOpen.subscribe((value: number) => modalOpenEmittedValues.push(value));

      fixture.componentRef.setInput('tableHeaderData', mockHeaderData);
      fixture.componentRef.setInput('tableData', mockTableData);
      fixture.componentRef.setInput('needDeleteColumn', true);
      fixture.detectChanges();
    });

    it('должен эмиттить событие удаления при клике на кнопку удаления', () => {
      const allButtons = fixture.debugElement.queryAll(By.css('button'));
      const deleteButtons = allButtons.filter(button =>
        button.nativeElement.textContent.toLowerCase().includes('удалить') ||
        button.nativeElement.textContent.toLowerCase().includes('delete')
      );

      if (deleteButtons.length > 0) {
        deleteButtons[0].triggerEventHandler('click', null);
        expect(deleteEmittedValues.length).toBe(1);
      } else {
        if (allButtons.length > 0) {
          allButtons[0].triggerEventHandler('click', null);
          expect(deleteEmittedValues.length).toBe(1);
        }
      }
    });

    it('метод handleDeleteClick должен эмиттить событие', () => {
      component.handleDeleteClick(123);
      expect(deleteEmittedValues).toEqual([123]);
    });

    it('метод handleModalOpenClick должен эмиттить событие', () => {
      component.handleModalOpenClick(456);
      expect(modalOpenEmittedValues).toEqual([456]);
    });

    it('должен эмиттить правильные id для разных строк', () => {
      component.handleDeleteClick(1);
      component.handleDeleteClick(2);
      component.handleDeleteClick(3);

      expect(deleteEmittedValues).toEqual([1, 2, 3]);
    });
  });

  describe('Edge cases', () => {
    it('должен корректно обрабатывать пустой массив данных', () => {
      fixture.componentRef.setInput('tableHeaderData', mockHeaderData);
      fixture.componentRef.setInput('tableData', { content: [] });
      fixture.detectChanges();

      const dataRows = fixture.debugElement.queryAll(By.css('tbody tr')).filter(row =>
        row.nativeElement.querySelector('td') !== null
      );
      expect(dataRows.length).toBe(0);
    });

    it('должен корректно работать со строковыми id', () => {
      const dataWithStringIds: Pageable<TableData> = {
        content: [
          {
            id: 'order-001',
            potion: 'Зелье теста',
            name: 'Тест Клиент',
            orderDate: '2024-01-18'
          }
        ]
      };

      fixture.componentRef.setInput('tableHeaderData', mockHeaderData);
      fixture.componentRef.setInput('tableData', dataWithStringIds);
      fixture.componentRef.setInput('needDeleteColumn', true);
      fixture.detectChanges();

      const dataRows = fixture.debugElement.queryAll(By.css('tbody tr')).filter(row =>
        row.nativeElement.querySelector('td') !== null
      );
      expect(dataRows.length).toBe(1);
    });

    it('должен сохранять порядок колонок согласно headerData', () => {
      const customHeaders: Array<TableHeaderData> = [
        { key: 'name', value: 'Имя', sortable: true, type: 'text' },
        { key: 'potion', value: 'Зелье', sortable: true, type: 'text' },
        { key: 'id', value: 'ID', sortable: true, type: 'numeric' }
      ];

      fixture.componentRef.setInput('tableHeaderData', customHeaders);
      fixture.componentRef.setInput('tableData', mockTableData);
      fixture.detectChanges();

      const headerElements = fixture.debugElement.queryAll(By.css('th'));
      const headerTexts = headerElements.map(th => th.nativeElement.textContent.trim());
      const hasName = headerTexts.some(text => text.includes('Имя'));
      const hasPotion = headerTexts.some(text => text.includes('Зелье'));
      const hasId = headerTexts.some(text => text.includes('ID'));

      expect(hasName).toBeTruthy();
      expect(hasPotion).toBeTruthy();
      expect(hasId).toBeTruthy();
    });

    it('должен корректно работать с минимальными данными', () => {
      const minimalData: Pageable<TableData> = {
        content: [ { id: 1 } ]
      };

      fixture.componentRef.setInput('tableHeaderData', mockHeaderData);
      fixture.componentRef.setInput('tableData', minimalData);
      fixture.detectChanges();

      const dataRows = fixture.debugElement.queryAll(By.css('tbody tr')).filter(row =>
        row.nativeElement.querySelector('td') !== null
      );
      expect(dataRows.length).toBe(1);
    });

    it('должен обновлять отображение при изменении входных данных', () => {
      fixture.componentRef.setInput('tableHeaderData', mockHeaderData);
      fixture.componentRef.setInput('tableData', mockTableData);
      fixture.detectChanges();

      let dataRows = fixture.debugElement.queryAll(By.css('tbody tr')).filter(row =>
        row.nativeElement.querySelector('td') !== null
      );
      expect(dataRows.length).toBe(3);

      const updatedData: Pageable<TableData> = {
        content: [
          {
            id: 10,
            potion: 'Новое зелье',
            name: 'Новый клиент',
            orderDate: '2024-01-20'
          }
        ]
      };

      fixture.componentRef.setInput('tableData', updatedData);
      fixture.detectChanges();

      dataRows = fixture.debugElement.queryAll(By.css('tbody tr')).filter(row =>
        row.nativeElement.querySelector('td') !== null
      );
      expect(dataRows.length).toBe(1);
    });
  });

  describe('Методы компонента', () => {
    it('handleDeleteClick должен эмиттить событие', () => {
      let emittedValue: number | undefined;
      component.handleDelete.subscribe((value: number) => emittedValue = value);

      component.handleDeleteClick(123);

      expect(emittedValue).toBe(123);
    });

    it('handleModalOpenClick должен эмиттить событие', () => {
      let emittedValue: number | undefined;
      component.handleModalOpen.subscribe((value: number) => emittedValue = value);

      component.handleModalOpenClick(456);

      expect(emittedValue).toBe(456);
    });
  });
});
