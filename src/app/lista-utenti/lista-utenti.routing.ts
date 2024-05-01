import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListaUtentiComponent } from "./lista-utenti.component";
 
const routes:Routes=[
    {path:'', component:ListaUtentiComponent } //path children
]
 
@NgModule({
    imports:[RouterModule.forChild(routes)], //forChild
    exports:[RouterModule]
})
 
export class ListUtentiRoutingModule{}