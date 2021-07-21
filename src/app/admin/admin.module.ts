import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminInterceptor } from './admin.interceptor';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AdminService,
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
