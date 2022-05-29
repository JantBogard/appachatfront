import {Component, OnInit, TemplateRef} from '@angular/core';
import {PeriodeBudgetaire} from "../../../Model/periode-budgetaire.model";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PeriodeBudgetaireService} from "../../../service/periode-budgetaire.service";
import {LoginService} from "../../../service/LoginService";

@Component({
  selector: 'app-periodebudgetaire',
  templateUrl: './periodebudgetaire.component.html',
  styleUrls: ['./periodebudgetaire.component.scss']
})
export class PeriodebudgetaireComponent implements OnInit {

  public periodeBudgetaire: PeriodeBudgetaire=new PeriodeBudgetaire();
  public isLoading: boolean = false;
  public modalRef!: BsModalRef;
  public formAddPeriodeBudgetaire!: FormGroup;
  public date: Date = new Date();

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
      date: [new Date(), [Validators.required]],
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
