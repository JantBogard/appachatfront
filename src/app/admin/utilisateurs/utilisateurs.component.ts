import { RegisterDto } from './../../Model/RegisterDto.model';
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSaveUser() {
    this.isLoading=true;
    let user: RegisterDto;
    if (this.formAddUser.invalid) {
      this.loginService.toastr.error('Veuillez verifier les champs');
      this.isLoading=false;
      return;
    }
    user = this.formAddUser.value;
    user.password = '123456';
    user.password = 'User' + user.login + this.utilisateurService.utilisateurs.length;
    this.utilisateurService.saveUtilisateur(user).subscribe(
      data => {
        this.isLoading = false;
        this.getAllUtilisateur();
        this.modalRef?.hide();
      }, error => {
        this.isLoading = false;
        console.log(error);
        this.loginService.toastr.error('Erreur de sauvegarde des utilisateurs');
      }
    )
  }

}
