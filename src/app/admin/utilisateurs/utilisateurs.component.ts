import { LoginService } from './../../service/LoginService';
import { UtilisateurService } from './../../service/utilisateur.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  public modalRef?: BsModalRef;

  constructor(
    public utilisateurService: UtilisateurService,
    private loginService: LoginService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllUtilisateur();
  }

  public getAllUtilisateur() {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      data => {
        this.utilisateurService.utilisateurs = data;
      }, error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement des utilisateurs');
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
