import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly url = "Product";

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiUrl}/${this.url}`)
  }

  getProductById(id: string): Observable<Product>{
    return this.http.get<Product>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  addProduct(product: Product): Observable<void>{
    return this.http.post<void>(`${environment.apiUrl}/${this.url}`, product);
  }

  updateProduct(id: string, product: Product): Observable<Product>{
    return this.http.put<Product>(`${environment.apiUrl}/${this.url}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
