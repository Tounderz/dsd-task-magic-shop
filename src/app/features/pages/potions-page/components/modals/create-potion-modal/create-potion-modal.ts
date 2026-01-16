import {Component, inject, OnInit} from '@angular/core';
import {CreatePotionModalComponentsModule} from './components/create-potion-modal-components-module';
import {Button} from '../../../../../../shared/components/ui/button/button';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormGroup} from '@angular/forms';
import {PotionTableState} from '../../../../../../core/services/potion-table-state';
import {PotionModalService} from './services/potion-modal.service';
import {FieldChangedParams} from '../../../../../../core/types/form-field.types';
import {ToasterState} from '../../../../../../core/services/toaster-state';

@Component({
  selector: 'app-create-potion-modal',
  imports: [
    CreatePotionModalComponentsModule,
    Button
  ],
  templateUrl: './create-potion-modal.html',
  styleUrl: './create-potion-modal.scss',
})
export class CreatePotionModal implements OnInit {
  private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private potionTableState: PotionTableState = inject(PotionTableState);
  private potionModalService: PotionModalService = inject(PotionModalService);
  private toasterState: ToasterState = inject(ToasterState);

  public potionForm = new FormGroup({});

  public ngOnInit(): void {
    this.potionForm = this.potionModalService.initForm();
  }

  public fieldChanged({ field, value }: FieldChangedParams): void {
    if (field === 'name' && value) {
      const tableData = this.potionTableState.getPotionByName(value);
      if (tableData) {
        value = '';
        this.toasterState.showToast({
          message: 'Зелье с таким название уже существует!!',
          type: 'error',
          duration: 3000
        });
      }
    }

    this.potionForm.get(field)?.setValue(value);
  }

  public isDisabledBtn(): boolean {
    const ingredientIds = [];

    Object.keys(this.potionForm.controls).forEach(key => {
      const fieldNumber = Number(key);
      if (isNaN(fieldNumber) || !Number.isInteger(fieldNumber) || fieldNumber < 1) {
        return;
      }

      const value = Number(this.potionForm.get(key)?.value);
      value >= 1 && ingredientIds.push(value);
    });

    return ingredientIds.length < 3 || this.potionForm.invalid;
  }

  public handleClick(): void {
    const tableData = this.potionModalService.transformTableData(this.potionForm);
    this.potionTableState.setPotionTableState(tableData);
    this.potionForm.reset();
    this.dialogRef.close('success');
  }
}
