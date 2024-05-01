import { Component, OnInit } from '@angular/core';
import { Utente } from '../model/utente/utente.component';
import { UtenteCrud } from '../model/utente-crud';
import { Ruolo } from '../model/ruolo';
import { Settore } from '../model/settore';
@Component({
  selector: 'app-form-utenti',
  templateUrl: './form-utenti.component.html',
  styleUrls: ['./form-utenti.component.css']
})
export class FormUtentiComponent implements OnInit {

  ruoli: Ruolo[] = []
  settori: Settore[] = []
  utente: Utente = new Utente()
  message!: string
  submitCalled=true
  constructor(private utenteService: UtenteCrud) { }

  ngOnInit(): void {
    this.getRuoli()
    this.getSettore()
  }

  getRuoli(): void {
    this.utenteService.getRuoliServ().subscribe((ruoli: Ruolo[]) => {
      this.ruoli = ruoli
    })
  }

  getSettore(): void {
    this.utenteService.getSettoreServ().subscribe((settori: Settore[]) => {
      this.settori = settori
    })
  }

  addUtente(utente: Utente): void {
    this.utenteService.addUtenteServ(utente).subscribe((message: string) => {
      this.message = message

    })
  }

  updateUtente(utente: Utente): void {
    this.utenteService.updateUtentiServ(utente).subscribe((message: string) => {
      this.message = message
    })
  }

  onSubmit(): void {
    this.validation()
    
  }

  getUtente(id: number): any {
    this.utenteService.getUtenteServ(id).subscribe((utente: Utente) => {
      this.utente = utente
    })
  }

  onSearch(): void {
    this.utente = this.getUtente(this.utente.id)
    this.submitCalled = false;
  }

  resetMessage(): void {
    //resettiamo il messaggio inviato precedentemente dal server;
    //chiamiamo questo metodo cliccando su uno dei input del form
    this.message = "";
  }

  validation(){
    let promise = new Promise(
      (resolve, reject) =>{
        var regexNomeUtente=/^[a-zA-Z]+$/;
        var regexUsername=/^(?=.*\d.*\d)[a-zA-Z\d]{8,20}$/;
        var regexStipendio=/^([0-9]{2,5})+\.+([0-9]{1,2})+$/;
        //Inizio validazione
        if(this.utente.nome==undefined || this.utente.nome.length<3 || this.utente.nome.length>20){
          reject("Il nome prevede 3-20 caratteri"); //reject ci porta nel catch
        }
        else if(this.utente.cognome==undefined || this.utente.cognome.length<3 || this.utente.cognome.length>20){
          reject("Il cognome prevede 3-20 caratteri"); //reject ci porta nel catch
        }
        else if(!regexNomeUtente.test(this.utente.nome)){
          reject("Il nome deve contenere solo lettere");
        }
        else if(!regexNomeUtente.test(this.utente.cognome)){
          reject("Il cognome deve contenere solo lettere");
        }
        else if(this.utente.stipendio==undefined){
          reject("Assegnare lo stipendio");
        }
        else if(this.utente.dataNascita==undefined){
          reject("Assegnare la data di nascita");
        }
        else if(this.utente.email==undefined){
          reject("Assegnare email");
        }
        else if(this.utente.password==undefined){
          reject("Assegnare password");
        }
        else if(this.utente.password==undefined || this.utente.password.length<8 || this.utente.password.length>16){
          reject("la password deve avere 8-16 caratteri"); //reject ci porta nel catch
        }
        else if(!regexUsername.test(this.utente.username)){
          reject("la username deve avere da 8 a 20 caratteri e almeno due numeri");
        }
        else if(this.utente.username==undefined){
          reject("Assegnare username");
        }
        else if(!regexStipendio.test(""+this.utente.stipendio)){
          reject("Formato stipendio non valido (assicurare almeno una cifra dopo la virgola): min 10.00 max 99999.99");
        }
        else{
          resolve("Tutti i dati sono corretti!!!"); //leggo il messaggio dalla console del browser
          this.message = "";
        }
      }
    );

    
    promise.then( //il then esegue il blocco di codice se la promise fa il resolve
      (res) =>{
        console.log(res); //dalla console del browser leggeremo l'esito in caso di successo
        if (this.utente.id != undefined) {
          this.updateUtente(this.utente)
          this.utente = new Utente(); //svuota i campi del form e crea nello stesso tempo una nuova istanza
        } else {
          this.addUtente(this.utente)
          this.utente = new Utente();  //svuota i campi del form e crea nello stesso tempo una nuova istanza
        }
        this.submitCalled=true
      }
    ).catch(
      (error) =>{
        this.message = error; //mando il messaggio dell'errore corrispondente
      }
    );




  }



}