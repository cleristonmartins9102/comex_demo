import { Component, Inject, Input, OnInit, Output, OnChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { EventEmitter } from '@angular/core';

import { DialogUploadComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnChanges {
  fileInfo: any = {};

  @Output()
  fileInfoResAceite = new EventEmitter;

  @Output()
  fileInfoResProposta = new EventEmitter;

  @Input() buttonLegend: string; // Botão principal nome
  @Input() invite: string;
  @Input() formEdit: boolean = true;
  @Input() fileNameReceived: string;

  constructor(
    public dialog: MatDialog,
    public uploadService: UploadService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

  ngOnInit() {
    if (this.fileNameReceived != null) {
      this.fileInfo.name = this.fileNameReceived;
    }
  }

  ngOnChanges() {
    this.fileInfo.name = this.fileNameReceived;
  }

  public openUploadDialog() {
    const dialogRef = this.dialog.open(DialogUploadComponent,
      { width: '30%', height: '35%',  data: { infoUp: this.invite} });
      dialogRef.afterClosed().subscribe((res) => {
        this.fileInfo.name = (typeof(res.dados) !== 'undefined') ? res.dados.fileNameOri : null;
        this.fileInfo.id = (typeof(res.dados) !== 'undefined') ? res.dados.id : null;
        if (this.invite === 'aceite_proposta') {
          this.fileInfoResAceite.emit(this.fileInfo.id);
        } else {
          this.fileInfoResProposta.emit(this.fileInfo.id);
        }
      });
  }
}
