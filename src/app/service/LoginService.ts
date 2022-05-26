import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Loginuser} from "../Model/loginuser";
import {Adresse} from "./Adresse";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class LoginService{
  jwt: string="";
  constructor(public http:HttpClient,public toastr: ToastrService,public router:Router) {
  }

  login(login:Loginuser){
    return this.http.post(Adresse.host+"login",login,{observe:'response'})
  }
}
