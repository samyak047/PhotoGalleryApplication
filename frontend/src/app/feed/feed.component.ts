import { Component, OnInit } from '@angular/core';
import { Urls } from 'app/services/urls';
import { AlbumService } from 'app/services/album.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {
  public albumData: any;  
  public SERVER_BASE_URL = 'http://localhost:8000';
  constructor(private service: AlbumService) { }

  ngOnInit() {
    this.service.getAlbums().subscribe((resp: Response) => {
      this.albumData = resp; 
      console.log(resp);
      }
    )
  }


  likeAlbum(albumId: number){
    this.service.likeAlbum(albumId).subscribe(data=>{console.log(data)})
  }
  unlikeAlbum(albumId: number){
    this.service.unlikeAlbum(albumId).subscribe(data=>{console.log(data)})
  }

}
