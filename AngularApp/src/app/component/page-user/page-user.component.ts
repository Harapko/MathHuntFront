import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {ProfileService} from "../../data/services/profile.service";
import {Skill, UserSkill} from "../../data/interfaces/Skill";
import {SkillService} from "../../data/services/skill.service";
import {Observable, switchMap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-page-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './page-user.component.html',
  styleUrl: './page-user.component.scss'
})

export class PageUserComponent implements OnInit {
  private skillService = inject(SkillService);
  private fb = inject(FormBuilder)
  public authService = inject(AuthService);
  public profileService = inject(ProfileService);

  public skillList$?: Observable<Skill[]>;
  public userSkillList$?: Observable<UserSkill[]> | null;
  public addSkillForm!: FormGroup;
  public isBlockVisible: boolean = false;


  proficiencyLevel: string[] = [
    "Novice",
    "Intermediate",
    "Advanced",
    "Expert"
  ]



  ngOnInit(): void {
    this.skillList$ = this.skillService.getSkill();
    this.loadUserSkill();
    this.formBuild();


    const trigger = document.getElementById("trigger");
    const list = document.getElementById("list");

    if (trigger) {
      trigger.addEventListener("click", () => {
        if (list) {
          list.style.display = (list.style.display === "none") ? "block" : "none";
        }
      });
    }

  }

  public formBuild(){
    this.addSkillForm = this.fb.group({
      userName: ['', Validators.required],
      skillName: ['', Validators.required],
      proficiencyLevel: ['', Validators.required],
    })

    this.profileService.currentUser$.subscribe(res => {
      this.addSkillForm.patchValue({userName: res.name})
    })
  }



  onSubmit(){
     this.skillService.addSkillToUser(this.addSkillForm.value)
      .subscribe(res => {
        console.log("res", res);
          this.loadUserSkill();
      },
        error => {
        console.log(error)
        })
  }

  deleteUserSkill(userId: string, skillName: string){
    this.skillService.deleteSkillToUser(userId, skillName)
      .subscribe(res => {
        console.log(res)
          this.loadUserSkill();
      },
        error => {
        console.log(error)
        })
  }


  public loadUserSkill(){
    this.userSkillList$ = null;
    this.userSkillList$ = this.profileService.currentUser$.pipe(
      switchMap((res) => this.skillService.getUserSkill(res.name))
    )
  }

  public toggleBlock() {
    this.isBlockVisible = !this.isBlockVisible;
  }



}
