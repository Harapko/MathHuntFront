import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../auth/core/auth.service";
import {Observable} from "rxjs";
import {Profile} from "../../interface/profile";
import {ProfileService} from "../../core/profile.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-page-admin',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './page-admin.component.html',
  styleUrl: './page-admin.component.scss'
})
export class PageAdminComponent {
  public authService = inject(AuthService)
  public profileService = inject(ProfileService)
  public userList$!: Observable<Profile[]>


  ngOnInit(){
    this.userList$ = this.profileService.getAllUser();
  }

  blockUser(userName: string){
    this.profileService.postBanUser(userName)
      .subscribe(res => {
        console.log(res);
        this.userList$ = this.profileService.getAllUser();
      })
  }



}
