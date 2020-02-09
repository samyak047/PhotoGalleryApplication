import { Injectable } from '@angular/core';
import { IAlbumDetails } from 'app/interfaces/i-album-details';
import { Urls } from './urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  public urls = new Urls()
  
  constructor(private http : HttpClient) { }
  public addAlbum(album : IAlbumDetails):Observable<any>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "multipart/form-data",
    //     "boundary" : "--------------------------145291310876201835918384"
    //   })
    // };
    return this.http.post(`${this.urls.ALBUM_URL}`, album);
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "multipart/form-data; boundary=--------------------------145291310876201835918384");
  
    // var formdata = new FormData();
    // formdata.append("cover_photo", fileInput.files[0], "SampleJPGImage_100kbmb.jpg");
    // formdata.append("description", "\"This is my first album\"");
    // formdata.append("owner", "1");
  
    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: 'follow'
    // };
  
    // fetch("localhost:8000/album/", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
  }


}
