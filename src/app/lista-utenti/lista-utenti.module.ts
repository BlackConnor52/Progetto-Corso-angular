import { NgModule } from "@angular/core";
import { ListaUtentiComponent } from "./lista-utenti.component";
import { ListUtentiRoutingModule } from "./lista-utenti.routing";
import { CommonModule } from "@angular/common";
import { MyCustomPipe } from "../my-custom.pipe";
@NgModule({
    imports:[
        CommonModule,
        ListUtentiRoutingModule
        
    ],
    declarations:[
      ListaUtentiComponent, //il componente viene caricato in modalità lazy loading
      MyCustomPipe
    ]
})
 
export class ListUtentiModule{}