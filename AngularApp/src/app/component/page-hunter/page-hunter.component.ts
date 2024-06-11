import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
@Component({
  selector: 'app-page-hunter',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './page-hunter.component.html',
  styleUrl: './page-hunter.component.scss'
})
export class PageHunterComponent implements OnInit{
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
        this.allUserList();
    }


    allUserList(){

    }



}
