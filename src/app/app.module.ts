import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthentificatyModule} from "./authentificaty/authentificaty.module";
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "./service/LoginService";
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthentificatyModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    AdminModule,
    ModalModule.forRoot()
  ],
  providers: [
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
