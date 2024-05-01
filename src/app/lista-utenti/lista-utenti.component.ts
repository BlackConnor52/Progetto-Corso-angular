import { Component, OnInit } from '@angular/core';
import { Utente } from '../model/utente/utente.component';
import { UtenteCrud } from '../model/utente-crud';
import { Ruolo } from '../model/ruolo';
import { Settore } from '../model/settore';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.css']
})
export class ListaUtentiComponent implements OnInit {
  settori:Settore[]=[]
  ruoli:Ruolo[]=[]
  utenti: Utente[] = []
  message!: string
  ruoli_aziendali!:string;
  pagina!: number;
  nPagine!: number;

  constructor(private utenteService: UtenteCrud, private auth:AuthService) { }

  ngOnInit(): void {
    this.pagina=1
    this.getUtenti(this.pagina)
    this.getRuoli()
    this.getSettore();
    this.ruoli_aziendali = this.auth.ruolo;
  }
 deleteUtenti(id:number):void{
  
  this.utenteService.deleteUserServ(id).subscribe((message:string)=>{
    this.message=message
    this.getUtenti(this.pagina)
  })
 }
 getSettore():void{
  this.utenteService.getSettoreServ().subscribe((settori:Settore[])=>{
    this.settori=settori
  })
 
  }
  getUtenti(pagina:number): void {
    this.utenteService.getDimUtenti().subscribe((dim: number) => {
      this.nPagine = dim;
    })
    this.utenteService.getUtentiServ(pagina).subscribe((utenti: Utente[]) => {
      if (pagina < 1) {
        pagina = 1;
      } else if (pagina > this.nPagine) {
        this.pagina = this.nPagine;
      } else {
        this.pagina = pagina;
      }
      this.utenti = utenti;
    })
  }
  getRuoli():void{
    this.utenteService.getRuoliServ().subscribe((ruoli:Ruolo[])=>{
      this.ruoli=ruoli
    })
  }
}
