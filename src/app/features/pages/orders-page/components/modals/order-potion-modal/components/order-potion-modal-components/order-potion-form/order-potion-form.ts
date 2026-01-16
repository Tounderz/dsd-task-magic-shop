import {Component, EventEmitter, inject, input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldChangedParams, FormFieldItem} from '../../../../../../../../../core/types/form-field.types';
import {SelectData} from '../../../../../../../../../core/types/select-data.types';
import {debounceTime, Subscription} from 'rxjs';
import {OrderPotionModalService} from '../../../services/order-potion-modal.service';
import {ToasterState} from '../../../../../../../../../core/services/toaster-state';
import {deliveryMethods} from '../../../../../../../../../core/models/delivery-method-select';
import {paymentMethods} from '../../../../../../../../../core/models/payment-method-select';
import {PotionTableState} from '../../../../../../../../../core/services/potion-table-state';

@Component({
  selector: 'app-order-potion-form',
  standalone: false,
  templateUrl: './order-potion-form.html',
  styleUrl: './order-potion-form.scss',
})
export class OrderPotionForm implements OnInit, OnDestroy {
  orderForm = input<FormGroup>(new FormGroup({}));
  orderFormFields = input<Array<FormFieldItem>>();
  @Output() fieldChanged: EventEmitter<FieldChangedParams> = new EventEmitter<FieldChangedParams>();

  private orderPotionModalService: OrderPotionModalService = inject(OrderPotionModalService);
  private toasterState: ToasterState = inject(ToasterState);
  private potionTableState: PotionTableState = inject(PotionTableState);

  private formSubscription: Subscription = new Subscription();
  private lastShownError: string = '';

  public ngOnInit(): void {
    this.formSubscription = this.orderForm().valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        if ((this.orderForm().touched || this.orderForm().dirty) && this.orderForm().invalid) {
          this.checkAndShowErrors();
        }
      });
  }

  public ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  public getOptions(key: string): Array<SelectData> {
    switch (key) {
      case 'deliveryMethod':
        return deliveryMethods;
      case 'paymentMethod':
        return paymentMethods;
      case 'potion':
        return this.potionTableState.potionOptions();
      default:
        return [];
    }
  }

  public inputValueChange(value: string, fieldName: string) {
    this.fieldChanged.emit({ field: fieldName, value });
  }

  public selectValueChange(selectedValue: SelectData, fieldName: string): void {
    this.fieldChanged.emit({ field: fieldName, value: selectedValue.name });
  }

  private checkAndShowErrors(): void {
    const form = this.orderForm();
    for (const fieldName in form.controls) {
      const control = form.get(fieldName);

      if (control && control.invalid && (control.touched || control.dirty)) {
        const errorMessage = this.orderPotionModalService.getErrorMessage({
          errors: control.errors,
          fieldName: fieldName,
          orderFormFields: this.orderFormFields()
        });

        if (errorMessage && errorMessage !== this.lastShownError) {
          this.showErrorToast(errorMessage);
          this.lastShownError = errorMessage;
          break;
        }
      }
    }
  }

  private showErrorToast(errorMessage: string): void {
    this.toasterState.showToast({
      message: errorMessage,
      type: 'error',
      duration: 3000
    });
  }
}
