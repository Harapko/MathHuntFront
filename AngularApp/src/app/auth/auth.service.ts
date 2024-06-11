import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {LoginRequest, LoginResponse} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient)
  cookieService = inject(CookieService)
  baseUsr = "http://localhost:5117/"
  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth(){
    if(!this.token){
      this.token = this.cookieService.get('token')
    }
    return !!this.token;
  }

  login(request: LoginRequest){
   return this.httpClient.post<LoginResponse>(
     `${this.baseUsr}login`,
     request
     ).pipe(
       tap(val => {
         this.token = val.accessToken;
         this.refreshToken = val.refreshToken;

         this.cookieService.set('token', this.token)
         this.cookieService.set('refreshToken', this.refreshToken)
       })
   )
  }







































  // logout(){
  //   localStorage.removeItem('accessToken')
  //   this.userService.logoutUser();
  //   this.router.navigate(['/home-page'])
  // }

}
