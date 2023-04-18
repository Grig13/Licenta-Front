import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Timeline } from 'src/models/timeline.model';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private readonly url = "Timeline";

  constructor(private httpClient: HttpClient) { }

  public getTimelines(): Observable<Timeline[]>{
    return this.httpClient.get<Timeline[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getTimelineById(id: string): Observable<Timeline>{
    return this.httpClient.get<Timeline>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addPostsToTimeline(id: string, postsId: string[]): Observable<Timeline>{
    return this.httpClient.post<Timeline>(`${environment.apiUrl}/${this.url}/${id}/add-post`, postsId);
  }

  public addPostToTimeline(id: string, postId: string): Observable<Timeline>{
    return this.httpClient.post<Timeline>(`${environment.apiUrl}/${this.url}/${id}/add-post/${postId}`, postId);
  }

  public removePostFromTimeline(id: string, postId: string): Observable<Timeline>{
    return this.httpClient.delete<Timeline>(`${environment.apiUrl}/${this.url}/${id}/${postId}`);
  }

  public addTimelines(timelineToAdd: Timeline): Observable<Timeline>{
    return this.httpClient.post<Timeline>(`${environment.apiUrl}/${this.url}`, timelineToAdd);
  }

  public editTimeline(id: string, newTimeline: Timeline): Observable<Timeline>{
    return this.httpClient.patch<Timeline>(`${environment.apiUrl}/${this.url}/${id}`, newTimeline);
  }

  public deleteTimeline(id: string): Observable<Timeline>{
    return this.httpClient.delete<Timeline>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
