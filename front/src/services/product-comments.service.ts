import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductComments } from 'src/models/product-comments.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCommentsService {

  private readonly url = "ProductComment";

  constructor(private httpClient: HttpClient) { }

  public getProductComments(): Observable<ProductComments[]>{
    return this.httpClient.get<ProductComments[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getProductCommentsById(id: string): Observable<ProductComments>{
    return this.httpClient.get<ProductComments>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addProductComment(commentToAdd: ProductComments): Observable<ProductComments>{
    return this.httpClient.put<ProductComments>(`${environment.apiUrl}/${this.url}`, commentToAdd);
  }

  public editProductComment(id: string, newComment: ProductComments): Observable<ProductComments>{
    return this.httpClient.patch<ProductComments>(`${environment.apiUrl}/${this.url}/${id}`, newComment);
  }

  public deleteProductComment(id: string): Observable<ProductComments>{
    return this.httpClient.delete<ProductComments>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
