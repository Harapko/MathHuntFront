import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {AuthRequest, AuthResponse} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient)
  cookieService = inject(CookieService)
  router = inject(Router)
  baseUsr = "http://localhost:5117/"
  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth(){
    if(!this.token){
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refreshToken')
    }
    return !!this.token;
  }

  login(request: AuthRequest){
   return this.httpClient.post<AuthResponse>(
     `${this.baseUsr}login`,
     request
     ).pipe(
       tap(val => this.saveTokens(val))
   )
  }

  refreshAuthToken() {
    return this.httpClient.post<AuthResponse>(
      `${this.baseUsr}refresh`,
      {
        refresh_token: this.refreshToken
      }
    ).pipe(
      tap(val => this.saveTokens(val)),
      catchError(err => {
        this.logout();
        return throwError(err);
      })
    )
  }

  logout(){
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login'])

  }

  saveTokens(res: AuthResponse){
    this.token = res.accessToken;
    this.refreshToken = res.refreshToken;

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refreshToken)
  }

}
