import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostcardComponent } from './postcard.component';


const routes: Routes = [{
  path: '',
  component: PostcardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostcardRoutingModule { }