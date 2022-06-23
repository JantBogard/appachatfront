import { LoginService } from './../service/LoginService';
import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menu:any[]=[];
  isToggle: boolean = false;
  menuLogindirecteur=[
    {routerLink:"periodebudgetaire",type:"Periode budgetaire",icone:"menu-icon"},
    { routerLink: "demandeachat", type: "Demande Achat", icone: "menu-icon" },
    { routerLink: "article", type: "Article", icone: "menu-icon" },
  ];
  menuLoginadmin=[
    {routerLink:"utilisateur",type:"Gestion des utilisateurs",icone:"menu-icon"},
  ];
  menuLoginAcheteurMetier = [
    { routerLink: "demandeachat", type: "Demandes d'achat", icone: "menu-icon" },
    { routerLink: "bondecommande", type: "Bons de commande", icone: "menu-icon" },
    { routerLink: "article", type: "Articles", icone: "menu-icon" },
  ];
  constructor(public loginService: LoginService) { }

  ngOnInit(): void {

    this.getutilisateur();
  }

  getutilisateur(){
    let jwthelper=new JwtHelperService();
    this.loginService.findByMatriculeOrLoginAndActiveIsTrue(jwthelper.decodeToken(this.loginService.jwt).sub).subscribe(
      data=>{
        this.loginService.utilisateur=data;
        if (data.fonction=="ADMIN"){
          this.menu=this.menuLoginadmin;
        } else if (data.fonction=="DIRECTEUR ACHAT"){
          this.menu=this.menuLogindirecteur
        } else if (data.fonction=="ACHETEUR METIER"){
          this.menu=this.menuLoginAcheteurMetier
        }
      },
      error => {
        this.loginService.router.navigateByUrl("/")
      }
    )
  }

  toggleSideBar() {
    let body = document.querySelector('body');
    this.isToggle = !this.isToggle;
    if (this.isToggle && body !== null) {
      body.classList.add('sidebar-icon-only');
    } else if (body !== null) {
      body.classList.remove('sidebar-icon-only');
    }
  }
}
