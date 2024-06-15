import {AfterContentInit, AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {ProfileService} from "../../data/services/profile.service";
import {Skill, UserSkill} from "../../data/interfaces/Skill";
import {SkillService} from "../../data/services/skill.service";
import {delay, map, Observable, of, switchMap, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Profile} from "../../data/interfaces/Profile";

@Component({
  selector: 'app-page-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './page-user.component.html',
  styleUrl: './page-user.component.scss'
})

export class PageUserComponent implements OnInit {
  public authService = inject(AuthService);
  public skillService = inject(SkillService);
  public profileService = inject(ProfileService);

  public skillList$?: Observable<Skill[]>;
  public userSkillList?: UserSkill[];
  public currentUser?: Profile;
  public userRefresh?: Observable<Profile>;
  public addSkillForm!: FormGroup;

  proficiencyLevel: string[] = [
    "Novice",
    "Intermediate",
    "Advanced",
    "Expert"
  ]


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

constructor() {

  }

  getUserAndLoadSkills() {
    this.getUser().pipe(
      switchMap(user => {
        return this.skillList(user.name).pipe(
          tap(() => this.addForm(user.name))
        );
      })
    ).subscribe();
  }
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

  skillList(userName: string) {
    return this.skillService.getUserSkill(userName).pipe(
      tap(res => {
        console.log("dosmth", this.currentUser);
        this.userSkillList = res;
      })
    )
  }




  public addForm(userName: string) {
    this.addSkillForm = new FormGroup({
      userName: new FormControl(`${userName}`, Validators.required),
      skillName: new FormControl('', Validators.required),
      proficiencyLevel: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    return this.skillService.addSkillToUser(this.addSkillForm.value)
      .subscribe(res => {
        console.log(res);
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
