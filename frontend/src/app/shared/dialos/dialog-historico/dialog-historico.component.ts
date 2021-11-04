import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, take } from 'rxjs/operators';

export interface DialogData {
  ocorrencia: string;
  created_at: string;
  created_by: string;
  modulo: string;
}

@Component({
  selector: 'app-dialog-historico',
  templateUrl: './dialog-historico.component.html',
  styleUrls: ['./dialog-historico.component.css']
})
export class DialogHistoricoComponent implements OnInit {
  dataSource;
  rowTable: any[];
  constructor(
    public dialogRef: MatDialogRef<DialogHistoricoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit() {
    this.rowTable = ['ocorrencia', 'created_at', 'created_by', 'modulo'];
    this.data.dados.subscribe( d => {
        if ( typeof(d['items'][0].modulo ) === 'undefined') {
          this.rowTable = [ 'ocorrencia', 'created_at', 'created_by' ];
        }
    }
    );
    this.dataSource = this.data.dados
      .pipe(
        take(1),
        map((dados: { items }) => dados.items)
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
