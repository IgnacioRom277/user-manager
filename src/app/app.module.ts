import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';

import { LocalStorageService } from './services/utils/local-storage.service';
import { PaginatorService } from './services/utils/paginator-service';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule
  ],
  providers: [
    LocalStorageService,
    PaginatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
