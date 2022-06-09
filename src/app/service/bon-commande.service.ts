import { Adresse } from './Adresse';
import { HttpClient } from '@angular/common/http';
import { BonCommande } from './../Model/bon-commande.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BonCommandeService {

  public bonCommandes: BonCommande[] = [];
  public bonCommande: BonCommande = new BonCommande();

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Cette fonction permet de récupérer tous les bon commandes
   * @returns BonCommande[]
   */
  public getAll() {
    return this.httpClient.get<BonCommande[]>(Adresse.host + 'bondecommande/allactive');
  }
}
