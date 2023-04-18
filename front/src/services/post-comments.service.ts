import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostComments } from 'src/models/post-comments.model';

@Injectable({
  providedIn: 'root'
})
export class PostCommentsService {

  private readonly url = "PostComment";

  constructor(private httpClient: HttpClient) { }

  public getPostComments(): Observable<PostComments[]>{
    return this.httpClient.get<PostComments[]>(`${environment.apiUrl}/${this.url}`)
  }

  public getPostCommentsById(id: string): Observable<PostComments>{
    return this.httpClient.get<PostComments>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addPostComment(commentToAdd: PostComments): Observable<PostComments>{
    return this.httpClient.post<PostComments>(`${environment.apiUrl}/${this.url}`, commentToAdd);
  }

  public editPostComment(id: string, newComment: PostComments): Observable<PostComments>{
    return this.httpClient.patch<PostComments>(`${environment.apiUrl}/${this.url}${id}`, newComment);
  }

  public deletePostComment(id: string): Observable<PostComments>{
    return this.httpClient.delete<PostComments>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
