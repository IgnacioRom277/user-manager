import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

const matImports = [
  MatButtonModule
];

@NgModule({
  imports: matImports,
  exports: matImports
})

export class MaterialModule { }