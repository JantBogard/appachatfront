import { Adresse } from './Adresse';
import { DemandeAchat } from './../Model/demande-achat.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  /**
   * Cette fonction permet de recuperer une demande d'achat par sa reference
   * @param reference string
   * @returns DemandeAchat
   */
  public getByReference(reference: string) {
    return this.httpClient.get<DemandeAchat>(Adresse.host + 'demandeachat/reference/' + reference);
  }
}
