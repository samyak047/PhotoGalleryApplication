import { Component, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IUserDetails } from 'app/interfaces/i-user-details';
import { TokenServiceService } from 'app/services/token-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private service : UserService, public router : Router, private tokenService: TokenServiceService) { 
    this.gender = "Female"
  }
  public message : string
  public gender = "Female"
  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isAuthenticated = true;
      this.router.navigate(['/feed']);
    }
    this.isAuthenticated = false;
  }

  isAuthenticated : boolean;
  public selectedFile : File

  register(form : NgForm){
    var registerForm : IUserDetails
    const formdata = new FormData();
    console.log(form.value)
    console.log(this.gender)
    if ( !form.value.username || !form.value.password || !this.selectedFile ){
      this.message = ("All fields are required.")
    }
    else {
      formdata.append("profile_picture", this.selectedFile)
      formdata.append("gender", this.gender)
      formdata.append("username", form.value.username)
      formdata.append("first_name", form.value.firstname)
      formdata.append("last_name", form.value.lastname)
      formdata.append("email", form.value.email)
      formdata.append("password", form.value.password)
      console.log(form.value);
      this.service.addUser(formdata).subscribe(
        data=> {
          console.log(data)
          if(data['id']) {
            var loginDetail = {
              "username" : form.value.username,
              "password" : form.value.password
            }
            this.service.login(loginDetail).subscribe(
              data=>{
                console.log(data);
                if(data['status'] == 'Success'){
                  this.isAuthenticated = true;
                  console.log("Authenticated")
                  this.tokenService.setToken(data['token']);
                  this.tokenService.setUserName(data['username'])
                  this.tokenService.setUserId(data['user_id']).subscribe(
                  this.router.navigate(['/feed'])
                  )
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
          else {
            this.message = "Some error occured. Please try later."
          }
        }
      )
    }
  }

  onChange(selected: any) {
    console.log(selected.value)
    this.gender = selected.value;
  }

  onFileChanged(event) {
    console.log("File selected.....")
    this.selectedFile = event.target.files[0]
  }

}
