import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ShareModule } from '../share/share.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/News/reducer';
import { EffectsModule } from '@ngrx/effects';
import { newsEffects } from './store';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptors } from './interceptors/auth.interceptors';
import { PostComponent } from './components/post/post.component';
import { PaginationButtonComponent } from './components/pagination-button/pagination-button.component';
import { EverythingPageComponent } from './pages/everything-page/everything-page.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HomePageComponent,
    NavBarComponent,
    PostComponent,
    PaginationButtonComponent,
    EverythingPageComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ShareModule,
    StoreModule.forFeature('news', reducer),
    EffectsModule.forFeature(newsEffects)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptors,
      multi: true
    }
  ]
})
export class FeatureModule { }
