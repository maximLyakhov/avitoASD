import { PostcardRoutingModule } from './postcard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostcardComponent } from './postcard.component';



@NgModule({
  declarations: [
    PostcardComponent
  ],
  imports: [
    CommonModule,
    PostcardRoutingModule
  ]
})
export class PostcardModule { }
