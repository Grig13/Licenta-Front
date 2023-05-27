import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsComponent } from './components/news/news.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { SharedModule } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameStoreComponent } from './components/game-store/game-store.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewsComponent,
    GameStoreComponent,
    ProductDetailsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,  
    ButtonModule,
    CardModule,
    CommonModule,
    SharedModule,
    DataViewModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule.forRoot([
      {path: 'news', component: NewsComponent, pathMatch: 'full'},
      {path: 'store', component: GameStoreComponent, pathMatch: 'full'},
      { path: 'store/product/:id/details', component: ProductDetailsComponent},
      { path: 'store/cart', component: CartComponent, pathMatch: 'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
