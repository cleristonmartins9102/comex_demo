import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Filter } from '../../model/filter.model';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  filter: FormControl = new FormControl(null, Validators.minLength(1));
  @Input() fieldName: string;
  @Input() column: any;
  @Input() idx: any;
  @Input() expression: FormControl = new FormControl('');
  @Output() response = new EventEmitter;
  filterModel = {};
  interval = [ 1 ];
  formulario: FormGroup;

  constructor() { }

  ngOnInit() {

    this.formulario = new FormGroup( {
      filter:new FormControl(null, Validators.minLength(1))
    });
    this.filter.valueChanges.subscribe(filter => {
      if (this.filter.valid) {
        (<Filter>this.filterModel).filter = filter;
      } else {
        (<Filter>this.filterModel).filter = '';
      }
    });
    this.expression.valueChanges.subscribe(expression => {
      (<Filter>this.filterModel).expression = expression;
    });

    (<Filter>this.filterModel).field = this.fieldName;
    // this.expression.setValue(this.isDateType() ? 'igual' : 'contem');
    this.emitForm();
  }

  emitForm() {
    this.response.emit(this.filter);
  }

  /**
   * Metodo retorna o tipo de dados da coluna
   */
  isDateType() {
    return this.column.config.type === 'date' ? true : false;
  }

  /**
   * Seta um intervalo de datas
   */
  setInterval() {
    this.interval.push( 1 );
  }

  /**
   * Desabilita intervalo
   */
  disInterval() {
    this.interval.splice( 1, 1);
  }

  /**
   * Verifica o tipo de busca
   */
  checkCriteria() {
    if ( (<Filter>this.filterModel).expression === 'intervalo') {
      this.setInterval();
    } else {
      this.disInterval();
    }
  }

  /**
   * 
   */
  dateLegend() {
    this.checkCriteria();
    return this.idx === 0 
      ? this.interval.length === 1 
        ? 'Data' 
        : 'Data Início' 
      : 'Data Final '
  }

  show() {
    console.log(this.formulario)
  }


}
