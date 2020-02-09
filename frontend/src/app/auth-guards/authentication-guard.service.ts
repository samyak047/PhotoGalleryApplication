import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {TokenServiceService} from "../services/token-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate{

  constructor(private router : Router, private tokenService : TokenServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if(this.tokenService.getToken()){
      return true;
    }
    else{
      this.router.navigate(['login'])
      return false;
    }
  }
}
