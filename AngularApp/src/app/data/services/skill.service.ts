import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {DeleteSkillToUser, Skill, UserSkill} from "../interfaces/Skill";
import {FormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private baseUrl="http://localhost:5117/";
  private httpClient = inject(HttpClient);

  getSkill() : Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(`${this.baseUrl}getSkill`)
  }

  getUserSkill(userName: string | undefined) : Observable<UserSkill[]>{
    return this.httpClient.get<UserSkill[]>(`${this.baseUrl}getSkillByUser/${userName}`)
  }

  addSkillToUser(skillData: FormBuilder) : Observable<string>{
    return this.httpClient.post<string>(`${this.baseUrl}addSkillToUser`, skillData)
  }

  deleteSkillToUser(userId: string | undefined, skillName: string) : Observable<string>{
    return this.httpClient.delete<string>(`${this.baseUrl}deleteUsersSkill/${userId}/${skillName}`)
  }

}
