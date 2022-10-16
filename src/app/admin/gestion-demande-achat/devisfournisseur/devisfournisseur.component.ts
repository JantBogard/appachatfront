import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { DevisFournisseurService } from './../../../service/devis-fournisseur.service';
import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {DevisFournisseur} from "../../../Model/DevisFournisseur";
import {DemandeAchatService} from "../../../service/demande-achat.service";
import {ArticleService} from "../../../service/article.service";
import {LoginService} from "../../../service/LoginService";
import {DemandeAchat} from "../../../Model/demande-achat.model";
import {Observable, ReplaySubject} from "rxjs";

@Component({
  selector: 'app-devisfournisseur',
  templateUrl: './devisfournisseur.component.html',
  styleUrls: ['./devisfournisseur.component.scss']
})
export class DevisfournisseurComponent implements OnInit {

  @Input() referencedemandeachat!:string;
  referencedevis!:string;
  @Input() isShowDevis!:boolean;
  @Input() typeOpenModalDevis!: 'SHOW' | 'ADD'| 'DETAILS';
  @Input() modalRef!: BsModalRef;
  modalRefimageDevisFournisseur!: BsModalRef;
  devisfournisseurs:DevisFournisseur[]=[];
  public isLoading: boolean = false;
  public devisFourni!: DevisFournisseur;
  pdfContent: any;
  @ViewChild('pdfview') pdfview!: ElementRef;
  @ViewChild('pdfviews') pdfviews!: ElementRef;
  @Output() closeModalEmintter:EventEmitter<boolean>=new EventEmitter<boolean>();


  constructor(
    public demandeAchatService: DemandeAchatService,
    public articleService: ArticleService,
    public loginService: LoginService,
    private modalSerivce: BsModalService,
    public devisFournisseurService: DevisFournisseurService,
  ) { }

  ngOnInit(): void {
    if (this.typeOpenModalDevis === 'SHOW' || 'DETAILS') {
      this.getAllDevisFournisseur();
    }
  }

  getAllDevisFournisseur(){
    this.devisFournisseurService.getAll(this.referencedemandeachat).subscribe(
      data => {
        this.devisFournisseurService.devisFournisseurs = data;
        this.referencedevis=data[0].reference;
        this.showDataDetail(data[0].imagedevis)
      },
      error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement des devis fournisseur');
      }
    )
  }


  public chooseDevis(){
    this.demandeAchatService.chooseDevis(this.referencedevis,this.referencedemandeachat).subscribe(
      data=>{
        this.closeModalEmintter.emit(true);
      }
    )
  }
  valider(){
    this.demandeAchatService.saveDevisFournisseur(this.devisfournisseurs,this.referencedemandeachat).subscribe(
      data=>{
        this.closeModalEmintter.emit(true);
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

  voirdetail(template: TemplateRef<any>,devisFournisseur:DevisFournisseur) {
   this.devisFourni= devisFournisseur;
    this.modalRefimageDevisFournisseur = this.modalSerivce.show(template,{class:"modal-lg"});
  }

  showDataDevis(event: any) {
    this.referencedevis=event.target.value;
    let val=this.devisFournisseurService.devisFournisseurs.find(devis =>devis.reference===this.referencedevis );
    this.showDataDetail(val?val.imagedevis:'');
  }




  onFileSelected(event:any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.showData(base64);
      let devis:DevisFournisseur=new DevisFournisseur();
      devis.imagedevis=base64;
      this.devisfournisseurs.push(devis);
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    // @ts-ignore
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  showData(dataBase:string) {
    this.pdfContent =
      URL.createObjectURL(this.b64toBlob(dataBase, 'application/pdf')) +
      '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
    this.pdfview.nativeElement.setAttribute('data', this.pdfContent);
  }
  showDataDetail(dataBase:string) {
    this.pdfContent =
      URL.createObjectURL(this.b64toBlob(dataBase, 'application/pdf')) +
      '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
    this.pdfviews.nativeElement.setAttribute('data', this.pdfContent);
  }

  b64toBlob(b64Data:string, contentType:string) {
    var byteCharacters = atob(b64Data);

    var byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      var slice = byteCharacters.slice(offset, offset + 512),
        byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
