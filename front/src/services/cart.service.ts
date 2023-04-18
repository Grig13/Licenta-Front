import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from 'src/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly url = "Cart";

  constructor(private httpClient: HttpClient) { }

  public getCarts(): Observable<Cart[]>{
    return this.httpClient.get<Cart[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getCartById(id: string): Observable<Cart>{
    return this.httpClient.get<Cart>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addProductsToCart(id: string, productsId: string[]): Observable<Cart>{
    return this.httpClient.post<Cart>(`${environment.apiUrl}/${this.url}/${id}/add-product`, productsId);
  }

  public addProductToCart(id: string, productId: string): Observable<Cart>{
    return this.httpClient.post<Cart>(`${environment.apiUrl}/${this.url}/${id}/add-product/${productId}`, productId);
  }

  public removeProductFromCart(id: string, productId: string): Observable<Cart>{
    return this.httpClient.delete<Cart>(`${environment.apiUrl}/${this.url}/${id}/${productId}`);
  }

  public addCarts(cartToAdd: Cart): Observable<Cart>{
    return this.httpClient.post<Cart>(`${environment.apiUrl}/${this.url}`, cartToAdd);
  }

  public editCart(id: string, newCart: Cart): Observable<Cart>{
    return this.httpClient.patch<Cart>(`${environment.apiUrl}/${this.url}/${id}`, newCart);
  }

  public deleteCart(id: string): Observable<Cart>{
    return this.httpClient.delete<Cart>(`${environment.apiUrl}/${this.url}/${id}`);
  }

}
