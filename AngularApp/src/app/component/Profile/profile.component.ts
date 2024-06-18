import {Component, inject, signal} from '@angular/core';
import {ProfileService} from "../../data/services/profile.service";
import {SkillService} from "../../data/services/skill.service";
import {Observable, switchMap} from "rxjs";
import {UserSkill} from "../../data/interfaces/Skill";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Profile} from "../../data/interfaces/Profile";
import {Company} from "../../data/interfaces/Company";
import {CompanyService} from "../../data/services/company.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
  private route = inject(ActivatedRoute);
  private companyService = inject(CompanyService);
  private fb = inject(FormBuilder);

  public profileService = inject(ProfileService)
  public companyFG!: FormGroup;
  private userId: string | null = '';


  public userProfile$?: Observable<Profile>;
  public userSkillList$?: Observable<UserSkill[]>;
  public userCompanyList$?: Observable<Company[]>;

  isAddCompany = signal<boolean>(false)


  ngOnInit(): void {
    this.getUserId();
    this.getUserInfo();
    this.userCompanyList$ = this.companyService.getUserCompany(this.userId);
    this.companyForm();
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

  private companyForm(){
    this.companyFG = this.fb.group({
      tradeName: ['', Validators.required],
      dataStart: ['', Validators.required],
      dataEnd: ['', Validators.required],
      positionUser: ['', Validators.required],
      descriptionUsersWork: ['', Validators.required],
      link: ['', Validators.required],
      appUserId: ['', Validators.required],
    })

    this.profileService.currentUser$.subscribe(res =>{
      this.companyFG.patchValue({appUserId: res.id})
    })
  }






}
