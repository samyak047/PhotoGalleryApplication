import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AlbumService } from 'app/services/album.service';
import { Response } from '@angular/http';
import { TokenServiceService } from 'app/services/token-service.service';
import { PhotoService } from 'app/services/photo.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private photoService: PhotoService,
    private tokenService: TokenServiceService
  ) {
    this.description = ""
  }
  public edit : boolean
  public album : Object
  public album_id : string
  public coverPhoto : File
  public newPhoto : File
  
  public description : string
  public is_private : boolean
  public photoMessage : string
  public coverPhotoChanged: boolean
  public SERVER_BASE_URL = 'http://localhost:8000';
  ngOnInit() {
    this.album_id =this.route.snapshot.paramMap.get('id');
    this.albumService.getAlbum(+this.album_id).subscribe((resp : Response)=> {
      console.log(resp);
      this.album = resp;
      if(resp['owner']['id'] === +this.tokenService.getUserId())
        this.edit = true
      this.coverPhoto = resp['cover_photo']
      this.is_private = resp['is_private']
      this.description = resp['description']
      })
      
    // console.log(this.album);
  }

  update() {
    var formdata = new FormData();
    if(this.coverPhotoChanged){}
    formdata.append("cover_photo", this.coverPhoto)
    formdata.append("description", this.description)
    formdata.append("owner", this.tokenService.getUserId())
    formdata.append("is_private", this.is_private === true ? "true" : "false")
    this.albumService.updateAlbum(+this.album_id, formdata).subscribe(
        data => {
            console.log(data);
            this.router.navigate(['/album/'+this.album_id])
        }
    )
    this.router.navigate(['/album/'+this.album_id])
    this.ngOnInit()
    }

  delete() {
    if(confirm("Are you sure to delete this album.")) {
      this.albumService.deleteAlbum(+this.album_id)
      this.router.navigate(['/feed'])
    }
  }

  onCoverPhotoChanged(event) {
    console.log("File selected.....")
    this.coverPhotoChanged = true
    this.coverPhoto = event.target.files[0]
}
onNewPhotoChanged(event) {
  console.log("File selected.....")
  this.newPhoto = event.target.files[0]
}

addPhoto(photoDescription: string) {
  if(!this.newPhoto){
    this.photoMessage = "Select photo"
  }
  else{
    var formdata = new FormData()
    if(photoDescription)
      formdata.append("description", photoDescription)
    formdata.append("photo", this.newPhoto)
    formdata.append("album", this.album_id)
    this.photoService.addPhoto(formdata).subscribe(
      data=>{
        console.log("Added")
        console.log(data)
        this.router.navigate(['/album/'+this.album_id])
        // this.album["photo"].push(data)
        // console.log(this.album)
        this.ngOnInit()
      }
    )
  }
}

deletePhoto(id : number){
  if(confirm("Are you sure to delete this photo.")) {
    this.photoService.deletePhoto(id)
    this.router.navigate(['/album/'+this.album_id])
    this.ngOnInit()
  }
}

}
