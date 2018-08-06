import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromComponents from './components';
import * as fromRootGuards from 'app/core/guards';

const routes: Routes = [
  {
    path: 'profile',
    canActivate: [fromRootGuards.AuthGuard],
    component: fromComponents.ProfilePageComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: fromComponents.ProfileComponent },
      { path: 'purchases', loadChildren: 'app/purchases/purchases.module#PurchasesModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
