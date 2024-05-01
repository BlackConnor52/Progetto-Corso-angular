import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Utente } from './utente/utente.component';
import { Ruolo } from './ruolo';
import { Titolo } from './titolo';
import { Settore } from './settore';

@Injectable({
    providedIn: 'root'
  })

export class UtenteCrud {
 uri:string = 'http://localhost:3000'; // uri di base, per non ripeterlo sempre
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 
  constructor(private http: HttpClient) {}
  mediaStipendiServ():Observable<number>{
    return this.http.get<number>(`${this.uri}/mediaStipendio`)
  }
  totStipendiServ():Observable<number>{
    return this.http.get<number>(`${this.uri}/totStipendi`)
  }
  minStipendiServ():Observable<number>{
    return this.http.get<number>(`${this.uri}/minStipendio`)
  }
  maxStipendiServ():Observable<number>{
    return this.http.get<number>(`${this.uri}/maxStipendio`)
  }

  addUtenteServ(utente:Utente):Observable<string>{
    return this.http.post<string>(`${this.uri}/insertSec`, utente)
  }
  getRuoliServ():Observable<Ruolo[]>{
    return this.http.get<Ruolo[]>(`${this.uri}/ruoli`)
  }
  getTitoliServ():Observable<Titolo[]>{
    return this.http.get<Titolo[]>(`${this.uri}/titoli`)
  }
  deleteUserServ(id:number):Observable<string>{
    return this.http.delete<string>(`${this.uri}/deleteUser/${id}`)
  }
  getSettoreServ():Observable<Settore[]>{
  return this.http.get<Settore[]>(`${this.uri}/settori`)
 }

  getUtenteServ(id:number):Observable<Utente>{
    return this.http.get<Utente>(`${this.uri}/userSql/${id}`)
  }

  getUtentiServ(pagina:number):Observable<Utente[]>{
    return this.http.get<Utente[]>(`${this.uri}/pagination/${pagina}`)
  }
  updateUtentiServ(utente:Utente):Observable<string>{
    return this.http.put<string>(`${this.uri}/updateUser`,utente)
  }
  getDimUtenti():Observable<number>{
    return this.http.get<number>(`${this.uri}/dimUtenti`)
  }
}
