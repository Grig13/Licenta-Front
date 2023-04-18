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

  constructor(private httpClient: HttpClient) { }

  public getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/${this.url}`)
  }

  public getProductsById(id: string): Observable<Product>{
    return this.httpClient.get<Product>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addCommentToProduct(id: string, commentId: string): Observable<Product>{
    return this.httpClient.post<Product>(`${environment.apiUrl}/${this.url}/${id}/add-comment/${commentId}`, commentId);
  }

  public removeCommentFromProduct(id: string, commentId: string): Observable<Product>{
    return this.httpClient.delete<Product>(`${environment.apiUrl}/${this.url}/${id}/${commentId}`);
  }

  public addProducts(productToAdd: Product): Observable<Product>{
    return this.httpClient.post<Product>(`${environment.apiUrl}/${this.url}`, productToAdd);
  }

  public editProduct(id: string, newProduct: Product): Observable<Product>{
    return this.httpClient.patch<Product>(`${environment.apiUrl}/${this.url}/${id}`, newProduct);
  }

  public deleteProduct(id: string): Observable<Product>{
    return this.httpClient.delete<Product>(`${environment.apiUrl}/${this.url}/${id}`);
  }

}
