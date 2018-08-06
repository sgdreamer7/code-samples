import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from 'app/layout/layout.module';
import { ShopRoutingModule } from './shop-routing.module';

import * as fromPages from './pages';

import * as fromServices from './services';

import * as fromComponents from './components';

import * as fromStore from './@store';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    ShopRoutingModule,
    StoreModule.forFeature('shop', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects)
  ],
  providers: [
    ...fromServices.services
  ],
  declarations: [
    ...fromPages.pages,
    ...fromComponents.components
  ]
})
export class ShopModule { }
