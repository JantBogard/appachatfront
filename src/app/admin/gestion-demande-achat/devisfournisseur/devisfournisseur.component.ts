import { BsModalRef } from 'ngx-bootstrap/modal';
import { DevisFournisseurService } from './../../../service/devis-fournisseur.service';
import {Component, Input, OnInit} from '@angular/core';
import {DevisFournisseur} from "../../../Model/DevisFournisseur";
import {DemandeAchatService} from "../../../service/demande-achat.service";
import {ArticleService} from "../../../service/article.service";
import {LoginService} from "../../../service/LoginService";

@Component({
  selector: 'app-devisfournisseur',
  templateUrl: './devisfournisseur.component.html',
  styleUrls: ['./devisfournisseur.component.scss']
})
export class DevisfournisseurComponent implements OnInit {

  @Input() referencedemandeachat!:string;
  @Input() typeOpenModalDevis!: 'SHOW' | 'ADD';
  @Input() modalRef!: BsModalRef;
  devisfournisseurs:DevisFournisseur[]=[];
  public isLoading: boolean = false;
  constructor(
    public demandeAchatService: DemandeAchatService,
    public articleService: ArticleService,
    public loginService: LoginService,
    public devisFournisseurService: DevisFournisseurService,
  ) { }

  ngOnInit(): void {
    if (this.typeOpenModalDevis === 'SHOW') {
      this.getAllDevisFournisseur();
    }
  }

  getAllDevisFournisseur(){
    this.devisFournisseurService.getAll(this.referencedemandeachat).subscribe(
      data => {
        this.devisFournisseurService.devisFournisseurs = data;
      },
      error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement des devis fournisseur');
      }
    )
  }


  updatefile(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 300000;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 5520;
      const max_width = 5560;



      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          // @ts-ignore
          const img_height = rs.currentTarget['height'];
          // @ts-ignore
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            return
          } else {
            let devis:DevisFournisseur=new DevisFournisseur();
            devis.imagedevis=e.target.result;
            this.devisfournisseurs.push(devis);
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  valider(){
    this.demandeAchatService.saveDevisFournisseur(this.devisfournisseurs,this.referencedemandeachat).subscribe(
      data=>{
        console.log(data)
      }
    )
  }

  onChooseDevisFournisseur(devisFournisseur: DevisFournisseur) {
    this.isLoading = true;
    this.devisFournisseurService.chooseDevisFournisseur(this.referencedemandeachat, devisFournisseur).subscribe(
      data => {
        this.isLoading = false;
        this.loginService.toastr.success('Devis fournisseur choisi');
        this.devisFournisseurService.devisFournisseur = data;
        this.modalRef.hide();
      },
      error => {
        this.isLoading = false;
        this.loginService.toastr.error('Erreur de chargement des devis fournisseur');
        console.log(error);
      }
    )
  }

}
