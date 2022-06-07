import {Component, Input, OnInit} from '@angular/core';
import {DevisFournisseur} from "../../../Model/DevisFournisseur";
import {DemandeAchatService} from "../../../service/demande-achat.service";
import {ArticleService} from "../../../service/article.service";
import {LoginService} from "../../../service/LoginService";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-devisfournisseur',
  templateUrl: './devisfournisseur.component.html',
  styleUrls: ['./devisfournisseur.component.scss']
})
export class DevisfournisseurComponent implements OnInit {

  @Input() referencedemandeachat!:string;
  devisfournisseurs:DevisFournisseur[]=[];
  constructor(  public demandeAchatService: DemandeAchatService,
                public articleService: ArticleService,
                public loginService: LoginService,
                private modalSerivce: BsModalService) { }

  ngOnInit(): void {
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

}
