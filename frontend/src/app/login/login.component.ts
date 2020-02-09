import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { ILoginDetails } from 'app/interfaces/i-login-details';
import { HttpClient } from '@angular/common/http';
import { Url } from 'url';
import { Urls } from 'app/services/urls';
import { Observable } from 'rxjs';
import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import {Router} from "@angular/router";
import {TokenServiceService} from "../services/token-service.service";
import {ComponentsModule} from "../components/components.module"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginDetail : ILoginDetails
  urls = new Urls()
  show : boolean
  message : string
  class : string
  constructor(private service : UserService, public router : Router, private tokenService : TokenServiceService ) {
    this.show = false
    this.class = "visibility"
  }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isAuthenticated = true;
      this.router.navigate(['/feed']);
    }
    this.isAuthenticated = false;
  }

  isAuthenticated : boolean;

  login(loginForm : NgForm){
    this.loginDetail = {
      "username" : loginForm.value.username,
      "password" : loginForm.value.password
    }
    console.log(loginForm.value)
    if(this.loginDetail["username"] == undefined)
    {
      this.message = "Username can't be empty."
    }
    
    else if(this.loginDetail["password"] == undefined)
    {
      this.message = "Password can't be empty."
    } 
    else{

      this.service.login(this.loginDetail).subscribe(
        data=>{
          console.log(data);
          if(data['status'] == 'Success'){
            this.isAuthenticated = true;
            console.log("Authenticated")
            this.tokenService.setToken(data['token']);
            this.tokenService.setUserName(data['username'])
            this.tokenService.setUserId(data['user_id'])
            this.router.navigate(['/feed'])
          }
          else{
            this.isAuthenticated = false;
            this.message = data['message']
            console.log(data['message'])
            console.log("you are not authenticated")
          }
        }
      )
    }
  }
  onToggle(){
    this.show = !this.show;
    if (this.show){
      this.class = "visibility_off"
    } else{
      this.class = "visibility"
    }
  }


}
