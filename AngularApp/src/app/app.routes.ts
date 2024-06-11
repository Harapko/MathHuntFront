import { Routes } from '@angular/router'
import {HomePageComponent} from "./component/home-page/home-page.component";
import {LogInComponent} from "./component/log-in/log-in.component";
import {RegisterComponent} from "./component/register/register.component";
import {PageUserComponent} from "./component/page-user/page-user.component";
import {PageHunterComponent} from "./component/page-hunter/page-hunter.component";
import {UserComponent} from "./component/user/user.component";
import {PageAdminComponent} from "./component/page-admin/page-admin.component";
import {canActivateAuth} from "./auth/access.guard";


export const routes: Routes = [
  {
    path: '' , component: HomePageComponent, children: [

      {path: 'user-page' , component: PageUserComponent},
      {path: 'hunter-page' , component: PageHunterComponent},
      {path: 'user' , component: UserComponent},
      {path: 'home-page' , component: HomePageComponent},
      {path: 'admin-page' , component: PageAdminComponent},
    ],
    canActivate: [canActivateAuth]
  },
   {path: 'login' , component: LogInComponent },
   {path: 'register' , component: RegisterComponent},
];



