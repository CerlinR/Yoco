import { Routes } from '@angular/router';

export const routes: Routes =  [
    { path: '', redirectTo: 'user/login', pathMatch: 'full' },
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    // { path: '**', redirectTo: 'user/home' }
  ];
