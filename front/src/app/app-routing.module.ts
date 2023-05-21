import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { GameStoreComponent } from './components/game-store/game-store.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { DefaultRoles } from 'src/api-authorization/role-defines';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', canActivate:[AuthorizeGuard],
    data: {
      roles: [DefaultRoles.Admin, DefaultRoles.User]
    }
  },
    
  {path: 'news', component: NewsComponent, pathMatch: 'full', canActivate:[AuthorizeGuard],
    data: {
      roles: [DefaultRoles.Admin, DefaultRoles.User]
    }
  },
  {path: 'store', component: GameStoreComponent, pathMatch: 'full', canActivate:[AuthorizeGuard]},
  { path: 'store/product/:id/details', component: ProductDetailsComponent, canActivate:[AuthorizeGuard] },
  { path: 'store/cart', component: CartComponent, pathMatch: 'full', canActivate:[AuthorizeGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
