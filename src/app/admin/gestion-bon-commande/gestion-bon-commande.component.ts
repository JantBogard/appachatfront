import { LoginService } from './../../service/LoginService';
import { BonCommandeService } from './../../service/bon-commande.service';
import { Component, OnInit } from '@angular/core';
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
  public excelfiles: any[] = []

  constructor(
    public bonCommandeService: BonCommandeService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getAllBonCommande();
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
      var workbook = XLSX.read(bstr, {type: "binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet, {raw: true});
      // @ts-ignore
      this.excelfiles=arraylist;
      console.table(arraylist);
      console.table(this.excelfiles);
    }
  }


}
