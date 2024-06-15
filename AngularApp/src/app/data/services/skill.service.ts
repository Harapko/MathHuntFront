import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Skill, UserSkill} from "../interfaces/Skill";

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  baseUrl="http://localhost:5117/";
  httpClient = inject(HttpClient);

  getSkill() : Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(`${this.baseUrl}getSkill`)
  }

  getUserSkill(userName: string) : Observable<UserSkill[]>{
    return this.httpClient.get<UserSkill[]>(`${this.baseUrl}getSkillByUser/${userName}`)
  }

  addSkillToUser(skillData: FormData) : Observable<string>{
    return this.httpClient.post<string>(`${this.baseUrl}addSkillToUser`, skillData)
  }

}
