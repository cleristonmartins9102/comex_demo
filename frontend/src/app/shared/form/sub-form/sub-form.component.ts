import { Component, OnInit, Input, Output, ViewChildren, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { FormValuesCompleteService } from 'src/app/comercial/service/form-values-complete.service';

@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.css']
})
export class SubFormComponent implements OnInit {
  predicados;
  formulario: FormGroup;
  columns: any;
  subForm: FormGroup;
  appValor: String[] = ['Container', 'Imposto', 'Metro Cúbico', 'Tonelada', 'Serviço', 'Únidade', 'Valor Mercadoria', 'Volume'];
  @Input() sendResponse;
  @Input() receiveDataForm;
  @Input() fileNameReceived: string;
  @Input() index: string;
  @Input() subFormClose: Boolean = false;
  @Input() formEdit: Boolean = false;
  @Input() typeCall: string;
  @Input() minimum: Boolean = false;
  @ViewChildren('seletor') seletor;
  @Input('estimateTemplate') estimateTemplate: TemplateRef<any>;

  @Output() responseFormValue = new EventEmitter();
  @Output() selectChangeReponse = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private predDropDw: FormValuesCompleteService
  ) { }

  ngOnInit() {
    this.columns = this.receiveDataForm.columns;
    this.subForm = this.receiveDataForm.estructure();
    this.formulario = this.formBuilder.group({
      [this.receiveDataForm.arrayName]: this.formBuilder.array([
        this.subForm
      ]),
    });
    this.emitterFormValue();
  }

  checkTypeCall() {
    if (typeof (this.typeCall) !== 'undefined') {
      return this.typeCall;
    }
  }

  getStyle(element: any) {
    const arrStyle = '';
    const style = element.config.element.option.style;
    if (typeof (style) !== 'undefined') {
      return (style);
    }
  }

  getControl(control: string) {
    return (<FormGroup>this.formulario.get(control)).controls;
  }

  selectChange(event: string, currentField: string) {
    const object = {
      id: event,
      currentField: currentField
    };
    this.selectChangeReponse.emit(object);
  }
  

  getLegend(column: { config }) {
    if (typeof (column.config.element.option.legend) === 'undefined') {
      return 'legend';
    } else {
      return column.config.element.option.legend;
    }
  }

  trackByFn(index: number, item: any) {
    return item.id_individuo;
  }

  getValueId(column: { config }) {
    if (typeof (column.config.element.option.id) === 'undefined') {
      return 'id';
    } else {
      return column.config.element.option.id;
    }
  }

  emitterFormValue() {
    this.responseFormValue.emit(this.formulario);
  }

  addItem() {
    const controlArr: any = this.formulario.get(this.receiveDataForm.arrayName);
    controlArr.push(this.receiveDataForm.estructure());
  }

  removeItem(idx) {
    if (idx !== 0 || this.minimum) {
      const controlArr: any = this.formulario.get(this.receiveDataForm.arrayName);
      controlArr.removeAt(idx);
    }
  }

  receiveUploadInfo(fileInfo) {
    if (typeof (this.receiveDataForm.arrayName) !== 'undefined') {
      const ctrl = (<FormArray>this.formulario.controls[this.receiveDataForm.arrayName]).at(fileInfo.index);
      ctrl.get('id_documento').setValue(fileInfo.id);
    }
  }
}
