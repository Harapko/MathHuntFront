import {Component, inject} from '@angular/core';
import {ProfileService} from "../../data/services/profile.service";
import {SkillService} from "../../data/services/skill.service";
import {Observable, switchMap} from "rxjs";
import {UserSkill} from "../../data/interfaces/Skill";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Profile} from "../../data/interfaces/Profile";
import {Company} from "../../data/interfaces/Company";
import {CompanyService} from "../../data/services/company.service";

@Component({
  selector: 'app-Profile',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './Profile.component.scss'
})
export class ProfileComponent {
  private skillService = inject(SkillService);
  private route = inject(ActivatedRoute);
  private companyService = inject(CompanyService);

  public profileService = inject(ProfileService)
  private userId: string | null = '';


  public userProfile$?: Observable<Profile>;
  public userSkillList$?: Observable<UserSkill[]>;
  public userCompanyList$?: Observable<Company[]>;


  ngOnInit(): void {
    this.getUserId();
    this.getUserInfo();
    this.userCompanyList$ = this.companyService.getUserCompany(this.userId);
  }

  getUserInfo() {
        this.userProfile$ = this.profileService.getUserBuId(this.userId);
        this.userSkillList$ = this.userProfile$.pipe(
          switchMap((user) => this.skillService.getUserSkill(user.name))
        )
  }

  getUserId(){
    this.route.paramMap.subscribe(params => {
        this.userId = params.get('name');
        console.log(this.userId);
      },
      error => {
        console.log(error)
      });
  }






}
