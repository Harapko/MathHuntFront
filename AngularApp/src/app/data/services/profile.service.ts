import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/Profile";
import {Observable} from "rxjs";
import {FormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private httpClient = inject(HttpClient)
  private baseUrl = "http://localhost:5117/"
  public currentUser$!: Observable<Profile>;


  getAllUser() : Observable<Profile[]>{
    return this.httpClient.get<Profile[]>(`${this.baseUrl}getUser`)
  }

  getUser() {
    return this.httpClient.get<Profile>('http://localhost:5117/getCurrentUser')
  }

  getUserBuId(id: string | null) : Observable<Profile>{
    return this.httpClient.get<Profile>(`${this.baseUrl}getUserById/${id}`)
  }

  putUpdateUser(data: FormBuilder, userId: string | null) : Observable<string>{
    return this.httpClient.put<string>(`${this.baseUrl}updateUser/${userId}`, data)
  }




}
