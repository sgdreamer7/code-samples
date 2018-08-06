import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LayoutModule } from 'app/layout/layout.module';
import { SharedModule } from 'app/shared/shared.module';
import { PurchasesRoutingModule } from './purchases-routing.module';

import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

// import * as fromPurchasesStore from './@store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule,
    PurchasesRoutingModule
  ],
  entryComponents: [
    fromComponents.CreateComplainModalComponent
  ],
  declarations: [
    ...fromComponents.components,
  ],
  providers: [
    ...fromServices.services,
    ...fromGuards.guards
  ],
  exports: [
    ...fromComponents.components
  ]
})
export class PurchasesModule { }
