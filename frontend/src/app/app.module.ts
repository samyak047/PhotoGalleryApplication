import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatRadioButton, MatRadioModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import {AddComponent} from "./add/add.component";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import {AuthInterceptorService} from "./interceptors/auth-interceptor.service";
import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';
import { FeedComponent } from './feed/feed.component';
import { AlbumComponent } from './album/album.component';
import { NguiInviewModule, NguiListModule, NguiUtilsModule } from '@ngui/common';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    CommonModule,
    HttpClientModule,
    MatCheckboxModule,
    MatTabsModule,
    BrowserModule,
    DataTablesModule,
    NguiListModule,
    NguiInviewModule,
    NguiUtilsModule,
    ComponentsModule,
    ],
  declarations: [
    AppComponent,
    UserProfileComponent,
    ErrorPageComponent,
    LoginComponent,
    AddComponent,
    FeedComponent,
    AlbumComponent,
    RegisterComponent,

  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
