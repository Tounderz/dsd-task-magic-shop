import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersPage } from './orders-page';
import { OrderTableState } from '../../../core/services/order-table-state';
import { DialogService } from 'primeng/dynamicdialog';
import { ToasterState } from '../../../core/services/toaster-state';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrdersPage', () => {
  let component: OrdersPage;
  let fixture: ComponentFixture<OrdersPage>;

  let removeOrderCalled = false;
  let removeOrderId: number | null = null;

  beforeEach(async () => {
    removeOrderCalled = false;
    removeOrderId = null;

    const mockOrderTableState = {
      orderTableState: () => ({ content: [] }),
      removeOrder: (id: number) => {
        removeOrderCalled = true;
        removeOrderId = id;
      }
    };

    const mockDialogService = {};

    const mockToasterState = {};

    await TestBed.configureTestingModule({
      imports: [OrdersPage],
      providers: [
        { provide: OrderTableState, useValue: mockOrderTableState },
        { provide: DialogService, useValue: mockDialogService },
        { provide: ToasterState, useValue: mockToasterState }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен иметь tableHeaderData', () => {
    expect(component.tableHeaderData).toBeDefined();
  });

  describe('handleDelete', () => {
    it('должен вызывать удаление заказа с правильным id', () => {
      component.handleDelete(123);

      expect(removeOrderCalled).toBe(true);
      expect(removeOrderId).toBe(123);
    });

    it('должен обрабатывать несколько удалений', () => {
      component.handleDelete(1);
      component.handleDelete(2);
      component.handleDelete(3);

      expect(removeOrderCalled).toBe(true);
      expect(removeOrderId).toBe(3);
    });
  });
});
