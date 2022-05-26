import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificatyComponent } from './authentificaty.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";



@NgModule({
  declarations: [
    AuthentificatyComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  providers:[
  ]
})
export class AuthentificatyModule { }
