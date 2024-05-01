import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Account } from './model/account';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  uri: string = 'http://localhost:3000';
  token!:boolean;
  ruolo!:string;
 
  constructor(private http: HttpClient) { }
 
  loginAdmin(account:Account): Observable<string> {
    return this.http.post<string>(`${this.uri}/login`, account)
  }
  loginUtenti(account:Account): Observable<boolean> {
    return this.http.post<boolean>(`${this.uri}/loginUtenti`, account)
  }
 
  //chiamato dal CanActivate
  startCanActivate():boolean{
    if(this.token){
      return true;
    }
    else{
      return false;
    }
  }
 
}