import {Component, inject, OnInit} from '@angular/core';
import {Button} from '../../../../../../shared/components/ui/button/button';
import {FormGroup} from '@angular/forms';
import {orderFormFields} from './configs/order-potion-modal-config';
import {OrderPotionModalService} from './services/order-potion-modal.service';
import {OrderPotionModalComponentsModule} from './components/order-potion-modal-components-module';
import {OrderTableState} from '../../../../../../core/services/order-table-state';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {FieldChangedParams} from '../../../../../../core/types/form-field.types';

@Component({
  selector: 'app-order-potion-modal',
  imports: [
    Button,
    OrderPotionModalComponentsModule
  ],
  templateUrl: './order-potion-modal.html',
  styleUrl: './order-potion-modal.scss'
})
export class OrderPotionModal implements OnInit {
  private orderPotionModalService: OrderPotionModalService = inject(OrderPotionModalService);
  private orderTableState: OrderTableState = inject(OrderTableState);
  private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  public readonly orderFormFields = orderFormFields;
  public orderForm = new FormGroup({});

  public ngOnInit(): void {
    this.orderForm = this.orderPotionModalService.initForm(this.orderFormFields);
  }

  public fieldChanged({ field, value }: FieldChangedParams): void {
    this.orderForm.get(field)?.setValue(value);
  }

  public isDisabledBtn(): boolean {
    return this.orderForm.invalid
  }

  public handleClick(): void {
    const tableData = this.orderPotionModalService.transformTableData(this.orderForm);
    this.orderTableState.setTableState(tableData);
    this.orderForm.reset();
    this.dialogRef?.close('success');
  }
}
