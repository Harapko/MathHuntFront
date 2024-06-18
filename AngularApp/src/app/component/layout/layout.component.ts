import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";
import {async} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  profileService = inject(ProfileService);

  constructor() {

  }

  ngOnInit(){
     this.profileService.currentUser$ = this.profileService.getUser();
     console.log(this.profileService.currentUser$)
  }
}
