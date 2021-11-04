import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { TipoDocumentoService } from 'src/app/shared/service/tipo-documento.service';
import { TipoDocumento } from 'src/app/shared/model/tipo-documento.model';

@Component({
  selector: 'app-subform-lib-upload',
  templateUrl: './subform.component.html',
  styleUrls: ['./subform.component.css']
})
export class SubformLibUpComponent implements OnInit, OnChanges {
  // selects: any[] = [];
  select: any;
  documentos = [];
  app: string;
  tiposDocumentos: TipoDocumento[];
  @Output() sendDocumentos = new EventEmitter;
  @Input() selects: Subject<any>;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
  ) {}

  ngOnInit() {
    this.selects.subscribe( (d: number[]) => {
      this.select = d;
    });
    this.tipoDocumentoService.getTipoDocumentoByUtilidade('captacao').pipe(take(1)).subscribe( (documentos: TipoDocumento[]) => this.tiposDocumentos = documentos);
  }

  ngOnChanges() {
  }

  addDoc(): void {
    this.select.push(1);
    this.selects.next(this.select);
  }

  receiveFormulario(form: FormGroup): void {
    const tipo = form.get('id_tipodocumento').value;
    if (typeof (tipo) !== 'undefined') {
      this.documentos.push(form.value);
      this.sendForm();
    }
  }

  removeUploadDestroed(id: string): void {
    this.documentos = this.documentos.filter( doc => doc.id_tipodocumento !== id);
    this.sendForm();
  }

  private sendForm() {
    this.sendDocumentos.emit(this.documentos);
  }
}
