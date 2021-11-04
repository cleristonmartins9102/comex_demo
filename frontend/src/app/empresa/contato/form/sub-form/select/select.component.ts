import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GetEmpresaService } from 'src/app/empresa/service/get-empresa.service';
import { ContatoEmpresaService } from 'src/app/empresa/service/contato.service';
import { Contato } from './Model/contato.model';

@Component({
  selector: 'arm-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnDestroy {
  contatos: Observable<any>;
  destroed: Boolean;
  empresas: Observable<any>;
  formulario: FormGroup;
  selectDisabled: Boolean;
  @Output() close = new EventEmitter();
  @Output() sendForm = new EventEmitter;
  @Output() selfDestroy = new EventEmitter;
  @Input('id') id_componente: Number;
  @Input() receiveData: Contato;


  constructor(
    private formBuilder: FormBuilder,
    private empresaDropDown: GetEmpresaService,
    private bkContatoGrupo: ContatoEmpresaService,
  ) { }

  async ngOnInit() {
    this.empresas = this.empresaDropDown.getEmpresaAll().pipe(take(1));
    this.formulario = this.formBuilder.group({
      id_coadjuvante: [null, Validators.required],
      id_contato: [null, Validators.required],
    });
    if (typeof (this.receiveData) !== 'undefined') {
      this.selectDisabled = true;
      this.formulario.patchValue(
        {
          id_coadjuvante: this.receiveData.id_individuo,
          id_contato: this.receiveData.id_contato,
        }
      );
      await this.getContato(this.receiveData.id_individuo);
      this.emitForm();
    }
  }

  ngOnDestroy(): void {
  }

  onClose() {
    this.formulario.reset();
    this.selfDestroy.emit(this.id_componente);
  }

  emitForm() {
    this.sendForm.emit(this.formulario);
  }

  getContato(empresa: string) {
    const object = {
      id: empresa,
      currentField: null
    };
    this.contatos = this.bkContatoGrupo.getContato(object).pipe(take(1));
  }
}
