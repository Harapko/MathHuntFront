import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";

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


  profileService = inject(ProfileService);
  ngOnInit(){
    console.log("ngOnInit")
    this.profileService.getUser().subscribe(res => {
        console.log(res)
      },
      error => {
        console.log(error)
      })
    console.log("ngOnInit2")

  }


  showLogin = signal(false);
  loginPosition = signal({ top: 0, left: 0 });
  isVisible: any;
  resetTimer = signal<any | null>(null);

  toggleLogin(event: MouseEvent) {
    this.showLogin.set(!this.showLogin());
    if (this.showLogin()) {
      const loginElement = document.querySelector('.login') as HTMLElement;
      const loginRect = loginElement.getBoundingClientRect();
      const offsetLeft = loginElement.offsetLeft;
      this.loginPosition.set({
        top: loginRect.bottom + 30,
        left: loginRect.left - 222
      });
    }
  }


}
