import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {ProfileService} from "../../data/services/profile.service";
import {DeleteSkillToUser, Skill, UserSkill} from "../../data/interfaces/Skill";
import {SkillService} from "../../data/services/skill.service";
import {Observable, of, switchMap, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Profile} from "../../data/interfaces/Profile";
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
  private profileService = inject(ProfileService);
  private fb = inject(FormBuilder)
  public authService = inject(AuthService);

  public skillList$?: Observable<Skill[]>;
  public userSkillList: UserSkill[] = [];
  public currentUser?: Profile;
  public addSkillForm!: FormGroup;

  proficiencyLevel: string[] = [
    "Novice",
    "Intermediate",
    "Advanced",
    "Expert"
  ]



  ngOnInit(): void {
    this.getUserAndLoadSkills();
    this.skillList$ = this.skillService.getSkill();





    const trigger = document.getElementById("trigger");
    const list = document.getElementById("list");
    const option1 = document.getElementById("option1") as HTMLInputElement;
    const option2 = document.getElementById("option2") as HTMLInputElement;

    if (trigger) {
      trigger.addEventListener("click", () => {
        if (list) {
          list.style.display = (list.style.display === "none") ? "block" : "none";
        }
      });
    }

    if (option1) {
      option1.addEventListener("change", () => {
        if (option1.checked) {
          console.log("Опція 1 обрана");
          // Додайте код, який потрібно виконати, коли опція 1 обрана
        } else {
          console.log("Опція 1 скасована");
          // Додайте код, який потрібно виконати, коли опція 1 скасована
        }
      });
    }

    if (option2) {
      option2.addEventListener("change", () => {
        if (option2.checked) {
          console.log("Опція 2 обрана");
          // Додайте код, який потрібно виконати, коли опція 2 обрана
        } else {
          console.log("Опція 2 скасована");
          // Додайте код, який потрібно виконати, коли опція 2 скасована
        }
      });
    }


  }

  getUser() {

    if (this.profileService.currentUser == undefined) {
      return this.profileService.getUser().pipe(
        tap(res => {
          this.currentUser = res;
          console.log("firs", this.currentUser);
        })
      );
    } else {
      this.currentUser = this.profileService.currentUser;
      console.log("sec");
      return of(this.currentUser);
    }
  }

  skillList(userName: string) {
    return this.skillService.getUserSkill(userName).pipe(
      tap(res => {
        this.userSkillList = res;
      })
    )
  }

  public formBuild(userName: string){
    this.addSkillForm = this.fb.group({
      userName: [`${userName}`, Validators.required],
      skillName: ['', Validators.required],
      proficiencyLevel: ['', Validators.required],
    })
  }

  getUserAndLoadSkills() {
    this.getUser().pipe(
      switchMap(user => {
        return this.skillList(user.name).pipe(
          tap(() => this.formBuild(user.name))
        );
      })
    ).subscribe();
  }




  onSubmit(){
     this.skillService.addSkillToUser(this.addSkillForm.value)
      .subscribe(res => {
        console.log("res");
        console.log(this.addSkillForm.controls['skillName'].value);
          this.userSkillList = [...this.userSkillList, this.addSkillForm.value];
      },
        error => {
        console.log(error)
        })
  }

  deleteUserSkill(skillName: string){
    this.skillService.deleteSkillToUser(this.currentUser?.id, skillName)
      .subscribe(res => {
        console.log(res)
          this.userSkillList = this.userSkillList.filter(skill => skill.skillName !== skillName);
      },
        error => {
        console.log(error)
        })
  }



  isBlockVisible: boolean = false;

  toggleBlock() {
    this.isBlockVisible = !this.isBlockVisible;
  }



}
