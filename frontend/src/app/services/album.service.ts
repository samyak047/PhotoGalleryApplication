import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Urls } from './urls';
import { IAlbumDetails } from 'app/interfaces/i-album-details';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  urls = new Urls();

  public getAlbum(id: number): Observable<any>{
    return this.http.get(`${this.urls.ALBUM_URL}/${id}`)
  }
  public getAlbums(): Observable<any>{
    return this.http.get(`${this.urls.ALBUM_URL}`)
  }
  public updateAlbum(id: number, data: FormData): Observable<any>{
    return this.http.put(`${this.urls.ALBUM_URL}/${id}`, data)
  }
  public createAlbum(data: FormData): Observable<any>{
    return this.http.post(`${this.urls.ALBUM_URL}`, data)
  }
  public deleteAlbum(id: number): Observable<any>{
    return this.http.delete(`${this.urls.ALBUM_URL}/${id}`)
  }
  public likeAlbum(id: number): Observable<any>{
    return this.http.get(`${this.urls.ALBUM_LIKE_URL}/${id}`)
  }
  public unlikeAlbum(id: number): Observable<any>{
    return this.http.get(`${this.urls.ALBUM_UNLIKE_URL}/${id}`)
  }
  
  


}
