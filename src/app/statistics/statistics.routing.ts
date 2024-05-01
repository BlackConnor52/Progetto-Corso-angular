import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StatisticsComponent } from "./statistics.component";

const routes:Routes=[
    {path:'', component:StatisticsComponent } //path children
]
 
@NgModule({
    imports:[RouterModule.forChild(routes)], //forChild
    exports:[RouterModule]
})
 
export class StatisticsRouting{}