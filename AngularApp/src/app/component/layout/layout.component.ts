import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";
import {Profile} from "../../data/interfaces/Profile";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
currentUser?: Profile;

  profileService = inject(ProfileService);
  ngOnInit(){
    console.log("ngOnInit")
    this.profileService.getUser().subscribe(res => {
      this.currentUser = res;
        console.log(res)
      },
      error => {
        console.log(error)
      })
    console.log("ngOnInit2")

  }





}
