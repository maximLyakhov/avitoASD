import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
}, {
  path: 'contest-image',
  loadChildren: () => import('./contest-image/contest-image.module').then(m => m.ContestImageModule),
}, {
  path: 'meme-generator',
  loadChildren: () => import('./meme-generator/meme-generator.module').then(m => m.MemeGeneratorModule),
}, {
  path: 'postcard',
  loadChildren: () => import('./postcard/postcard.module').then(m => m.PostcardModule),
}, {
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
