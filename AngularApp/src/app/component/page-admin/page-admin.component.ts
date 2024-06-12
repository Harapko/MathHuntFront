import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-page-admin',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './page-admin.component.html',
  styleUrl: './page-admin.component.scss'
})
export class PageAdminComponent {
  authService = inject(AuthService);


  isBlockVisible: boolean = false;

  toggleBlock() {
    this.isBlockVisible = !this.isBlockVisible;
  }

  protected readonly AuthService = AuthService;



}
