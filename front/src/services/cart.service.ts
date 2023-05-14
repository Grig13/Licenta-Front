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

  constructor(private http: HttpClient) { }

  addToCart(userId: string, productId: string, quantity: number): Observable<void>{
    return this.http.post<void>(`${environment.apiUrl}/${this.url}/${userId}/products/${productId}`, 1);
  }

  removeFromCart(userId: string, productId: string): Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${userId}/products/${productId}`);
  }

  clearCart(userId: string): Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${userId}`);
  }

}
