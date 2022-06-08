import { LoginService } from './../../service/LoginService';
import { BonCommandeService } from './../../service/bon-commande.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestionboncommande',
  templateUrl: './gestionboncommande.component.html',
  styleUrls: ['./gestionboncommande.component.scss']
})
export class GestionboncommandeComponent implements OnInit {

  constructor(
    public bonCommandeService: BonCommandeService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  public getAllBonCommande() {
    this.bonCommandeService.getAll().subscribe(
      data => {
        this.bonCommandeService.bonCommandes = data;
      },
      error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement des bon commandes');
      }
    );
  }

}
