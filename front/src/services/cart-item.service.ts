import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from 'src/models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private readonly baseUrl = "CartItem"

  constructor(private http: HttpClient) { }

  getCartItemsByUserId(userId: string): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${environment.apiUrl}/${this.baseUrl}/user/${userId}`);
  }

  addCartItem(cartItem: CartItem): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/${this.baseUrl}`, cartItem);
  }

  removeCartItem(cartItemId: string): Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/${this.baseUrl}/${cartItemId}`);
  }
}
