import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemeGeneratorComponent } from './meme-generator.component';
import { MemeGeneratorService } from './meme-generator.service';
import { MemeGeneratorRoutingModule } from './meme-generator-routing.module';


@NgModule({
  declarations: [
    MemeGeneratorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MemeGeneratorRoutingModule,
  ],
  exports: [
    MemeGeneratorComponent,
  ],
  providers: [
    MemeGeneratorService,
  ]
})
export class MemeGeneratorModule { }
