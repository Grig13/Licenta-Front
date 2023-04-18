import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from 'src/models/news.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly url = "News";

  constructor(private httpClient: HttpClient) { }

  public getNews(): Observable<News[]>{
    return this.httpClient.get<News[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getNewsById(id: string): Observable<News>{
    return this.httpClient.get<News>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addNews(newsToAdd: News): Observable<News>{
    return this.httpClient.post<News>(`${environment.apiUrl}/${this.url}`, newsToAdd);
  }

  public editNews(id: string, newNews: News): Observable<News>{
    return this.httpClient.patch<News>(`${environment.apiUrl}/${this.url}/${id}`, newNews);
  }

  public deleteNews(id: string): Observable<News>{
    return this.httpClient.delete<News>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
