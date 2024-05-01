import { Component, OnInit } from '@angular/core';
import { Utente } from '../model/utente/utente.component';
import { UtenteCrud } from '../model/utente-crud';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  utenti: Utente[] = []
  message!: string
  somma!:number;
  media!:number;
  min!:number;
  max!:number;
  pagina!: number;
  constructor(private utenteService: UtenteCrud) { }

  ngOnInit(): void {
    this.mediaStipendi()
    this.maxStipendi()
    this.minStipendi()
    this.totStipendi()
    }
  mediaStipendi():void{
    this.utenteService.mediaStipendiServ().subscribe((number:number)=>{
      this.media=number
      
    })
  }
  totStipendi():void{
    this.utenteService.totStipendiServ().subscribe((number:number)=>{
      this.somma=number
      
    })
  }
  minStipendi():void{
    this.utenteService.minStipendiServ().subscribe((number:number)=>{
      this.min=number
      
    })
  }
  maxStipendi():void{
    this.utenteService.maxStipendiServ().subscribe((number:number)=>{
      this.max=number
     
    })
  }
  getUtenti(): void {
    this.utenteService.getUtentiServ(this.pagina).subscribe((utenti: Utente[]) => {
      this.utenti = utenti

    })
  }
}
