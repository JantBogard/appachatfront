import { DemandeAchatComponent } from './admin/gestion-demande-achat/demande-achat/demande-achat.component';
import { GestionDemandeAchatComponent } from './admin/gestion-demande-achat/gestion-demande-achat.component';
import {UtilisateursComponent} from './admin/utilisateurs/utilisateurs.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthentificatyComponent} from "./authentificaty/authentificaty.component";
import {LoginComponent} from "./authentificaty/login/login.component";
import {RegisterComponent} from "./authentificaty/register/register.component";
import {AdminComponent} from "./admin/admin.component";
import {GestionbudgetaireComponent} from "./admin/gestionbudgetaire/gestionbudgetaire.component";
import {PeriodebudgetaireComponent} from "./admin/gestionbudgetaire/periodebudgetaire/periodebudgetaire.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: '',
    component: AuthentificatyComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'utilisateur', component: UtilisateursComponent},
      {
        path: '',
        component: GestionbudgetaireComponent,
        children:[
          {path:"periodebudgetaire",component:PeriodebudgetaireComponent}
        ]

      },
      {
        path: '',
        component: GestionDemandeAchatComponent,
        children:[
          { path: "demandeachat", component: DemandeAchatComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
