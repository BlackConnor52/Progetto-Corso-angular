import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';
import { AuthService } from './auth-service.service';

 
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanLoad,CanActivate{
  
  constructor(private router: Router, private auth: AuthService) { } //inietto l'oggetto router ci permette di rimandare al login in canActivate
  
   //Carica un componente solo se chiamato
   canLoad(): boolean{
    alert("componente lazy caricato");
      return true;
  }
 
  canActivate():boolean {
    if (this.auth.startCanActivate()) {
      return true;
    }
    else {
      this.router.navigate(['login']); //rimandiamo l'utente alla view di login
      return false;
    }
  }
 
}