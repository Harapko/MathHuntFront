import {Component, ElementRef, inject, Input, OnInit, signal, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, switchMap} from "rxjs";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SkillService} from "../../core/skill.service";
import {AuthService} from "../../../auth/core/auth.service";
import {ProfileService} from "../../core/profile.service";
import {UserSkill} from "../../interface/userSkill.interface";
import {Skill} from "../../interface/skill";

@Component({
  selector: 'app-page-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './page-user.component.html',
  styleUrl: './page-user.component.scss'
})

export class PageUserComponent implements OnInit {

  public defaultImageSrc: string = '/assets/photo/user-logo.png';

  private skillService = inject(SkillService);
  private fb = inject(FormBuilder)
  public authService = inject(AuthService);
  public profileService = inject(ProfileService);

  public skillList$?: Observable<Skill[]>;
  public userSkillList$?: Observable<UserSkill[]> | null;
  public addSkillFB!: FormGroup;
  public addPhotoFB!: FormGroup;
  public isBlockVisible = signal<boolean>(false);


  proficiencyLevel: string[] = [
    "Novice",
    "Intermediate",
    "Advanced",
    "Expert"
  ]


  ngOnInit(): void {
    this.skillList$ = this.skillService.getSkill();
    this.loadUserSkill();
    this.addSkillForm();
    this.addPhotoForm();


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

  private addSkillForm() {
    this.addSkillFB = this.fb.group({
      userName: ['', Validators.required],
      skillName: ['', Validators.required],
      proficiencyLevel: ['', Validators.required],
    })

    this.profileService.currentUser$.subscribe(res => {
      this.addSkillFB.patchValue({userName: res.name})
    })
  }


  private addPhotoForm() {
    this.addPhotoFB = this.fb.group({
      path: ['', Validators.required],
      appUserId: ['', Validators.required],
    })

    this.profileService.currentUser$
      .subscribe(res => {
        this.addPhotoFB.patchValue({appUserId: res.id})
      })

  }

  public addSkillSubmit() {
    this.skillService.addSkillToUser(this.addSkillFB.value)
      .subscribe(res => {
          console.log("res", res);
          this.loadUserSkill();
        },
        error => {
          console.log(error)
        })
  }

  public deleteUserSkill(userId: string, skillName: string) {
    this.skillService.deleteSkillToUser(userId, skillName)
      .subscribe(res => {
          console.log(res)
          this.loadUserSkill();
        },
        error => {
          console.log(error)
        })
  }


  public loadUserSkill() {
    this.userSkillList$ = null;
    this.userSkillList$ = this.profileService.currentUser$.pipe(
      switchMap((res) => this.skillService.getUserSkill(res.name))
    )

  }

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;

  public triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  public onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const path = input.files[0];
      console.log('Selected file:', path.name);

      // Create FormData and append the file and other form data
      const formData = new FormData();
      formData.append('path', path);
      // @ts-ignore
      formData.append('appUserId', this.addPhotoFB.get('appUserId').value);

      // Send the form data
      this.profileService.putUpdateUserPhoto(formData).subscribe(res => {
        this.defaultImageSrc = ''
        this.profileService.currentUser$ = this.profileService.getUser();

        console.log(res);
      }, error => {
        console.log(error);
      });
    }
  }

  public setDefaultImage(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = this.defaultImageSrc;
  }


}
