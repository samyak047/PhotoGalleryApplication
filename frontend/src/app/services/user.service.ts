import { Injectable } from '@angular/core';
import { Urls } from './urls';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserDetails } from 'app/interfaces/i-user-details';
import { ILoginDetails } from 'app/interfaces/i-login-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urls = new Urls();
  getUser(id : number): Observable<any>{
    return this.http.get(`${this.urls.USER_URL}/${id}`)
  }
  addUser(data : FormData): Observable<any>{
    return this.http.post(`${this.urls.USER_URL}`, data)
  }
  getUsers(): Observable<any>{
    return this.http.get(`${this.urls.USER_URL}`)
  }
  updateUser(id: number, data : FormData):Observable<any>{
    return this.http.put(`${this.urls.USER_URL}/${id}`, data)
  }
  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.urls.USER_URL}/${id}`)
  }
  public login(data : ILoginDetails): Observable<any>{
    return this.http.post(`${this.urls.LOGIN_URL}`, data);
  }
  constructor(private http : HttpClient) { }
}
