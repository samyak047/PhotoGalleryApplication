import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private srvice: UserService
    ) { }
  public id : number;
  public form : object;
  public username: string;
  public firstname: string
  public lastname: string
  public gender: string
  public email: string
  public password1: string
  public password2: string
  public userId : number
  public profilePicture : File
  public edit: boolean
  public profile_data: any 
  public private_albums: any
  public public_albums: any
  public SERVER_BASE_URL = 'http://localhost:8000';
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.srvice.getUser(this.id).subscribe(
      data => {
        this.profile_data = data
        console.log(data);
        this.username = data["user"]["username"]
        this.firstname = data["user"]["first_name"]
        this.lastname = data["user"]["first_name"]
        this.gender = data["gender"]
        this.email = data["user"]["email"]
        this.userId = +data["user"]['id']
        this.profilePicture = data["profile_picture"]
        this.private_albums = data["private_albums"]
        this.public_albums = data["public_albums"]        
        // console.log(this.form)
        this.edit = true
      }
    )

  }

  updateProfile(){
    var formdata = new FormData()
    formdata.append("first_name", this.firstname)
    formdata.append("last_name", this.lastname)
    formdata.append("gender" , this.gender)
    formdata.append("email", this.email)
    console.log(this.userId)
    this.srvice.updateUser(this.userId, formdata).subscribe(
      data=>{
        console.log(data)
      }
    )
  }


  deleteAccount(){
    if(confirm("Are you sure to delete your account.")) {
      this.srvice.deleteUser(+this.userId)
      this.router.navigate(['/login'])
    } 
  }

}
