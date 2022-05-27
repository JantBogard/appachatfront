import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/LoginService";
import {Loginuser} from "../../Model/loginuser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean=false;
  loginuser:Loginuser=new Loginuser();
  constructor(public loginService: LoginService) {
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
          this.loginService.jwt = jwt;
          this.loginService.router.navigateByUrl("admin")
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
