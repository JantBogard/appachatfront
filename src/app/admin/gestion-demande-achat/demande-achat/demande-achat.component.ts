import { LigneBudgetaire } from './../../../Model/LigneBudgetaire';
import { PeriodeBudgetaireService } from './../../../service/periode-budgetaire.service';
import { ChangeStatut } from './../../../Model/ChangeStatut';
import { ArticleService } from './../../../service/article.service';
import { LigneDemandeAchat } from './../../../Model/ligne-demande-achat.model';
import { DemandeAchat } from './../../../Model/demande-achat.model';
import { LoginService } from './../../../service/LoginService';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DemandeAchatService } from './../../../service/demande-achat.service';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Article } from 'src/app/Model/article.model';
import { DevisFournisseurService } from "../../../service/devis-fournisseur.service";

@Component({
  selector: 'app-demande-achat',
  templateUrl: './demande-achat.component.html',
  styleUrls: ['./demande-achat.component.scss']
})
export class DemandeAchatComponent implements OnInit {

  public isLoading: boolean = false;
  public modalRef!: BsModalRef;
  public modalRefSoumettreDA!: BsModalRef;
  public modalRefDevisFournisseur!: BsModalRef;
  public modaldeviFournisseur!: BsModalRef;
  public formAddDemandeAchat!: DemandeAchat;
  public demandeAchat: DemandeAchat = new DemandeAchat();
  public articleName: string = "";
  public typeOpenDevisModal: 'SHOW' | 'ADD' | 'DETAILS' = 'SHOW';
  public numeroda!: string;

  public referencesessionbudgetaire!: string;
  public isShowDetaits!: boolean;

  public changeStatut!: ChangeStatut;
  public lignePeriodebudgetaires!: LigneBudgetaire[];

  constructor(
    public demandeAchatService: DemandeAchatService,
    public articleService: ArticleService,
    public loginService: LoginService,
    private modalSerivce: BsModalService,
    public devisFournisseurService: DevisFournisseurService,
    public periodeBudgetaireService: PeriodeBudgetaireService
  ) { }

  ngOnInit(): void {
    this.getAllDemandeAchat();
    this.getAllArticle();
    this.getPeriodeBudgetaire();
    this.initForm();
  }

  public initForm() {
    this.formAddDemandeAchat = new DemandeAchat();
    this.formAddDemandeAchat.lignedemandeachats = [new LigneDemandeAchat()];
    this.formAddDemandeAchat.lignedemandeachats[0].article = new Article();
  }

  public getAllDemandeAchat() {
    if (this.loginService.utilisateur.fonction == "ACHETEUR METIER") {
      this.demandeAchatService.getAllByReferenceAcheteurMetier(this.loginService.utilisateur.reference).subscribe(
        data => {
          this.demandeAchatService.demandeAchats = data;
        }, error => {
          this.loginService.toastr.error('Erreur de chargement des demande d\'achat');
        }
      )
    } else if (this.loginService.utilisateur.fonction == "DIRECTEUR ACHAT") {
      this.demandeAchatService.getAll().subscribe(
        data => {
          this.demandeAchatService.demandeAchats = data;
        }, error => {
          console.log(error);
          this.loginService.toastr.error('Erreur de chargement des demande d\'achat');
        }
      )
    }
  }

