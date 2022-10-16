import { DemandeAchatService } from './../../service/demande-achat.service';
import { BonCommande } from './../../Model/bon-commande.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginService } from './../../service/LoginService';
import { BonCommandeService } from './../../service/bon-commande.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-gestion-bon-commande',
  templateUrl: './gestion-bon-commande.component.html',
  styleUrls: ['./gestion-bon-commande.component.scss']
})
export class GestionBonCommandeComponent implements OnInit {
  private arrayBuffer: any;
  private file: any;
  private fileList: any[] = [];
  public excelfiles: any[] = [];
  public modalRef!: BsModalRef;
  public formBonCommande!: BonCommande;
  public isLoading!: boolean;

  constructor(
    public bonCommandeService: BonCommandeService,
    private loginService: LoginService,
    public demandeAchatService: DemandeAchatService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllBonCommande();
    this.initForm();
  }

  public initForm() {
    this.formBonCommande = new BonCommande();
  }

  public getAllBonCommande() {
    this.bonCommandeService.getAll().subscribe(
      data => {
        this.bonCommandeService.bonCommandes = data;
      },
      error => {
        console.log(error);
        this.loginService.toastr.error('Erreur de chargement des bon commandes');
      }
    );
  }

  public getAllDemandeAchat() {
    this.demandeAchatService.getAll().subscribe(
      data => {
        this.demandeAchatService.demandeAchats = data;
      },
      error => {
        console.log(error);

      }
    )
  }

  public openModal(template: TemplateRef<any>) {
    this.initForm()
    this.modalRef = this.modalService.show(template);
  }

  addfile(event: any) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      // @ts-ignore
      this.excelfiles = arraylist;
      console.table(arraylist);
      console.table(this.excelfiles);
    }
  }


  generateBonCommande() {
    this.isLoading = true;
    this.demandeAchatService.demandeAchats.forEach(elt => {
      if (elt.reference == this.formBonCommande.demandeachat.reference) {
        this.formBonCommande.demandeachat = elt;
      }
    });

    this.bonCommandeService.generateBonCommande(this.formBonCommande).subscribe(
      res => {
        this.isLoading = false;
        this.getAllBonCommande();
      },
      error => {
        console.error(error);
      }
    )
  }

}
