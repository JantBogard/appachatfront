import { LoginService } from './../../service/LoginService';
import { BonCommandeService } from './../../service/bon-commande.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-bon-commande',
  templateUrl: './gestion-bon-commande.component.html',
  styleUrls: ['./gestion-bon-commande.component.scss']
})
export class GestionBonCommandeComponent implements OnInit {

  constructor(
    public bonCommandeService: BonCommandeService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getAllBonCommande();
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