  public getAllArticle() {
    this.articleService.getAll().subscribe(
      data => {
        this.articleService.articles = data;
      }, error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement des articles');
      }
    );
  }

  public getPeriodeBudgetaire() {
    this.periodeBudgetaireService.findByActiveIsTrueLigneBudgetaire().subscribe(
      data => {
        this.lignePeriodebudgetaires = data;
      },
      error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement de la periode budgetaire');
      }
    )
  }

  public openModal(template: TemplateRef<any>, demandeAchat?: DemandeAchat) {
    if (demandeAchat) {
      this.demandeAchat = demandeAchat;
      this.modalRef = this.modalSerivce.show(template, { class: "modal-lg" });
    } else {
      if (this.loginService.utilisateur.fonction == "ACHETEUR METIER") {
        this.initForm();
        this.demandeAchatService.generenumero(this.loginService.utilisateur.matricule).subscribe(
          data => {
            this.numeroda = data.numeroda;
            this.referencesessionbudgetaire = data.referencesessionbudgetaire;
            this.modalRef = this.modalSerivce.show(template, { class: "modal-lg" });
          }, error => {
            this.loginService.toastr.error(error.error?.message);
          }
        )
      } else {
        this.loginService.toastr.error('Seule un ACHETEUR METIER a droit à cette action ');
      }
    }


  }
  public openModalDevisFournisseur(template: TemplateRef<any>, demandeAchat?: DemandeAchat, typeOpen: 'SHOW' | 'ADD' | 'DETAILS' = 'SHOW') {
    if (demandeAchat) {
      this.demandeAchat = demandeAchat;
    }
    this.typeOpenDevisModal = typeOpen;
    this.modalRefDevisFournisseur = this.modalSerivce.show(template, { class: "modal-lg" });
  }

  public openModaSoumettreDemandeAchat(template: TemplateRef<any>, demandeAchat?: DemandeAchat) {
    if (demandeAchat) {
      this.demandeAchat = demandeAchat;
    }
    this.modalRefSoumettreDA = this.modalSerivce.show(template, { class: "modal-lg" });
  }

  onAddLigneDemandeAchat() {
    let ligneDemandeAchat = new LigneDemandeAchat();
    ligneDemandeAchat.article = new Article();
    this.formAddDemandeAchat.lignedemandeachats.push(ligneDemandeAchat);
  }

  onRemoveLigneDemandeAchat(index: number) {
    this.formAddDemandeAchat.lignedemandeachats.splice(index, 1);
  }

  public onSaveDemandeAchat() {
    this.isLoading = true;
    if (!this.formAddDemandeAchat) {
      this.isLoading = false;
      this.loginService.toastr.error('Veuillez remplir tous les champs');
      return;
    }
    this.formAddDemandeAchat.lignedemandeachats.forEach(element => {
      let article = this.articleService.articles.find(x => x.denomination == element.article.denomination);
      element.article = article ? article : element.article;
      element.pt = element.pu * element.quantite;
    });
    this.formAddDemandeAchat.matriculeAcheteurmetier = this.loginService.utilisateur.matricule;
    this.formAddDemandeAchat.numeroda = this.numeroda;
    this.demandeAchatService.saveWithLigne(this.formAddDemandeAchat).subscribe(
      data => {
        this.isLoading = false;
        this.demandeAchatService.demandeAchats.push(data);
        this.modalRef.hide();
        this.loginService.toastr.success('Demande d\'achat ajoutée avec succès');
      }, error => {
        console.log(error);
        this.loginService.toastr.error('Erreur d\'ajout de la demande d\'achat');
      }
    )
  }

  onUpdate() {
    console.log("update demande d'achat coming soon ...");
  }


  updateStatutDa(demandeAchat: DemandeAchat) {
    this.isLoading = true;
    this.changeStatut.commentaire = demandeAchat.commentaire;
    this.changeStatut.reference = demandeAchat.reference;
    this.changeStatut.statut = demandeAchat.statut;
    this.demandeAchatService.valider(this.changeStatut).subscribe(
      data => {
        this.isLoading = false;
        if (data) {
          this.loginService.toastr.success('Demande d\'achat validée avec succès');
        } else {
          this.loginService.toastr.error('Erreur de validation de la demande d\'achat');
        }
      },
      error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de validation de la demande d\'achat');
        this.isLoading = false;
      }
    )
  }

  calculPrix() {
    let total = 0;
    this.formAddDemandeAchat.lignedemandeachats.forEach(element => {
      element.pt = element.pu * element.quantite;
      total += element.pt;
    });

    if (total != NaN) {
      this.formAddDemandeAchat.prixestimatif = total;
    }

  }

  closeModal(event: boolean) {
    this.modalRefDevisFournisseur.hide();
  }





  showDetaisFournisseur() {
    this.typeOpenDevisModal = 'DETAILS'
  }

  selectAction(event: any) {
    this.demandeAchat.statut = event.target.value;
  }
}
