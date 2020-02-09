import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from './urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  urls = new Urls()

  public addPhoto(data: FormData): Observable<any>{
    return this.http.post(`${this.urls.PHOTO_URL}`, data)
  }

  public deletePhoto(id: number): Observable<any>{
    return this.http.delete(`${this.urls.PHOTO_URL}/${id}`)
  }
  public likePhoto(id: number): Observable<any>{
    return this.http.get(`${this.urls.PHOTO_LIKE_URL}/${id}`)
  }
  public unlikePhoto(id: number): Observable<any>{
    return this.http.get(`${this.urls.PHOTO_UNLIKE_URL}/${id}`)
  }

}
