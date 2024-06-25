import {Component, inject, signal} from '@angular/core';
import {PageUserComponent} from "../../../user/UI/page-user/page-user.component";
import {PageHunterComponent} from "../../../user/UI/page-hunter/page-hunter.component";
import {ProfileService} from "../../../user/core/profile.service";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {SkillService} from "../../../user/core/skill.service";
import {UserBySkill} from "../../../user/interface/userBySkill";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    PageUserComponent,
    PageHunterComponent,
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  public skillService = inject(SkillService);
  private fb = inject(FormBuilder);
  public profileService = inject(ProfileService);

  public isInput = signal<boolean>(false);

  ngOnInit(){
    this.getSkill();
  }

  getSkill(){
    this.skillService.skillList$ = this.skillService.getUserBySkill(this.skillService.skillName)
  }

  public searchForm = this.fb.nonNullable.group({
    skillName: ['']
  })

  public onSearchSubmit(){
    this.skillService.skillName = this.searchForm.value.skillName ?? ''
    this.getSkill();
  }

  public  onBlur() {
    setTimeout(() => {
      this.isInput.set(false);
      this.skillService.skillList$ = null;
    }, 100);
  }

}
