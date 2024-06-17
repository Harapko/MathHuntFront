import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../interfaces/Company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private httpClient = inject(HttpClient)
  baseUrl="http://localhost:5117/";

  getUserCompany(userId: string | null) : Observable<Company[]>{
    return this.httpClient.get<Company[]>(`${this.baseUrl}getCompanyByUser/${userId}`)
  }
}
