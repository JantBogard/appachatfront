import { RegisterDto } from './../Model/RegisterDto.model';
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

  saveUtilisateur(utilisateur: RegisterDto) {
    return this.httpClient.post<RegisterDto>(Adresse.host + 'utilisateur/save', utilisateur, { observe: 'response' });
  }
}
