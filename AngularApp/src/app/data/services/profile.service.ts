import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/Profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpClient = inject(HttpClient)
  baseUrl = "http://localhost:5117/"

  constructor() { }

  getUser(){
    return this.httpClient.get<Profile>(`http://localhost:5117/getCurrentUser`)
  }
}
