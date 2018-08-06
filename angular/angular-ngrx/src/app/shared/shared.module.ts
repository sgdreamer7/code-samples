import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { LayoutModule } from '../layout/layout.module';

import * as fromComponents from './components';

import { NgUnsubscribe } from './helpers';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    LayoutModule
  ],
  declarations: [
    ...fromComponents.components,
    NgUnsubscribe,
  ],
  providers: [
    DatePipe
  ],
  exports: [
    ...fromComponents.components,
    NgUnsubscribe
  ]
})
export class SharedModule { }
