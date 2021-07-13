import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContestImageComponent } from './contest-image.component';


const routes: Routes = [
  {
    path: '',
    component: ContestImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestImageRoutingModule { }