import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { HttpLoaderFactory } from 'app/core/core.module';

import * as fromPages from 'app/shop/pages';
import * as fromComponents from 'app/shop/components';

const routes: Routes = [
  { path: ':category', component: fromPages.CatalogPageComponent },
  {
    path: 'products/:id',
    component: fromPages.ProductPageComponent,
    children: [
      { path: 'description', component: fromComponents.DescriptionComponent },
      { path: 'shipping', component: fromComponents.ShippingComponent },
      { path: 'specs', component: fromComponents.SpecsComponent },
      { path: 'reviews', component: fromComponents.ReviewsComponent },
      { path: '**', redirectTo: 'description', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'random', pathMatch: 'full' }
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
    TranslateModule,
    RouterModule
  ]
})
export class ShopRoutingModule {}
