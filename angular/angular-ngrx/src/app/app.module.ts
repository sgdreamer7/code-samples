import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { ProfileModule } from './profile/profile.module';

import { AppComponent } from './app.component';

import * as fromPages from './pages';

import * as fromGuards from 'app/core/guards';

import { TokenInterceptor } from './core/interceptors/token.interceptor';

// ngrx part

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, CustomSerializer } from './@store';
import { metaReducers } from './@store/meta-reducers';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';

@NgModule({
  declarations: [AppComponent, ...fromPages.pages],
  entryComponents: [fromPages.ForgotPasswordComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreRouterConnectingModule,
    CoreModule,
    LayoutModule,
    ProfileModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    AppRoutingModule
  ],
  providers: [
    ...fromGuards.guards,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
