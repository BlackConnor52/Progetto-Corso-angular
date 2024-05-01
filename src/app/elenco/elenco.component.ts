import { Component } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-elenco',
  templateUrl: './elenco.component.html',
  styleUrls: ['./elenco.component.css']
})
export class ElencoComponent {
constructor(public crud:CrudService){
}
}
