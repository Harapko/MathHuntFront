import {Component, inject, signal} from '@angular/core';
import {ProfileService} from "../../data/services/profile.service";
import {SkillService} from "../../data/services/skill.service";
import {Observable, switchMap} from "rxjs";
import {Skill, UserSkill} from "../../data/interfaces/Skill";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Profile} from "../../data/interfaces/Profile";
import {Company} from "../../data/interfaces/Company";
import {CompanyService} from "../../data/services/company.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../../auth/auth.service";
import e from "express";

@Component({
  selector: 'app-Profile',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './Profile.component.scss'
})
export class ProfileComponent {
  private skillService = inject(SkillService);
  private companyService = inject(CompanyService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  public profileService = inject(ProfileService)
  public companyFG!: FormGroup;
  public addSkillCompanyFG!: FormGroup;
  public updateUserFG!: FormGroup;
  private userId: string | null = '';


  public userProfile$?: Observable<Profile> | null;
  public currentUser$?: Observable<Profile>;
  public skillList$?: Observable<Skill[]>;
  public userSkillList$?: Observable<UserSkill[]>;
  public userCompanyList$?: Observable<Company[]> | null;



  isAddCompanyVisible = signal<boolean>(false);
  isInfoCompanyVisible = signal<boolean>(false);
  isUpdateUserVisible = signal<boolean>(true);


  ngOnInit(): void {
    this.skillList$ = this.skillService.getSkill();
    this.getUserId();
    this.getUserInfo();
    this.addCompanyForm();
    this.addSkillCompany("");
    this.putUpdateUser()
  }

  private getUserInfo() {
    this.userProfile$ = this.profileService.getUserBuId(this.userId);
    this.currentUser$ = this.profileService.currentUser$;
    this.userSkillList$ = this.userProfile$.pipe(
      switchMap((user) => this.skillService.getUserSkill(user.name))
    )
    this.loadCompanyList();
  }

  private getUserId(){
    this.route.paramMap.subscribe(params => {
        this.userId = params.get('name');
      },
      error => {
        console.log(error)
      });
  }



  private addCompanyForm(){
    this.companyFG = this.fb.group({
      tradeName: ['', Validators.required],
      dataStart: ['', Validators.required],
      dataEnd: ['', Validators.required],
      positionUser: ['', Validators.required],
      descriptionUsersWork: ['', Validators.required],
      link: ['', Validators.required],
      appUserId: ['', Validators.required],
    })

      this.companyFG.patchValue({appUserId: this.userId})
  }

  private addSkillCompany(companyId: string){
    this.addSkillCompanyFG = this.fb.group({
      companyId: [`${companyId}`, Validators.required],
      skillId: ['', Validators.required],
    })
  }

  private putUpdateUser(){
    this.updateUserFG = this.fb.group({
      // userName: ['', Validators.required],
      userSurname: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      englishLevel: [''],
      gitHubLink: [''],
      descriptionSkill: [''],
    })

    this.userProfile$?.subscribe(res => {
      // this.updateUserFG.patchValue({userName: res.name})
      this.updateUserFG.patchValue({userSurname: res.surname})
      this.updateUserFG.patchValue({email: res.email})
      this.updateUserFG.patchValue({phoneNumber: res.phoneNumber})
      this.updateUserFG.patchValue({englishLevel: res.englishLevel})
      this.updateUserFG.patchValue({gitHubLink: res.gitHubLink})
      this.updateUserFG.patchValue({descriptionSkill: res.descriptionSkill})
    })
  }

  public addCompanySubmit(){
    if (this.companyFG.valid){
    this.companyService.addUserCompany(this.companyFG.value)
      .subscribe(res => {
        this.loadCompanyList()

      },
        error => {
        console.log(error)
        })
    }

  }

  public addCompanySkillSubmit(companyId: string){
    this.addSkillCompanyFG.patchValue({companyId: companyId});
    this.companyService.addSkillToCompany(this.addSkillCompanyFG.value)
      .subscribe(res => {
        this.loadCompanyList()
        console.log(this.addSkillCompanyFG.value)
      }, error => {
        console.log(error)
      })
  }

  public putUpdateUserSubmit(){
    this.profileService.putUpdateUser(this.updateUserFG.value, this.userId)
      .subscribe(res => {
        this.loadCompanyList()
      }, error => {
        console.log(error)
      })
  }



  public deleteCompany(companyId: string){
    this.companyService.deleteCompany(companyId)
      .subscribe(res => {
        this.loadCompanyList()
      }, error => {
        console.log(error)
      })
  }

  public deleteCompanySkill(companyId: string, skillName: string){
    this.companyService.deleteSkillCompany(companyId, skillName)
      .subscribe(res => {
        this.loadCompanyList();
      },error => {
        console.log(error)
      })
  }

  private loadCompanyList(){
    this.userCompanyList$ = null;
    this.userCompanyList$ = this.companyService.getUserCompany(this.userId);

    this.userProfile$ = null;
    this.userProfile$ = this.profileService.getUserBuId(this.userId);
  }




}
