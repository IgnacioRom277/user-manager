import { NgModule } from "@angular/core";

import { MaterialModule } from './../material/material.module';

const sharedModules = [
  MaterialModule
];

const exportModules = [...sharedModules];

@NgModule({
  imports: sharedModules,
  exports: exportModules
})

export class SharedModule { }