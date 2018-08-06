import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LayoutModule } from 'app/layout/layout.module';
import { SharedModule } from 'app/shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';

import * as fromStore from './@store';

import * as fromComponents from './components';

import * as fromServices from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    SharedModule,
    BlogRoutingModule,
    StoreModule.forFeature('blog', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects)
  ],
  declarations: [
    ...fromComponents.components
  ],
  providers: [
    ...fromServices.services
  ]
})
export class BlogModule { }
