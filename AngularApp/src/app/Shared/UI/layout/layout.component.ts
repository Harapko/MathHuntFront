import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {ProfileService} from "../../../user/core/profile.service";
import {BlockUserComponent} from "../block-user/block-user.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    AsyncPipe,
    BlockUserComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  profileService = inject(ProfileService);


  ngOnInit() {
    this.profileService.currentUser$ = this.profileService.getUser();
    console.log(this.profileService.currentUser$)
  }
}
