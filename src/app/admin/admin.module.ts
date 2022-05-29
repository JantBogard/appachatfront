import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ReactiveFormsModule } from '@angular/forms';
import {GestionbudgetaireComponent} from "./gestionbudgetaire/gestionbudgetaire.component";
import {GestionbudgetaireModule} from "./gestionbudgetaire/gestionbudgetaire.module";



@NgModule({
  declarations: [
    AdminComponent,
    UtilisateursComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GestionbudgetaireModule,
  ]
})
export class AdminModule { }
