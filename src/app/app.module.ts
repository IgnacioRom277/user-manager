import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';

import { LocalStorageService } from './services/utils/local-storage.service';
import { PaginatorService } from './services/utils/paginator-service';

import { AppComponent } from './app.component';
import { DialogStandardComponent } from './pages/dialog/dialog-standard/dialog-standard.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    DialogStandardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    LocalStorageService,
    PaginatorService
  ],
  entryComponents: [
    DialogStandardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
