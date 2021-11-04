import { Component, OnInit, OnChanges, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-form-lote',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css']
})
export class SubFormLoteComponent implements OnInit, OnChanges {
  documentos: FormArray;
  @Output() sendItem = new EventEmitter;
  @Output() sendForm = new EventEmitter;
  @Input() expanded: Boolean;
  @Input() documentoDirty: Boolean;
  @Input('grupoNome') grupo: string;
  @Input('selectTotal') selects = [];
  @Input() dataReceive: any;
  @Input('id_proposta') id_proposta: string;
  @Input() formFull: FormGroup;
  @Input() formEdit: boolean;
  message: string;
  constructor(
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.documentos = this.form.array([]);
  }

  ngOnChanges(): void {
    this.documentos = this.form.array([]);
    if (typeof(this.dataReceive) !== 'undefined') {
      this.dataReceive.forEach(item => {
        this.selects.push({data: item});
      });

    }
  }

  addSelect() {
    if (this.selects.length >= 0) {
     this.selects.push({});
    }
  }

  forkForm(event: FormGroup) {
    const itens = this.documentos.controls;
    if (itens.length >= 0) {
    }
    this.documentos.push(event);
    if (this.documentos.length > 0) {
        this.sendForm.emit(this.documentos);
    }
  }

  destroy(idx: number) {
    this.documentos.removeAt(idx);
    this.selects.splice(idx, 1);
  }
}
