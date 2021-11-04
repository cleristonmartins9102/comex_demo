import { Component, OnInit, OnChanges, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Acesso } from '../../model/acesso.module';

@Component({
  selector: 'app-sub-form-grupoacesso',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css']
})
export class SubFormGruAceComponent implements OnInit, OnChanges {
  @Input('acessos') acessos: Acesso;
  @Input('aplicacoes') aplicacoes = [];
  @Output() removeIte = new EventEmitter;
  @Output() sendItens = new EventEmitter;

  // Aplicacao selectionada
  selectedApp = {
    modulos: null
  };

  selectedModule = {
    sub: null
  };
  formulario: FormArray;
  currencyFilhosForm: Acesso[] = [];
  currencyFilhosView: Acesso[] = [];
  currencyFilhosReport: Acesso[] = [];
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.array([]);
  }

  ngOnChanges() {
  }

  /**
   * Recebe cada item do componente formulario/view
   * @param item item recebido com as permissoes
   */
  receiveItem(item) {
    this.formulario.value.push(item.value);
    this.sendItens.emit(this.formulario);
  }

  /**
   * Recebe o item para poder remover ele do formulario principal
   * @param item item recebido
   */
  removeItem(item) {
    const idx_item = this.formulario.value.findIndex(ite => ite.value.id_modulo === item.value.id_modulo);
    if (idx_item !== -1) {
      this.formulario.value.splice(idx_item, 1);
      this.sendItens.emit(this.formulario);
    }
  }


  show() {
    console.log(this.formulario);
  }
}
