import {Component, inject} from '@angular/core';
import {Button} from "../../../shared/components/ui/button/button";
import {Table} from "../../../core/components/table/table";
import {OrderTableState} from '../../../core/services/order-table-state';
import {DialogService} from 'primeng/dynamicdialog';
import {tableHeaderData} from './configs/orders-page-config';
import {OrderPotionModal} from './components/modals/order-potion-modal/order-potion-modal';
import {ToasterState} from '../../../core/services/toaster-state';

@Component({
  selector: 'app-orders-page',
  imports: [
    Button,
    Table
  ],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
  providers: [ DialogService ]
})
export class OrdersPage {
  public orderTableState: OrderTableState = inject(OrderTableState);
  private dialogService: DialogService = inject(DialogService);
  private toasterState: ToasterState = inject(ToasterState);

  public readonly tableHeaderData = tableHeaderData;

  public handleOpenOrderModal() {
    const dynamicDialogRef = this.dialogService.open(OrderPotionModal, {
      header: 'Заказать зелье',
      width: '360px',
      closable: true,
      closeOnEscape: true,
      dismissableMask: true
    });

    dynamicDialogRef?.onClose.subscribe((result) => {
      result === 'success' &&
        this.toasterState.showToast({
          message: 'Заказ успешно создан.',
          type: 'success',
          duration: 3000
        });
    });
  }

  public handleDelete(id: number): void {
    this.orderTableState.removeOrder(id);
  }
}
