import { Adresse } from './Adresse';
import { HttpClient } from '@angular/common/http';
import { DevisFournisseur } from './../Model/DevisFournisseur';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevisFournisseurService {

  public devisFournisseur: DevisFournisseur = new DevisFournisseur();
  public devisFournisseurs: DevisFournisseur[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(referencedemandeachat: string) {
    return this.httpClient.get<DevisFournisseur[]>(Adresse.host + 'devis/demandeachat/' + referencedemandeachat);
  }

  public chooseDevisFournisseur(referenecedemandeachat: string, devisFournisseur: DevisFournisseur) {
    return this.httpClient.post<DevisFournisseur>(Adresse.host + 'devis/choosedevis/' + referenecedemandeachat, devisFournisseur);
  }
}
