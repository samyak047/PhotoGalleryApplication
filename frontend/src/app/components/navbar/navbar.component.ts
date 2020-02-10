import { Component, OnInit, ElementRef } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import {TokenServiceService} from "../../services/token-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    username : string;

    constructor(private tokenService : TokenServiceService, private router : Router) {
        this.username = tokenService.getUserName()
        console.log(this.username)
    }
    ngOnInit(): void {
        this.username = tokenService.getUserName()

    }
    logout(){
        this.tokenService.logout();
        this.router.navigate(['/login'])
    }
    profile():void {
        this.router.navigate(['/user/'+this.tokenService.getUserId()])
    }
    addAlbum():void {
        this.router.navigate(['/add'])
    }
    home():void {
        this.router.navigate(['/feed'])
    }
}
