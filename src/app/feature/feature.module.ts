import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ShareModule } from '../share/share.module';
import { FeatureRoutingModule } from './feature-routing.module';



@NgModule({
  declarations: [
    MainLayoutComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ShareModule,

  ]
})
export class FeatureModule { }
