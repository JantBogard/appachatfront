import { LoginService } from './../../service/LoginService';
import { PeriodeBudgetaireService } from './../../service/periode-budgetaire.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PeriodeBudgetaire } from './../../Model/periode-budgetaire.model';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-periode-budgetaire',
  templateUrl: './periode-budgetaire.component.html',
  styleUrls: ['./periode-budgetaire.component.scss']
})
export class PeriodeBudgetaireComponent implements OnInit {

  public periodeBudgetaire!: PeriodeBudgetaire;
  public isLoading: boolean = false;
  public modalRef!: BsModalRef;
  public formAddPeriodeBudgetaire!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    public periodeBudgetaireService: PeriodeBudgetaireService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getAllPeriodeBudgetaires();
    this.initForm();
  }

  getAllPeriodeBudgetaires() {
    this.periodeBudgetaireService.getAllPeriodeBudgetaires().subscribe(
      data => {
        this.periodeBudgetaireService.periodeBudgetaires = data;
      }, error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement des périodes budgétaires');
      }
    )
  }

  initForm() {
    this.formAddPeriodeBudgetaire = this.formBuilder.group({
      date: ['', [Validators.required]],
      anneeBudgetaire: ['', [Validators.required]],
      statut: ['', [Validators.required]],
      montant: ['', [Validators.required]]
    });
  }

  openModal(template: TemplateRef<any>, periodeBudgetaire?: PeriodeBudgetaire) {
    if (periodeBudgetaire) {
      this.periodeBudgetaire = periodeBudgetaire;
    }
    this.modalRef = this.modalService.show(template);
  }

  public onAddPeriodeBudgetaire () {
    this.isLoading = true;
    this.periodeBudgetaireService.savePeriodeBudgetaire(this.formAddPeriodeBudgetaire.value).subscribe(
      data => {
        this.periodeBudgetaireService.periodeBudgetaires.push(data);
        this.isLoading = false;
        this.modalRef.hide();
        this.loginService.toastr.success('Période budgétaire ajoutée avec succès');
      }, error => {
        console.log(error);
        this.isLoading = false;
        this.loginService.toastr.error('Erreur d\'ajout de la période budgétaire');
      }
    )
  }

  public onUpdatePeriodeBudgetaire () {
    this.isLoading = true;
    console.log(this.periodeBudgetaire);
    console.log('update coming soon ...');
  }

}
