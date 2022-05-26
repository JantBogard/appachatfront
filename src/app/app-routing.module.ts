import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthentificatyComponent} from "./authentificaty/authentificaty.component";
import {LoginComponent} from "./authentificaty/login/login.component";
import {RegisterComponent} from "./authentificaty/register/register.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path:'',
    component:AuthentificatyComponent,
    children:[
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent}
    ]
  },
  {
    path:'',
    component:AdminComponent,
    children:[
      {path:'admin',component:AdminComponent},
      {path:'register',component:RegisterComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
