import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PeriodeBudgetaireComponent } from './periode-budgetaire/periode-budgetaire.component';
import {GestiondemandeachatModule} from "./gestiondemandeachat/gestiondemandeachat.module";



@NgModule({
  declarations: [
    AdminComponent,
    UtilisateursComponent,
    PeriodeBudgetaireComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GestiondemandeachatModule
  ]
})
export class AdminModule { }
