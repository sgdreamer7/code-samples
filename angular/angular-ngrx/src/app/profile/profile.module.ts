import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LayoutModule } from 'app/layout/layout.module';
import { ProfileRoutingModule } from './profile-routing.module';

import * as fromComponents from './components';

import * as fromServices from './services';

import * as fromStore from './@store';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    StoreModule.forFeature('profile', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects)
  ],
  declarations: [
    ...fromComponents.components
  ],
  entryComponents: [
    fromComponents.EditPasswordModalComponent,
    fromComponents.EditEmailModalComponent,
    fromComponents.DeleteProfileModalComponent
  ],
  providers: [
    ...fromServices.services
  ]
})
export class ProfileModule { }
