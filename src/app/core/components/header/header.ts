import { Component } from '@angular/core';
import {headerLinks} from './configs/header-config';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'header[app-header]',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public readonly headerLinks = headerLinks;
}
