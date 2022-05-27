import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';



@NgModule({
  declarations: [
    AdminComponent,
    UtilisateursComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AdminModule { }
