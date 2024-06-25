import { Routes } from '@angular/router'
import {LogInComponent} from "./auth/UI/log-in/log-in.component";
import {RegisterComponent} from "./auth/UI/register/register.component";
import {ProfileComponent} from "./user/UI/Profile/profile.component";
import {canActivateAuth} from "./auth/core/access.guard";
import {LayoutComponent} from "./Shared/UI/layout/layout.component";
import {HomePageComponent} from "./Shared/UI/home-page/home-page.component";
import {PageHunterComponent} from "./user/UI/page-hunter/page-hunter.component";
import {PageUserComponent} from "./user/UI/page-user/page-user.component";
import {PageAdminComponent} from "./user/UI/page-admin/page-admin.component";


export const routes: Routes = [
  {
    path: '' , component: LayoutComponent, children: [

      {path: 'profile/:name' , component: ProfileComponent},
      {path: '' , component: HomePageComponent},
      {path: 'hunter-page' , component: PageHunterComponent},
      {path: 'user-page' , component: PageUserComponent},
      {path: 'admin-page' , component: PageAdminComponent},
    ],
    canActivate: [canActivateAuth]
  },
   {path: 'login' , component: LogInComponent },
   {path: 'register' , component: RegisterComponent},
];



