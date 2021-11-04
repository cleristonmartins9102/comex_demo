import { Component, OnInit, EventEmitter, Output, OnChanges, Input } from '@angular/core';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { MatSelect } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { TipoDocumento } from 'src/app/shared/model/tipo-documento.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnChanges {
  tipoDocumento: string;
  formulario: FormGroup;
  destroy: boolean;
  @Output() notifyDestroy = new EventEmitter;
  @Output() sendFormulario = new EventEmitter;
  @Input() populateData;
  @Input() tiposDocumentos: TipoDocumento[];

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id_tipodocumento: [null, Validators.required],
      id_upload: [null, Validators.required],
    });
    if (typeof (this.populateData) !== 'undefined') {
      this.formulario.patchValue({
        id_tipodocumento: this.populateData.id_tipodocumento,
        id_upload: this.populateData.id_upload,
      });
      this.sendForm();
    }
  }

  ngOnChanges() {
  }

  getNomeDocumento(selected: MatSelect | any): void {
    let nome = selected.selected.id;
    nome = nome.replace(/ /g, '_');
    this.tipoDocumento = `movimentacao/${nome}`;
    this.formulario.patchValue({
      id_tipodocumento: selected.value
    });
  }

  receiveFileInfo(info: any): void {
    if (typeof (info.id) !== 'undefined') {
      this.formulario.patchValue({
        id_upload: info.id
      });
      this.sendForm();
    }
  }

  selfDestroy(): void {
    const errors = this.formulario.get('id_tipodocumento').errors;
    if (!errors) {
      const id = this.formulario.get('id_tipodocumento').value;
      this.formulario.reset();
      this.notifyDestroy.emit(id);
    }
    this.destroy = true;
  }

  private sendForm() {
    this.sendFormulario.emit(this.formulario);
  }

}
