import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { TuiButtonModule } from '@taiga-ui/core';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
  ],
  providers: [
    AdminService,
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
