import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: any
    ) {}
}
