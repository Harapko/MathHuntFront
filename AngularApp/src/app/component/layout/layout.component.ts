import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";
import {async} from "rxjs";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  profileService = inject(ProfileService);

  constructor() {

  }

  ngOnInit(){
    console.log("ngOnInit");
     this.profileService.getUser().subscribe(res => {
        this.profileService.currentUser = res;
        console.log(res);
      },
      error => {
        console.log(error);
      });
    console.log("ngOnInit2");
  }
}
