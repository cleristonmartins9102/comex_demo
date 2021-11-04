import { Component, OnInit, ViewChild, HostListener, Input, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent, MatMenuTrigger, MatCheckbox, MatDialog } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BackEndReport } from './service/back.service';
import { DialogHistoricoComponent } from '../dialos/dialog-historico/dialog-historico.component';
import { Filter } from './arm-filter/model/filter.model';
import { AuthService } from 'src/app/login/service/auth.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ReportComponent implements OnInit {
  // @Input() filter: string;
  @Input() module: string;
  @Input() formEdit: boolean = false;
  @Input() type: string;
  @Input() appname: string;
  @Input() title: string;
  @Input() structure: Structure;
  @Input() methodSearch: string;
  @Input() method: string = 'lista';
  @Input() filterStart: Filter;
  @Output() formResponse = new EventEmitter;
  @Output() dataReceiveApi = new EventEmitter;

  contextMenuPosition = { x: '0px', y: '0px' };
  filterExpression = ['contêm', 'igual'];
  structureSubTable: Object;
  lista: any;
  expandedElement: any = true;
  displayedColumnsList: string[];
  tableScundary: any[];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  subTableTitle: string;
  subTableDescription: string;
  subTableWidth = 'description_md';
  listEdition = null; // Lista de registros que vão ser editados quando clicado em editar
  data = new Subject;
  rowTable: string[] = [];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  innerWidth: any;
  pageSize = 10;
  pageSizeOptions: number[] = [1, 5, 10, 25];
  pageEvent: PageEvent;
  filter = [];
  filterActivated = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() hideRowEvent: boolean;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  formulario: FormGroup;
  dataHandled: string

  checked = false;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private backEnd: BackEndReport,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.formulario = new FormGroup({
      filter: new FormControl(null, Validators.minLength(1))
    });
    // Verificando se foi passado o objeto com a estrutura da tabela
    if (this.structure) {
      this.subTableTitle = this.structure.subTableTitle;
      this.subTableDescription = this.structure.subTableDescription;
      this.subTableWidth = this.structure.subTableWidth;
      this.displayedColumnsList = this.structure.columTablePrimary;
      this.tableScundary = this.structure.columTableSecundary;
    }
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // Construindo colunas na lista primaria
    this.displayedColumnsList.forEach((element: any) => {
      // Verifica se é uma coluna da lista
      if (element.config.showInList) {
        this.rowTable.push(element.nameDB);
      }

    });
    this.loadData();
    this.startFilterCheck();
  }

  show() {
    console.log(this.formulario);
    console.log('Clicado');
  }
  startFilterCheck() {
    const filter = this.filterStart;
    if (typeof (filter) !== 'undefined') {
      this.addFilter(filter);
      this.applyFilter(this.filter);
    }
  }

  checkDataType(data) {
    if (typeof (data.config.dataType) !== 'undefined') {
      return data.config.dataType;
    }
  }

  clickEvent(event, config, element) {
    if (config !== null) {
      const nameID = config.nameID;
      const dialogForm = config.config.dialogForm;
      const id = element[nameID];
      const route = config.config.route;
      if (config.config.link) {
        event.stopPropagation();
        // this.openDialog2(id);
      }
    }
  }

  dataHandleCheck(fn: any, data: any, fullData: any): boolean {
    if (typeof fn.dataHandle !== 'undefined') {
      this.dataHandled = fn.dataHandle(data, fullData)
    } else {
      this.dataHandled = ''
    }
    return Array.isArray(this.dataHandled)
  }
  
  checkHasStyle(fn: any, data: any, fullData) {
    if (typeof fn.condition.style !== 'undefined') {
      return fn.condition.style(data, fullData)
    }
  }  

  addFilter(filter: Filter) {
    const field = filter.field;
    this.filter.push(filter);
  }

  activateFilter() {
    const filter = this.filterStart;
    if (typeof (filter) === 'undefined') {
      this.filter = [];
    }
    if (this.filterActivated || this.filter.length > 0) {
      this.loadData();
    }
    this.filterActivated = !this.filterActivated;
  }

  trackByFn = (index: number, item: any) => {
    return index;
  }

  checkExpressionElement(expression: any, element: any) {
    if (typeof (expression) !== 'undefined') {
    }
  }

  loadData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (this.sort.direction === '') {
            this.sort.direction = 'desc';
          }
          if (!this.paginator.pageSize) {
            this.paginator.pageSize = this.pageSize;
          }
          if (!this.sort.active) {
            this.sort.active = 'created_at';
          }
          return this.backEnd![this.methodSearch](
            this.appname,
            this.sort.active,
            this.sort.direction,
            // 'desc',
            this.paginator.pageIndex,
            this.paginator.pageSize
          );

        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          if (this.hideRowEvent) {
            return data.items.filter((d: any) => d.complementos.eventos.length === 0);
          }
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.data.next(data);
      }

      );
    this.dataReceiveApi.emit(this.data);
  }

  download(extension: string) {
    this.backEnd.download(this.filter, this.module, this.appname);
  }

  formReply(id_element) {
    this.formResponse.emit(id_element);
  }


  onContextMenu(event: MouseEvent, element) {
    const id_element = element[`id_${this.appname}`];
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'id': id_element };
    this.contextMenu.openMenu();
  }

  onContextMenuAction(event: any, record: Object, target) {
    const recordInfo = {
      id: record[`id_${this.appname}`],
      event: event,
      title: target ? ( typeof(target.target) !== 'undefined' ? target.target.innerHTML : null ) : null,
      module: this.module,
      appname: this.appname,
      record: record
    };

    this.formResponse.emit(recordInfo);
    // this.loadData();
  }


  openFormEdit(value) {
    this.router.navigate([`/${this.module}/${this.appname}/editar`, value]);
  }



  redirectEventClick(app: string, module: string, element: { complementos: any }) {
    const evento = element.complementos.eventos.filter((d: any) => {
      return d.evento === `g_${module}`;
    });
    const id_element = evento[0][`id_forward`];
    this.router.navigate([`/${app}/${module}/editar`, id_element]);
  }

  openDialogHistorico(element: string) {
    const id_element = element[`id_${this.appname}`];
    const historicos = this.backEnd.getHistorico(id_element, this.module, this.appname);
    this.openDialog(historicos);
  }

  applyFilter(valor: any) {
    if (valor !== '') {
      const filter = [];
      // Verifica se o valor é um array, caso sim, intera todos os elementos e verifica se é objeto e instancia de FormArray
      if (Array.isArray(valor)) {
        valor.forEach(item => {
          const data = {
            field: null,
            expression: null,
            filter: null,
            nameView: null
          };
          data.field = item.field;
          data.nameView = item.nameView;
          data.expression = item.expression;
          if (typeof (item.filter) === 'object' && item.filter instanceof FormArray) {
            // Pega o valor do formGroup dentro do FormArray
            data.filter = item.filter.value;
          } else {
            data.filter = item.filter;
          }
          filter.push(data);
        });
      }
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            if (this.sort.direction === '') {
              this.sort.direction = 'desc';
            }
            if (!this.paginator.pageSize) {
              this.paginator.pageSize = this.pageSize;
            }
            if (!this.sort.active) {
              this.sort.active = 'created_at';
            }
            const obj = {
              filter: filter,
              method: this.method,
              sort: this.sort.active,
              order: 'desc',
              page: this.paginator.pageIndex,
              limit: this.paginator.pageSize
            };
            return this.backEnd!.getAllCriteria(obj, this.appname);

          }),
          map((data: any) => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.total_count;
            return data.items;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            // Catch if the GitHub API has reached its rate limit. Return empty data.
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        ).subscribe(data => this.data.next(data));
    } else {
      this.loadData();
    }
  }


  /**
   * Função que verifica se o botão vai ser editar ou consultar.
   * @param menu Menu recebido com as permissoes do report.
   * @param data Dados do registro.
   */
  checkTypeButtonEditOrQuery(menu: Menu, data: {}, auth) {
    if (typeof (menu.displayName) === 'string') return menu.displayName;
    const DISPLAYNAME = menu.displayName(data, auth);
    // menu.event = DISPLAYNAME === 'Consultar' ? 'r' : menu.event;
    return DISPLAYNAME;
  }

  checkWarningIco(column, data) {
    const warning = column.config.warning;
    // Verifica se é do tipo alerta
    if (typeof (warning) !== 'undefined' && warning.state) {
      const criteria = column.config.warning.condition.criteria;
      const expression = column.config.warning.condition.expression;
      if (column.nameDB === criteria && expression(data)) {
        return true;
      }
    }
  }

  openDialog(historicos: Observable<any>): void {
    const dialogRef = this.dialog.open(DialogHistoricoComponent, {
      panelClass: 'dialog-historico-width',
      data: { dados: historicos }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog2(id, dialogForm): void {
    // console.log(typeof(dialogForm));
    if (typeof (dialogForm) !== 'undefined') {
      const dialogRef = this.dialog.open(dialogForm, {
        panelClass: 'dialog-commom-form-width',
        data: { dados: id }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
    }


  }
}

export interface Structure {
  subTableTitle;
  subTableDescription;
  subTableWidth;
  columTablePrimary;
  columTableSecundary;
}

export interface Item {
  id: number;
  name: string;
}

interface Menu {
  displayName: Function | string,
  event: string
}

