import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EverythingPageComponent } from './pages/everything-page/everything-page.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomePageComponent },
    { path: 'everything/:query', component: EverythingPageComponent }
  ]}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
