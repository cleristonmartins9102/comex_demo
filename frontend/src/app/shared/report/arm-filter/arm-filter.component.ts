import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormArray } from '@angular/forms';
import { Filter } from './model/filter.model';

@Component({
  selector: 'app-arm-filter',
  templateUrl: './arm-filter.component.html',
  styleUrls: ['./arm-filter.component.css']
})
export class ArmFilterComponent implements OnInit {
  @Input() column: { 
    config: 
    { 
      dataType: string, 
      type: string,
      nameView: string
    } 
  };
  @Input() fieldName: string;
  @Output() response = new EventEmitter;
  filter: FormControl = new FormControl(null, Validators.minLength(1));
  expression: FormControl = new FormControl('');
  filterModel = {};
  interval = [ 1 ];
  date = [];

  constructor() { }

  ngOnInit() {
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
    (<Filter>this.filterModel).nameView = 'dssd';
    this.expression.setValue(this.isDateType() ? 'igual' : 'contem');
    this.response.emit(this.filterModel);
  }

  /**
   * Metodo retorna o tipo de dados da coluna
   */
  isDateType() {
    return ( this.column.config.type === 'date' || this.column.config.type === 'datetime' ) ? true : false;
  }

  /**
   * Metodo retorna o tipo de dados da coluna
   */
  isDateTimeType() {
    return ( this.column.config.type === 'datetime' ) ? true : false;
  }

  /**
   * Metodo retorna o tipo de dados da coluna
   */
  isNumericType() {
    return ( this.column.config.type === 'number' || this.column.config.type === 'coin' ) ? true : false;
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
    this.interval = [ 1 ];
  }

  /**
   * Verifica o tipo de busca
   */
  checkCriteria() {
    if ( (<Filter>this.filterModel).expression === 'intervalo') {
      this.setInterval();
    } else {
      this.disInterval();
      this.date.splice(1, 1);
      this.setFilterData();
    }
  }

  /**
   * 
   */
  dateLegend(idx: number) {
    return idx === 0 
      ? this.interval.length === 1 
        ? 'Data' 
        : 'Data Início' 
      : 'Data Final '
  }


  receiveData(event: FormControl) {
    this.date.push(event);
    this.setFilterData();
  }

  setFilterData() {
    (<any>this.filterModel).filter = new FormArray(this.date);
  }

  show() {
    console.log(this.filterModel)
  }

}
