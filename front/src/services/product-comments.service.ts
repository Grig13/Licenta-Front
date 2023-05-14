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

  constructor(private http: HttpClient) { }

  getCommentsByProductId(productId: string): Observable<ProductComments[]>{
    return this.http.get<ProductComments[]>(`${environment.apiUrl}/${this.url}/product/${productId}`);
  }

  getCommentById(id: string): Observable<ProductComments>{
    return this.http.get<ProductComments>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  
  addComment(comment: ProductComments): Observable<ProductComments>{
    return this.http.post<ProductComments>(`${environment.apiUrl}/${this.url}`, comment);
  }

  updateComment(id: string, comment: ProductComments): Observable<void>{
    return this.http.put<void>(`${environment.apiUrl}/${this.url}/${id}`, comment);
  }

  deleteComment(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
