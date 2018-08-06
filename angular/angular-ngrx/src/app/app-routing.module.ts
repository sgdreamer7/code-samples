import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromPages from './pages';

import * as fromGuards from 'app/core/guards';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: fromPages.HomeComponent },
  {
    path: 'join',
    canActivate: [fromGuards.IsLoggedInGuard],
    component: fromPages.JoinComponent
  },
  {
    path: 'sign-in',
    canActivate: [fromGuards.IsLoggedInGuard],
    component: fromPages.SignInComponent
  },
  { path: 'workflow', component: fromPages.WorkflowPageComponent },
  { path: 'about', component: fromPages.AboutPageComponent },
  {
    path: 'profile',
    canLoad: [fromGuards.AuthGuard],
    loadChildren: 'app/profile/profile.module#ProfileModule'
  },
  { path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule' },
  { path: 'shop', loadChildren: 'app/shop/shop.module#ShopModule' },
  { path: 'purchases', loadChildren: 'app/purchases/purchases.module#PurchasesModule' },
  { path: 'cart', component: fromPages.CartComponent },
  { path: 'wishlist', component: fromPages.WishlistComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
