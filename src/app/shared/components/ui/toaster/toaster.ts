import {Component, inject} from '@angular/core';
import {ToasterState} from '../../../../core/services/toaster-state';

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.html',
  styleUrl: './toaster.scss',
})
export class Toaster {
  public toasterState: ToasterState = inject(ToasterState);
}
