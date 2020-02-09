import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor() { }

  token : string;
  user_name : string;
  role : string;

  getToken():string{
    return window.sessionStorage.getItem('token')
  }

  setToken(token : string){
    window.sessionStorage.removeItem('token');
    window.sessionStorage.setItem('token', token)
  }

  getUserName():string{
    return window.sessionStorage.getItem('username')
  }
  setUserId(id : string){
    window.sessionStorage.removeItem('userId')
    window.sessionStorage.setItem('userId', id)
  }
  getUserId(): string{
    return window.sessionStorage.getItem('userId')
  }
  setUserName(user_name : string){
    window.sessionStorage.removeItem('username')
    window.sessionStorage.setItem('username', user_name)
  }

  getRole():string{
    return window.sessionStorage.getItem('role')
  }


  logout(){
    sessionStorage.clear();
    localStorage.clear();
  }
}
