import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { HttpLoaderFactory } from 'app/core/core.module';

import * as fromComponents from './components';

const routes: Routes = [
  {
    path: '',
    component: fromComponents.BlogComponent,
    children: [
      { path: 'categories/:name', component: fromComponents.PostListComponent },
      { path: 'post/:id', component: fromComponents.PostComponent },
      { path: '**', redirectTo: 'categories/all', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    TranslateModule
  ]
})
export class BlogRoutingModule {}
