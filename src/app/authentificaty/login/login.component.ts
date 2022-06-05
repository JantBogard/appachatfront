import { UtilisateurService } from './../../service/utilisateur.service';
import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/LoginService";
import {Loginuser} from "../../Model/loginuser";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean=false;
  loginuser:Loginuser=new Loginuser();
  constructor(public loginService: LoginService, private utilisateurService: UtilisateurService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.isLoading=true;
    console.log(this.loginuser);
    this.loginService.login(this.loginuser).subscribe(
      data => {
        let jwt = data.headers.get('Authorization');
        if (jwt) {
          let jwthelper=new JwtHelperService();
          this.loginService.jwt = jwt;
          console.log(jwthelper.decodeToken(jwt));
          if (jwthelper.decodeToken(jwt).roles[0]["authority"]=="ADMIN"){
            this.loginService.router.navigateByUrl("admin")
          }else if (jwthelper.decodeToken(jwt).roles[0]["authority"]=="DIRECTEUR ACHAT"){
            this.loginService.router.navigateByUrl("admin/periodebudgetaire")
          } else if (jwthelper.decodeToken(jwt).roles[0]["authority"]=="ACHETEUR METIER"){
            this.loginService.router.navigateByUrl("admin/demandeachat")
          }

        }
        this.isLoading = false;
      }, error => {
        if (error.status) this.loginService.toastr.error("Bien vouloir verifier votre mot de passe ou adresse mail");
        this.isLoading = false;
      }, () => {

      }
    )
  }
}
