import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionbudgetaireComponent } from './gestionbudgetaire.component';
import { PeriodebudgetaireComponent } from './periodebudgetaire/periodebudgetaire.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    GestionbudgetaireComponent,
    PeriodebudgetaireComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GestionbudgetaireModule { }
