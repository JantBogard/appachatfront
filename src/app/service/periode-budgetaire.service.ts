import { Adresse } from './Adresse';
import { PeriodeBudgetaire } from './../Model/periode-budgetaire.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginService} from "./LoginService";
import {LigneBudgetaire} from "../Model/LigneBudgetaire";

@Injectable({
  providedIn: 'root'
})
export class PeriodeBudgetaireService {

  public periodeBudgetaires: PeriodeBudgetaire[] = [];

  constructor(private httpClient: HttpClient,public loginService:LoginService) { }

  /**
   * Cette fonction permet de récupérer toutes les périodes budgétaires
   * @returns PeriodeBudgetaire[]
   */
  getAllPeriodeBudgetaires() {
    return this.httpClient.get<PeriodeBudgetaire[]>(Adresse.host + 'budget/all');
  }

  /**
   * Cette fonction permet de créer une période budgétaire
   * @param periodeBudgetaire PeriodeBudgetaire
   * @returns PeriodeBudgetaire
   */
  savePeriodeBudgetaire(periodeBudgetaire: PeriodeBudgetaire) {
    periodeBudgetaire.date=new Date();
    return this.httpClient.post<PeriodeBudgetaire>(Adresse.host + 'budget/save/'+this.loginService.utilisateur.reference, periodeBudgetaire);
  }
  saveAllLigneBudgetaire(referenceperiode: string) {
    return this.httpClient.get(Adresse.host + 'lignebudgetaire/save/'+referenceperiode);
  }

  updateLigneBudgetaire(ligneBudgetaire: LigneBudgetaire) {
    return this.httpClient.put(Adresse.host + 'lignebudgetaire/update',ligneBudgetaire);
  }
  validerBudget(referencebudget: string) {
    return this.httpClient.get<PeriodeBudgetaire>(Adresse.host + 'budget/valider/'+referencebudget);
  }

  findByActiveIsTrueLigneBudgetaire() {
    return this.httpClient.get<LigneBudgetaire[]>(Adresse.host + 'lignebudgetaire/allactive/');
  }
}
