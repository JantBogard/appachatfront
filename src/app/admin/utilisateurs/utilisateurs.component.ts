import { Utilisateur } from './../../Model/Utilisateur';
import { LoginService } from './../../service/LoginService';
import { UtilisateurService } from './../../service/utilisateur.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  public modalRef?: BsModalRef;
  public formAddUser!: FormGroup;
  public utilisateur!: Utilisateur;
  isLoading: boolean=false;

  constructor(
    public utilisateurService: UtilisateurService,
    private loginService: LoginService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllUtilisateur();
    this.initForm();
  }

  initForm() {
    this.formAddUser = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      login: ['', [Validators.required]],
      fonction: ['', [Validators.required]]
    });
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

  openModal(template: TemplateRef<any>, utilisateur?: Utilisateur) {
    if (utilisateur) {
      this.utilisateur = utilisateur;
    }
    this.modalRef = this.modalService.show(template);
  }

  onSaveUser() {
    this.isLoading=true;
    let user: Utilisateur;
    if (this.formAddUser.invalid) {
      this.loginService.toastr.error('Veuillez verifier les champs');
      this.isLoading=false;
      return;
    }
    user = this.formAddUser.value;
    user.password = '123456';
    user.matricule = 'User' + user.login + this.utilisateurService.utilisateurs.length;
    this.utilisateurService.saveUtilisateur(user).subscribe(
      data => {
        this.isLoading = false;
        console.log(data);
        this.getAllUtilisateur();
        this.loginService.toastr.success('Utilisateur ajouté avec succès');
        this.modalRef?.hide();
      }, error => {
        this.isLoading = false;
        console.log(error);
        this.loginService.toastr.error('Erreur de sauvegarde des utilisateurs');
      }
    )
  }

  onUpdate() {
    this.isLoading = true;
    if (this.utilisateur.nom === '' || this.utilisateur.prenom === '' || this.utilisateur.email === '' || this.utilisateur.telephone === '' || this.utilisateur.login === '') {
      this.isLoading = false;
      this.loginService.toastr.error('Veuillez verifier les champs');
      return;
    }

    this.utilisateurService.updateUser(this.utilisateur).subscribe(
      data => {
        this.isLoading = false;
        this.getAllUtilisateur();
        this.loginService.toastr.success('Utilisateur modifié avec succès');
        this.modalRef?.hide();
      },
      error => {
        this.isLoading = false;
        console.log(error);
        this.loginService.toastr.error('Erreur de modification des utilisateurs');
      }
    )
  }

}
