import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-standard',
  templateUrl: './dialog-standard.component.html',
  styleUrls: ['./dialog-standard.component.css']
})
export class DialogStandardComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogStandardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  public onClickButton1(): void {
    this.dialogRef.close('Cancel');
  }

  public onClickButton2(): void {
    this.dialogRef.close('Confirm');
  }

  public onClickClose(): void {
    this.dialogRef.close('Closed');
  }

}
