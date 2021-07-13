import { ContestImageRoutingModule } from './contest-image-routing.module';
import { ContestImageService } from './contest-image.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestImageComponent } from './contest-image.component';



@NgModule({
  declarations: [
    ContestImageComponent
  ],
  imports: [
    CommonModule,
    ContestImageRoutingModule,
  ],
  exports: [
    ContestImageComponent
  ],
  providers: [
    ContestImageService
  ]
})
export class ContestImageModule { }
