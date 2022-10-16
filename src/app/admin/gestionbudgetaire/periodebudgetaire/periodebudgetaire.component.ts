import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeriodeBudgetaire } from "../../../Model/periode-budgetaire.model";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PeriodeBudgetaireService } from "../../../service/periode-budgetaire.service";
import { LoginService } from "../../../service/LoginService";
import { LigneBudgetaire } from "../../../Model/LigneBudgetaire";

@Component({
  selector: 'app-periodebudgetaire',
  templateUrl: './periodebudgetaire.component.html',
  styleUrls: ['./periodebudgetaire.component.scss']
})
export class PeriodebudgetaireComponent implements OnInit {

  public periodeBudgetaire: PeriodeBudgetaire = new PeriodeBudgetaire();
  lignePeriodebudgetaires: LigneBudgetaire[] = [];
  public isLoading: boolean = false;
  public modalRef!: BsModalRef;
  public modalRefadd!: BsModalRef;
  public modalRefexcel!: BsModalRef;
  public modalChangeStatusPeriodeBudgetaire!: BsModalRef;
  public formAddPeriodeBudgetaire!: FormGroup;
  public date: Date = new Date();

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    public periodeBudgetaireService: PeriodeBudgetaireService,
    private loginService: LoginService
  ) {
  }

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
      anneebugetaire: ['', [Validators.required]],
      montant: ['', [Validators.required]]
    });
  }

  openModaladd(template: TemplateRef<any>) {
    this.initForm();
    this.modalRefadd = this.modalService.show(template);
  }

  openModaladdExcel(template: TemplateRef<any>, periodeBudgetaire: PeriodeBudgetaire) {
    this.periodeBudgetaire = periodeBudgetaire;
    this.findByActiveIsTrueLigneBudgetaire();
    this.modalRefexcel = this.modalService.show(template, { class: "modal-lg", ignoreBackdropClick: true });
  }

  openModalaChangeStatusPeriodeBudgetaire(template: TemplateRef<any>, periodeBudgetaire: PeriodeBudgetaire) {
    this.periodeBudgetaire = periodeBudgetaire;
    this.modalChangeStatusPeriodeBudgetaire = this.modalService.show(template, { class: "modal-lg", ignoreBackdropClick: true });
  }

  openModal(template: TemplateRef<any>, periodeBudgetaire: PeriodeBudgetaire) {
    if (periodeBudgetaire) {
      this.periodeBudgetaire = periodeBudgetaire;
    }
    this.modalRef = this.modalService.show(template);
  }

  onAddPeriodeBudgetaire() {
    this.isLoading = true;
    console.log(this.formAddPeriodeBudgetaire.value);
    this.periodeBudgetaireService.savePeriodeBudgetaire(this.formAddPeriodeBudgetaire.value).subscribe(
      data => {
        this.periodeBudgetaireService.periodeBudgetaires.push(data);
        this.isLoading = false;
        this.modalRefadd.hide();
        this.loginService.toastr.success('Période budgétaire ajoutée avec succès');
      }, error => {
        console.log(error);
        this.isLoading = false;
        this.loginService.toastr.error('Erreur d\'ajout de la période budgétaire');
      }
    )
  }

  saveAllLigneBudgetaire() {
    this.isLoading = true;
    this.periodeBudgetaireService.saveAllLigneBudgetaire(this.periodeBudgetaire.reference).subscribe(
      data => {
        this.isLoading = false;
        this.loginService.toastr.success('Période budgétaire ajoutée avec succès');
        this.findByActiveIsTrueLigneBudgetaire();
      }, error => {
        console.log(error);
        this.isLoading = false;
        this.loginService.toastr.error('Erreur d\'ajout de la période budgétaire');
      }
    )
  }

  findByActiveIsTrueLigneBudgetaire() {
    this.periodeBudgetaireService.findByActiveIsTrueLigneBudgetaire().subscribe(
      data => {
        this.lignePeriodebudgetaires = data;
      }
    )
  }
  public onUpdatePeriodeBudgetaire() {
    this.isLoading = true;
    console.log(this.periodeBudgetaire);
    console.log('update coming soon ...');
  }

  changeLigneBudg(p: LigneBudgetaire) {
    const index = this.lignePeriodebudgetaires.findIndex(i => i.reference == p.reference);
    this.lignePeriodebudgetaires[index].statut = "InValide";
  }

  updateligne(p: LigneBudgetaire) {
    if (p.montantinitial > 0) {
      this.periodeBudgetaireService.updateLigneBudgetaire(p).subscribe(
        data => {
          if (data) {
            const index = this.lignePeriodebudgetaires.findIndex(i => i.reference == p.reference);
            this.lignePeriodebudgetaires[index].statut = "Valide";
          }
        }
      )
    } else {
      this.loginService.toastr.error('Le montant doit être >0');
    }


  }

  valide() {
    this.isLoading = true;
    this.periodeBudgetaireService.validerBudget(this.periodeBudgetaire.reference).subscribe(
      data => {
        this.isLoading = false;
        let index = this.periodeBudgetaireService.periodeBudgetaires.indexOf(this.periodeBudgetaire);
        this.periodeBudgetaireService.periodeBudgetaires.splice(index, 1);
        this.periodeBudgetaireService.periodeBudgetaires.push(data);
        this.modalRefexcel.hide();
      }, error => {
        this.isLoading = false;
        this.loginService.toastr.error(error.error.message);
      }
    )
  }

  validAnneBudgetary() {
    this.isLoading = true;
    this.periodeBudgetaireService.updateBudget(this.periodeBudgetaire).subscribe(
      data=>{
        this.isLoading = false;
        this.periodeBudgetaire.statut=data.statut;
        this.modalChangeStatusPeriodeBudgetaire.hide();
      }, error => {
        this.isLoading = false;
      }
    )
  }
}
