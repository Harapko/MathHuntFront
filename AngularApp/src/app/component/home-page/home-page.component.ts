import {Component, inject} from '@angular/core';
import {PageUserComponent} from "../page-user/page-user.component";
import {PageHunterComponent} from "../page-hunter/page-hunter.component";
import {ProfileService} from "../../data/services/profile.service";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    PageUserComponent,
    PageHunterComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {



}
