import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatisticsComponent } from "./statistics.component";
import { StatisticsRouting } from "./statistics.routing";
@NgModule({
    imports:[
        CommonModule,
        StatisticsRouting
        
    ],
    declarations:[
      StatisticsComponent, 
    ]
})
 
export class StatisticsModule{}