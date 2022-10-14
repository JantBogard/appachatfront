import { Adresse } from './Adresse';
import { DemandeAchat } from './../Model/demande-achat.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DevisFournisseur } from "../Model/DevisFournisseur";

@Injectable({
  providedIn: 'root'
})
export class DemandeAchatService {

  public demandeAchats: DemandeAchat[] = [];
  public demandeAchat: DemandeAchat = new DemandeAchat();

  constructor(private httpClient: HttpClient) { }

  /**
   * Cette fonction permet de récupérer toutes les demandes d'achat
   * @returns DemandeAchat[]
   */
  public getAll() {
    return this.httpClient.get<DemandeAchat[]>(Adresse.host + 'demandeachat/all');
  }

  /**
   * This function get all "demandes d'achat" by reference "Acheteur Metier"
   * @param reference
   * @returns DemandeAchat[]
   */
  public getAllByReferenceAcheteurMetier(reference: string) {
    return this.httpClient.get<DemandeAchat[]>(Adresse.host + 'demandeachat/allByAcheteurMetier/' + reference);
  }

  /**
   * Cette fonction permet de créer une demande d'achat
   * @param demandeAchat DemandeAchat
   * @returns DemandeAchat
   */
  public save(demandeAchat: DemandeAchat) {
    return this.httpClient.post<DemandeAchat>(Adresse.host + 'demandeachat/save', demandeAchat);
  }

  /**
   * Cette fonction permet de créer une demande d'achat avec ses lignes de demande d'achat
   * @param demandeAchat DemandeAchat
   * @returns DemandeAchat
   */
  public saveWithLigne(demandeAchat: DemandeAchat) {
    return this.httpClient.post<DemandeAchat>(Adresse.host + 'demandeachat/saveWithLigne', demandeAchat);
  }
  public generenumero(matriculeAcheteurmetier: string) {
    return this.httpClient.get<DemandeAchat>(Adresse.host + 'demandeachat/generenumero/' + matriculeAcheteurmetier);
  }

  /**
   * Cette fonction permet de recuperer une demande d'achat par sa reference
   * @param reference string
   * @returns DemandeAchat
   */
  public getByReference(reference: string) {
    return this.httpClient.get<DemandeAchat>(Adresse.host + 'demandeachat/reference/' + reference);
  }
  public getDevisValideByReferenceDA(reference: string) {
    return this.httpClient.get<DemandeAchat>(Adresse.host + 'demandeachat/reference/' + reference);
  }
  public saveDevisFournisseur(devisfournisseurs: DevisFournisseur[], referencedemandeachat: string) {
    return this.httpClient.post<DevisFournisseur>(Adresse.host + 'devis/save/' + referencedemandeachat, devisfournisseurs);
  }

  /**
   * Cette fonction permet de valider la demande d'achat
   * @param reference string
   * @param statut string
   * @returns boolean
   */
  public valider(reference: string, statut: string) {
    return this.httpClient.get<boolean>(Adresse.host + 'demandeachat/updatestatut/' + reference + '/' + statut);
  }
}
