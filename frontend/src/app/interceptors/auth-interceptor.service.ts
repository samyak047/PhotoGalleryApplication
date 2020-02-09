import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenServiceService} from "../services/token-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private injector : Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenService = this.injector.get(TokenServiceService)
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${tokenService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
