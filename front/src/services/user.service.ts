import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = "User";

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getUserById(id: string): Observable<User>{
    return this.httpClient.get<User>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public addUser(userToAdd: User): Observable<User>{
    return this.httpClient.post<User>(`${environment.apiUrl}/${this.url}`, userToAdd);
  }

  public editUser(id: string, newUser: User): Observable<User>{
    return this.httpClient.patch<User>(`${environment.apiUrl}/${this.url}/${id}`, newUser);
  }

  public deleteUser(id: string): Observable<User>{
    return this.httpClient.delete<User>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
