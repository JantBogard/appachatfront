import { LigneDemandeAchat } from './../../../Model/ligne-demande-achat.model';
import { DemandeAchat } from './../../../Model/demande-achat.model';
import { LoginService } from './../../../service/LoginService';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DemandeAchatService } from './../../../service/demande-achat.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-demande-achat',
  templateUrl: './demande-achat.component.html',
  styleUrls: ['./demande-achat.component.scss']
})
export class DemandeAchatComponent implements OnInit {

  public isLoading: boolean = false;
  public modalRef!: BsModalRef;
  public formAddDemandeAchat!: DemandeAchat;
  public demandeAchat: DemandeAchat = new DemandeAchat();

  constructor(
    public demandeAchatService: DemandeAchatService,
    private loginService: LoginService,
    private modalSerivce: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllDemandeAchat();
    this.initForm();
  }

  public initForm() {
    this.formAddDemandeAchat = new DemandeAchat();
    this.formAddDemandeAchat.lignedemandeachats = [new LigneDemandeAchat()];
  }

  public getAllDemandeAchat() {
    this.demandeAchatService.getAll().subscribe(
      data => {
        this.demandeAchatService.demandeAchats = data;
      }, error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement des demande d\'achat');
      }
    )
  }

  public openModal(template: TemplateRef<any>, demandeAchat?: DemandeAchat) {
    if (demandeAchat) {
      this.demandeAchat = demandeAchat;
    } else {
      this.initForm();
    }
    this.modalRef = this.modalSerivce.show(template);
  }

  onAddLigneDemandeAchat() {
    this.formAddDemandeAchat.lignedemandeachats.push(new LigneDemandeAchat());
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
    this.formAddDemandeAchat.matriculeAcheteurmetier = this.loginService.utilisateur.matricule;
    this.demandeAchatService.save(this.formAddDemandeAchat).subscribe(
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

  public onUpdate() {
    console.log("update demande d'achat coming soon ...");
  }

}
