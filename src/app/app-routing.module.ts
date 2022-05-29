import { PeriodeBudgetaireComponent } from './admin/periode-budgetaire/periode-budgetaire.component';
import { UtilisateursComponent } from './admin/utilisateurs/utilisateurs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthentificatyComponent} from "./authentificaty/authentificaty.component";
import {LoginComponent} from "./authentificaty/login/login.component";
import {RegisterComponent} from "./authentificaty/register/register.component";
import {AdminComponent} from "./admin/admin.component";
import {GestiondemandeachatComponent} from "./admin/gestiondemandeachat/gestiondemandeachat.component";

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
    path:'admin',
    component:AdminComponent,
    children:[
      {path:'utilisateur',component: UtilisateursComponent},
      {path:'periode-budgetaire',component: PeriodeBudgetaireComponent},
      {path: 'demandeachat',component: GestiondemandeachatComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
