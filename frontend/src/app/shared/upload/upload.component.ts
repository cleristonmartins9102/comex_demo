import { Component, Inject, Input, OnInit, Output, OnChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { EventEmitter } from '@angular/core';

import { UploadServiceShared } from './upload.service';
import { DialogComponent } from './dialog/dialog.component';
import { FileInfo } from './model/fileinfo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() fileInfo: FileInfo = {name: null};
  @Input() infoUp: string;
  @Input() btnEnabled = true;
  @Input() doc: string;

  @Output()
  responseFileInfo = new EventEmitter;

  @Input() buttonLegend: string; // Botão principal nome
  @Input() invite: Observable<any>;
  @Input() index;
  @Input() fileNameReceived;

  constructor(
    public dialog: MatDialog,
    public uploadService: UploadServiceShared,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.fileInfo.index = typeof(this.index) !== 'undefined' ? this.index : null;
    if (this.fileNameReceived != null) {
      this.fileInfo.name = this.fileNameReceived;
    }
  }

  checkFileNameFound() {
    if (typeof(this.fileInfo) !== 'undefined' && this.fileInfo.name) {
      return false;
    } else {
      return true;
    }
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(DialogComponent,
      { width: '30%', height: '35%', data: { infoUp: this.invite} });
    dialogRef.afterClosed().subscribe((res) => {
      this.fileInfo.name = (typeof (res.dados) !== 'undefined') ? res.dados.fileNameOri : null;
      this.fileInfo.id = (typeof (res.dados) !== 'undefined') ? res.dados.id : null;
      this.responseFileInfo.emit(this.fileInfo);
    });
  }
}
