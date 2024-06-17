import {Component, inject} from '@angular/core';
import {ProfileService} from "../../data/services/profile.service";
import {SkillService} from "../../data/services/skill.service";
import {Observable} from "rxjs";
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


  public userProfile?: Profile;
  public userSkillList$?: Observable<UserSkill[]>;
  public userCompanyList$?: Observable<Company[]>;


      ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          this.userId = params.get('name');
          console.log(this.userId);
        },
          error => {
          console.log(error)
          });
        console.log(this.profileService.currentUser?.name)
        this.getUser();
        this.userCompanyList$ = this.companyService.getUserCompany(this.userId);
      }

  getUser() {
    this.profileService.getUserBuId(this.userId).subscribe(res => {
      this.userProfile = res;
      this.userSkillList$ = this.skillService.getUserSkill(res.name);
      console.log("prof", res)
    }, error => {
      console.log(error)
    })

  }






}
