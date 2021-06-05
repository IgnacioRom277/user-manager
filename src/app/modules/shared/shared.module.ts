import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { MaterialModule } from './../material/material.module';

const sharedModules = [
  FlexLayoutModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  ReactiveFormsModule
];

const exportModules = [...sharedModules];

@NgModule({
  imports: sharedModules,
  exports: exportModules
})

export class SharedModule { }