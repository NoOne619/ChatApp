import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelecttosendPage } from './selecttosend.page';

const routes: Routes = [
  {
    path: '',
    component: SelecttosendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelecttosendPageRoutingModule {}
