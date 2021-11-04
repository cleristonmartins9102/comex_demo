import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { Documento } from './Model/documento.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { MatSelect, MatOption } from '@angular/material';

@Component({
  selector: 'arm-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnDestroy {
  tiposdoc: Observable<any>;
  destroed: Boolean;
  empresas: Observable<any>;
  formulario: FormGroup;
  selectDisabled: Boolean;
  @Output() close = new EventEmitter();
  @Output() sendForm = new EventEmitter;
  @Output() selfDestroy = new EventEmitter;
  @Input('id') id_componente: number;
  @Input() receiveData: Documento;
  @Input() view: boolean;
  @Input() formReceive: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private empresaDropDown: GetEmpresaService,
    private bkTipoDocumento: TipoDocumentoService,
  ) { }

  async ngOnInit() {
    this.tiposdoc = this.bkTipoDocumento.getTipoDocumentoByUtilidade('fatura').pipe(take(1));
    this.formulario = this.formBuilder.group({
      id_tipodocumento: [null, Validators.required],
      id_upload: [null, Validators.required],
    });
    if (typeof (this.receiveData) !== 'undefined') {
      this.selectDisabled = true;
      this.formulario.patchValue(
        {
          id_tipodocumento: this.receiveData.id_tipodocumento,
          id_upload: this.receiveData.id_upload,
        }
      );
      this.emitForm();
    }
    if (this.formReceive.get('anexos') === null) {
      this.formReceive.addControl('anexos', new FormArray([this.formulario]));
    } else {
      (this.formReceive.get('anexos') as FormArray).push(this.formulario);
    }

  }

  getNameUpload(fileName: Documento) {
    if (typeof(fileName) !== 'undefined') {
      return fileName.nome_original;
    } else {
      return null;
    }
  }

  ngOnDestroy(): void {
  }

  onClose() {
    if (this.view !== true) {
      this.formulario.reset();
      this.selfDestroy.emit(this.id_componente);
      (this.formReceive.get('anexos') as FormArray).removeAt(this.id_componente);
    }
  }

  emitForm() {
    this.sendForm.emit(this.formulario);
  }

  getTipoDocumentoNome(tipo: MatSelect) {
    const tip = (<MatOption>tipo.selected);
    return typeof (tip) !== 'undefined' && typeof (tip.viewValue) !== 'undefined' ? tip.viewValue : null;
  }

  receiveUploadInfo(fileInfo) {
    const form = this.formulario;
    form.patchValue({
      id_upload: fileInfo.id
    });
    this.emitForm();
  }
}
