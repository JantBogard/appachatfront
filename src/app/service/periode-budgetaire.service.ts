import { Adresse } from './Adresse';
import { PeriodeBudgetaire } from './../Model/periode-budgetaire.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodeBudgetaireService {

  public periodeBudgetaires: PeriodeBudgetaire[] = [];

  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.post<PeriodeBudgetaire>(Adresse.host + 'budget/save', periodeBudgetaire);
  }
}
