import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/Profile";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpClient = inject(HttpClient)
  baseUrl = "http://localhost:5117/"
  currentUser?: Profile;

  constructor() { }

  getUser() {
    return this.httpClient.get<Profile>(`http://localhost:5117/getCurrentUser`)
  }


}
