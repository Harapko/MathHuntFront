import { Routes } from '@angular/router'
import {HomePageComponent} from "./component/home-page/home-page.component";
import {LogInComponent} from "./component/log-in/log-in.component";
import {RegisterComponent} from "./component/register/register.component";
import {PageUserComponent} from "./component/page-user/page-user.component";
import {PageHunterComponent} from "./component/page-hunter/page-hunter.component";
import {UserComponent} from "./component/user/user.component";
import {PageAdminComponent} from "./component/page-admin/page-admin.component";
import {canActivateAuth} from "./auth/access.guard";
import {LayoutComponent} from "./component/layout/layout.component";


export const routes: Routes = [
  {
    path: '' , component: LayoutComponent, children: [

      {path: 'user-page' , component: PageUserComponent},
      {path: '' , component: HomePageComponent},
      {path: 'hunter-page' , component: PageHunterComponent},
      {path: 'user' , component: UserComponent},
      {path: 'admin-page' , component: PageAdminComponent},
    ],
    canActivate: [canActivateAuth]
  },
   {path: 'login' , component: LogInComponent },
   {path: 'register' , component: RegisterComponent},
];



