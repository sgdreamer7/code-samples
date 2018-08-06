import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromComponents from './components';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromComponents.PurchasesComponent,
    children: []
  },
  { path: ':id', component: fromComponents.OrderComponent, canActivate: [fromGuards.OrderGuard] },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PurchasesRoutingModule {}
