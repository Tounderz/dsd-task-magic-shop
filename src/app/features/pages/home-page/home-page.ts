import { Component } from '@angular/core';
import {Header} from '../../../core/components/header/header';
import {RouterOutlet} from '@angular/router';
import {Toaster} from '../../../shared/components/ui/toaster/toaster';

@Component({
  selector: 'app-home-page',
  imports: [
    Header,
    RouterOutlet,
    Toaster
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
