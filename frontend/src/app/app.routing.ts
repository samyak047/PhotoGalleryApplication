import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import {LoginComponent} from "./login/login.component";
import {AddComponent} from "./add/add.component";
import {AuthenticationGuardService} from "./auth-guards/authentication-guard.service";
import { FeedComponent } from './feed/feed.component';
import { AlbumComponent } from './album/album.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'add',
    component : AddComponent,
    canActivate : [AuthenticationGuardService]
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  
  // {
  //   path : 'home',
  //   loadChildren : '../app/layout/layout.module#LayoutModule',
  //   canActivate : [AuthenticationGuardService]
  // },
  {
    path : 'feed',
    component : FeedComponent,
    canActivate : [AuthenticationGuardService]
  },
  // {
  //   path : 'add',
  //   component : AddComponent
  // },
  {
    path : 'album/:id',
    component : AlbumComponent,
    canActivate : [AuthenticationGuardService]
  },
  {
    path : 'user/:id',
    component : UserProfileComponent,
    canActivate : [AuthenticationGuardService]
  },
  {
    path : '**',
    component : ErrorPageComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
