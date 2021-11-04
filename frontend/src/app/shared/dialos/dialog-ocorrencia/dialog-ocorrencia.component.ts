import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-ocorrencia',
  templateUrl: './dialog-ocorrencia.component.html',
  styleUrls: ['./dialog-ocorrencia.component.css']
})
export class DialogOcorrenciaComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogOcorrenciaComponent>
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      ocorrencia: [null, [Validators.required, Validators.minLength(10)]]
    })
  }

  closeDialog() {
    this.dialogRef.close(this.formulario);
  }
}
