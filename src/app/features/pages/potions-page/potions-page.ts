import {Component, inject} from '@angular/core';
import {Button} from '../../../shared/components/ui/button/button';
import {Table} from '../../../core/components/table/table';
import {DialogService} from 'primeng/dynamicdialog';
import {ToasterState} from '../../../core/services/toaster-state';
import {CreatePotionModal} from './components/modals/create-potion-modal/create-potion-modal';
import {tableHeaderData} from './configs/potions-page-config';
import {PotionTableState} from '../../../core/services/potion-table-state';
import {OrderTableState} from '../../../core/services/order-table-state';
import {IngredientsModal} from './components/modals/ingredients-modal/ingredients-modal';
import {PotionIngredientsColumnState} from '../../../core/services/potion-ingredients-column-state';

@Component({
  selector: 'app-potions-page',
  imports: [
    Button,
    Table
  ],
  templateUrl: './potions-page.html',
  styleUrl: './potions-page.scss',
  providers: [ DialogService ]
})
export class PotionsPage {
  public potionTableState: PotionTableState = inject(PotionTableState);
  private dialogService: DialogService = inject(DialogService);
  private toasterState: ToasterState = inject(ToasterState);
  private orderTableState: OrderTableState = inject(OrderTableState);
  private potionIngredientsColumnState: PotionIngredientsColumnState = inject(PotionIngredientsColumnState);

  public readonly tableHeaderData = tableHeaderData;

  public handleOpenPotionModal(): void {
    const dynamicDialogRef = this.dialogService.open(CreatePotionModal, {
      header: 'Создать зелье',
      width: '360px',
      closable: true,
      closeOnEscape: true,
      dismissableMask: true
    });

    dynamicDialogRef?.onClose.subscribe((result) => {
      result === 'success' &&
      this.toasterState.showToast({
        message: 'Зелье успешно создано.',
        type: 'success',
        duration: 3000
      });
    });
  }

  public handleDelete(id: number): void {
    const potion = this.potionTableState.getPotionById(id);
    if (!potion) { return; }

    const orders = this.orderTableState.getOrderByPotionName(potion['name']);
    if (orders.length) {
      this.toasterState.showToast({
        message: 'Надо удалить заказы в которые есть данное зелье!',
        type: 'error',
        duration: 3000
      });

      return;
    }

    this.potionIngredientsColumnState.removePotionIngredients(id);
    this.potionTableState.removePotion(id);
  }

  public handleModalOpen(id: number): void {
    this.dialogService.open(IngredientsModal, {
      header: 'Ингредиенты',
      width: '360px',
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
      data: id
    });
  }
}
