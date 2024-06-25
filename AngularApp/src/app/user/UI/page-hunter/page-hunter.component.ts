import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {AuthService} from "../../../auth/core/auth.service";
import {ProfileService} from "../../core/profile.service";
import {Profile} from "../../interface/profile";
import {LoadSkillComponent} from "../../../Shared/UI/load-skill/load-skill.component";
@Component({
  selector: 'app-page-hunter',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    LoadSkillComponent
  ],
  templateUrl: './page-hunter.component.html',
  styleUrl: './page-hunter.component.scss'
})
export class PageHunterComponent implements OnInit{
  public authService = inject(AuthService);
  public profileService = inject(ProfileService);

  public userList$?: Observable<Profile[]>;

  ngOnInit(): void {
    this.userList$ = this.profileService.getAllUser()
  }


}
