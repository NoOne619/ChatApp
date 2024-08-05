import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelecttosendPageRoutingModule } from './selecttosend-routing.module';
import { SelecttosendPage } from './selecttosend.page';
import { SelectpersonComponent } from '../components/selectperson/selectperson.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelecttosendPageRoutingModule,
    
    
  ],
  declarations: [SelecttosendPage,SelectpersonComponent]
})
export class SelecttosendPageModule {}
