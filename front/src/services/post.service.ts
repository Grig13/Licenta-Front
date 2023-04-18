import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from 'src/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly url = "Post";

  constructor(private httpClient: HttpClient) { }

  public getPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getPostById(id: string): Observable<Post>{
    return this.httpClient.get<Post>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addPost(postToAdd: Post): Observable<Post>{
    return this.httpClient.post<Post>(`${environment.apiUrl}/${this.url}`, postToAdd);
  }

  public addCommentsToPost(id: string, commentsId: string[]): Observable<Post>{
    return this.httpClient.post<Post>(`${environment.apiUrl}/${this.url}/${id}/add-comment`, commentsId);
  }

  public addCommentToPost(id: string, commentId: string): Observable<Post>{
    return this.httpClient.post<Post>(`${environment.apiUrl}/${this.url}/${id}/add-comment/${commentId}`, commentId);
  }

  public removeCommentFromPost(id: string, commentId: string): Observable<Post>{
    return this.httpClient.delete<Post>(`${environment.apiUrl}/${this.url}/${id}/${commentId}`);
  }

  public editPost(id: string, newPost: Post): Observable<Post>{
    return this.httpClient.patch<Post>(`${environment.apiUrl}/${this.url}/${id}`, newPost);
  }

  public deletePost(id: string): Observable<Post>{
    return this.httpClient.delete<Post>(`${environment.apiUrl}/${this.url}/${id}`);
  }

}
