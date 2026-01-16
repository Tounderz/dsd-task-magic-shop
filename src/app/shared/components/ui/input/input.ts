import {Component, EventEmitter, input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [
    FormsModule
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  label = input<string>('');
  value = input<string | number>('');
  inputType = input<string>('text');
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  public handleChange(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
