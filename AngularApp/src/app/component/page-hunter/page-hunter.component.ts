import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {ProfileService} from "../../data/services/profile.service";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {Profile} from "../../data/interfaces/Profile";
import {SkillService} from "../../data/services/skill.service";
import {Skill} from "../../data/interfaces/Skill";
import {LoadSillComponent} from "../load-sill/load-sill.component";
@Component({
  selector: 'app-page-hunter',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    LoadSillComponent
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
