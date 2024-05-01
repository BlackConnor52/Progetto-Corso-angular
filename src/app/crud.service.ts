import { Injectable } from '@angular/core';
import { Persona } from './persona';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
persone:Persona[];
  constructor() { 
    this.persone=[];
    var persona=new Persona();
    persona.id=1;
    persona.nome="Gino";
    persona.cognome="Visciano";
    this.persone.push(persona)
    persona=new Persona();
    persona.id=2;
    persona.nome="Manuel";
    persona.cognome="Mauriello";
    this.persone.push(persona)
  }
}
