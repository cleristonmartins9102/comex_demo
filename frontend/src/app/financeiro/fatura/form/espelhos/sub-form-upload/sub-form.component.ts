import { Component, OnInit, OnChanges, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-form-arm-upload',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css']
})
export class SubFormUploadComponent implements OnInit, OnChanges {
  documentos: FormArray;
  @Output() sendForm = new EventEmitter;
  @Input('loadContatos') contatosDoGrupo: {}[];
  @Input() expanded: Boolean;
  @Input() documentoDirty: Boolean;
  @Input('grupoNome') grupo: string;
  @Input('selectTotal') selects = [];
  @Input() dataReceive: any;
  @Input() view: boolean;
  @Input() formReceive: boolean;


  constructor(
    private form: FormBuilder
  ) { }

  ngOnInit() {
    // this.documentos = this.form.array([]);
  }

  ngOnChanges(): void {
    this.documentos = this.form.array([]);
    if (typeof(this.dataReceive) !== 'undefined') {
      this.dataReceive.forEach(anexo => {
        this.selects.push({data: anexo});
      });
    }
  }

  addSelect() {
    if (this.selects.length <= 3) {
     this.selects.push({});
    }
  }

  forkForm(event: FormGroup) {
    this.documentos.push(event);
    if (this.documentos.length > 0) {
        // this.sendForm.emit(this.documentos);
    }
  }

  destroy(idx: number) {
    this.documentos.removeAt(idx);
    this.selects.splice(idx, 1);
  }
}
