import {ChangeDetectorRef, Component, effect, EventEmitter, inject, input, Output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SelectData} from '../../../../core/types/select-data.types';

@Component({
  selector: 'app-select',
  imports: [
    FormsModule
  ],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  label = input<string>('');
  options = input<Array<SelectData>>([]);
  selectedValue = input<string>('');
  @Output() valueChange: EventEmitter<SelectData> = new EventEmitter<SelectData>();

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  public showOptions = signal<boolean>(false);
  public displayValue = signal<string>('');
  public searchTerm: string = '';

  private displayValueEffect = effect(() => {
    this.displayValue.set(this.selectedValue());
  });

  public handleInputChange(value: string): void {
    this.searchTerm = value;
  }

  public getOptions(): Array<SelectData> {
    if (!this.searchTerm) { return this.options(); }

    const filtered = this.options()?.filter((option: SelectData) => {
      return option.label.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    if (!filtered.length) {
      setTimeout(() => {
        this.displayValue.set('');
        this.searchTerm = '';
        this.cd.markForCheck();
      });

      return this.options();
    }

    return filtered;
  }

  public selectOption(option: SelectData): void {
    this.displayValue.set(option.label);
    this.valueChange.emit(option);
    this.closeOptions();
  }

  public onBlur(): void {
    this.closeOptions();
  }

  public toggleOptions(): void {
    this.showOptions.update(show => !show);
  }

  private closeOptions(): void {
    this.showOptions.set(false);
  }
}
