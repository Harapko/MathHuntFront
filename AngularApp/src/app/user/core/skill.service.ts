import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Skill} from "../interface/skill";
import {FormBuilder} from "@angular/forms";
import {UserSkill} from "../interface/userSkill.interface";
import {UserBySkill} from "../interface/userBySkill";

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private baseUrl="http://localhost:5117/";
  private httpClient = inject(HttpClient);
  public skillList$!: Observable<UserBySkill[]> | null;
  public skillName: string = '';



  getSkill() : Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(`${this.baseUrl}getSkill`)
  }

  getUserSkill(userName: string | undefined) : Observable<UserSkill[]>{
    return this.httpClient.get<UserSkill[]>(`${this.baseUrl}getSkillByUser/${userName}`)
  }

  getUserBySkill(skillName: string) : Observable<UserBySkill[]>{
    return this.httpClient.get<UserBySkill[]>(`${this.baseUrl}getUsersBySkill?skillName=${skillName}`)
  }

  addSkillToUser(skillData: FormBuilder) : Observable<string>{
    return this.httpClient.post<string>(`${this.baseUrl}addSkillToUser`, skillData)
  }

  deleteSkillToUser(userId: string | undefined, skillName: string) : Observable<string>{
    return this.httpClient.delete<string>(`${this.baseUrl}deleteUsersSkill/${userId}/${skillName}`)
  }

}
