import { Component, OnInit, OnChanges, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-form-contato',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css']
})
export class SubFormContatoComponent implements OnInit, OnChanges {
  contatos: FormArray;
  @Output() sendForm = new EventEmitter;
  @Input('loadContatos') contatosDoGrupo: {}[];
  @Input() expanded: Boolean;
  @Input('grupoNome') grupo: string;
  @Input('selectTotal') selects = [];
  @Input('disabled') expanderDisabled = true;

  constructor(
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.contatos = this.form.array([]);
  }

  ngOnChanges(): void {
    this.contatos = this.form.array([]);
    if (typeof(this.contatosDoGrupo) !== 'undefined' && this.contatosDoGrupo.length > 0) {
      this.selects = [];
      this.contatosDoGrupo.forEach((v, i) => {
        this.selects.push({data: v});
      });
    }
  }

  addSelect() {
    this.selects.push({});
  }

  forkForm(event: FormGroup) {
    this.contatos.push(event);
    if (this.contatos.length > 0) {
        this.sendForm.emit(this.contatos);
    }
  }

  destroy(idx: number) {
    this.contatos.removeAt(idx);
    this.selects.splice(idx, 1);
  }
}
