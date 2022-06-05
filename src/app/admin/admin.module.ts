import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { ReactiveFormsModule } from '@angular/forms';
import {GestionbudgetaireComponent} from "./gestionbudgetaire/gestionbudgetaire.component";
import {GestionbudgetaireModule} from "./gestionbudgetaire/gestionbudgetaire.module";
import { GestionBonCommandeComponent } from './gestion-bon-commande/gestion-bon-commande.component';
import { GestionDemandeAchatComponent } from './gestion-demande-achat/gestion-demande-achat.component';
import { DemandeAchatComponent } from './gestion-demande-achat/demande-achat/demande-achat.component';
import { GestionArticlesComponent } from './gestion-articles/gestion-articles.component';



@NgModule({
  declarations: [
    AdminComponent,
    UtilisateursComponent,
    GestionBonCommandeComponent,
    GestionDemandeAchatComponent,
    DemandeAchatComponent,
    GestionArticlesComponent,
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
