import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/pages/home-page/home-page-module').then(m => m.HomePageModule),
  },
];
