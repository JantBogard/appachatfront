import { Utilisateur } from './../Model/Utilisateur';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adresse } from './Adresse';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public utilisateurs: Utilisateur[] = [];

  constructor(private httpClient: HttpClient) { }

  getAllUtilisateurs() {
    return this.httpClient.get<Utilisateur[]>(Adresse.host + 'utilisateur/all');
  }

  getUtilisateur(login: string) {
    return this.httpClient.get<Utilisateur>(Adresse.host + 'get/' + login);
  }

  saveUtilisateur(utilisateur: Utilisateur) {
    return this.httpClient.post<Utilisateur>(Adresse.host + 'utilisateur/save', utilisateur, { observe: 'response' });
  }
}
