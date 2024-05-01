import { Component } from '@angular/core';
import { Account } from '../model/account';
import { RouteGuardService } from '../can-load.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { Ruolo } from '../model/ruolo';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  account:Account=new Account();
 
  constructor(private auth:AuthService, private routeService:RouteGuardService, private router: Router) { }
 
  testLoginAdmin(account:Account): void {
    this.auth.loginAdmin(account).subscribe((res: string) => {
      //il messaggio in arrivo dal server sarà: il token di conferma login (che corrisponde ad un ruolo)
      //a secondo se il login andrà a buon fine o meno
      var splitResponse = res.split(",");
      var esito = splitResponse[0];
      var ruolo = splitResponse[1];
      if(esito){
        this.auth.token=true;
        this.auth.ruolo=ruolo;
        this.router.navigate(['lista']);
      }else{
        this.auth.token=false;
      }
    });
  }
 
  onFormSubmit(){
    this.testLoginAdmin(this.account);
  }
 
}