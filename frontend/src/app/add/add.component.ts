import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {TokenServiceService} from "../services/token-service.service";
import { NgForOf } from '@angular/common';
import { AddService } from 'app/services/add.service';
import { IAlbumDetails } from 'app/interfaces/i-album-details';
import { HttpClient } from '@angular/common/http';
import { Urls } from 'app/services/urls';
import { AlbumService } from 'app/services/album.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    constructor(private service: AlbumService,  public router : Router, private tokenService : TokenServiceService, private http : HttpClient) {}

    ngOnInit() {
    }
    public message : string;
    public album : IAlbumDetails;
    public selectedFile : File;
    private urls = new Urls();
    is_private = false;

    addAlbum(albumForm : NgForm){

        if(!this.selectedFile){
            this.message =  "Cover Photo is required"
        }
        else{
            var formdata = new FormData();
            formdata.append("cover_photo", this.selectedFile)
            formdata.append("description", albumForm.value.description)
            formdata.append("owner", this.tokenService.getUserId())
            formdata.append("is_private", this.is_private === true ? "true" : "false")
            this.service.createAlbum(formdata).subscribe(
                data => {
                    console.log(data);
                    this.router.navigate(['/album/'+data['id']])
                }
            )
        }
        
    }

    onFileChanged(event) {
        console.log("File selected.....")
        this.selectedFile = event.target.files[0]
    }
    
}
