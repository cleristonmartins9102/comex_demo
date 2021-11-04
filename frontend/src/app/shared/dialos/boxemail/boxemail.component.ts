import { Component, OnInit, Inject, ElementRef, ViewChild, Renderer2, ComponentFactoryResolver, Injector, EmbeddedViewRef, ApplicationRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef, MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { SendEmailService } from './service/send-email.service';
import { Response } from './model/save-response.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Grupo } from './model/grupo-email.model';
import { OcorrenciasComponent } from './ocorrencias/ocorrencias.component';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { isArray } from 'util';

@Component({
  selector: 'app-boxemail',
  templateUrl: './boxemail.component.html',
  styleUrls: ['./boxemail.component.css'],
  animations: [
    trigger('loading', [
      state('off', style({
        opacity: '0'
      })),
      state('on', style({
        opacity: '1'
      })),
      transition('*=>off', animate('100ms')),
      transition('*=>on', animate('100ms'))
    ]),
    trigger('mail', [
      state('off', style({
        opacity: '0.2'
      })),
      state('on', style({
        opacity: '1'
      })),
      transition('*=>off', animate('200ms')),
      transition('*=>on', animate('200ms'))
    ]),
  ]
})
export class BoxemailComponent implements OnInit {
  ocorrencias: any[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  grupoCtrl = new FormControl();
  filteredDestination: Observable<any>;
  groupsSelected: {}[] = [];
  allDestinations: {}[] = [{nome: 'Universal', email: 'cleriston.mari@gmail.com'}, {nome: 'Faturamento DI', email: 'cleriston.mari@gmail.com'}];
  // allDestinationsEmails: [];
  @ViewChild('grupoInput') grupoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('teste') teste: ElementRef;
  private editArea: HTMLElement;
  @ViewChild("RTE", null) public rteObj: RichTextEditorComponent;
  lista = [];
  formulario: FormGroup;
  loading = 'off';
  card_mail = 'on';
  ocorrenciaSelecionada: any[] = [];
  public tools: object = {
    items: ['Undo', 'Redo', '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'SubScript', 'SuperScript', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
        'Indent', 'Outdent', '|', 'CreateLink'
      ]
    };

  constructor(
    private formBuilder: FormBuilder,
    private backEnd: SendEmailService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BoxemailComponent>,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filteredDestination = this.grupoCtrl.valueChanges.pipe(
      startWith(null),
      map((grupo: Grupo | null) => grupo ? this._filter(grupo) : this.allDestinations.slice()));
  }

  ngOnInit() {
    this.loading = 'off';
    this.formulario = this.formBuilder.group({
      to: this.formBuilder.array([]),
      subject: [this.data.assunto],
      body: [this.data.body],
      data: this.formBuilder.group({
        id_app: [this.data.id]
      }),
      ocorrencia: [ null ],
      module: [this.data.modulo]
    });
    this.allDestinations = this.data.destinatario;
  }

  ngAfterViewInit(): void {    
    if (typeof this.data.ocorrencias !== 'undefined' && isArray(this.data.ocorrencias)) this.showOcorrencia()
  }

  onCreate(): void {
    // Target element which we going to drop text
    // this.editArea = this.rteObj.inputElement as HTMLElement;
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.groupsSelected.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.grupoCtrl.setValue(null);
    }
  }

  addOcorrenciaOnBody() {
      this.data.ocorrencias.forEach( ocorrencia => { 
        if ( ocorrencia.tipo === 'ocacional' ) this.ocorrencias.push( ocorrencia );
      }); 
  }

  showOcorrencia() {
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(OcorrenciasComponent).create(this.injector);
    componentRef.instance.ocorrencias = this.ocorrencias;
    this.ocorrenciaSelecionada = componentRef.instance.ocorrenciaSelecionada;

    this.appRef.attachView(componentRef.hostView);

    // console.log(componentRef);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    const span = document.body.querySelector('.navio');
    if (span) span.appendChild(domElem);
    this.addOcorrenciaOnBody();  
  }

  remove(grupo: string, idx: number): void {
    const destination = <FormArray>this.formulario.get('to');
    if (typeof(idx) !== 'undefined') {
      destination.value.splice(idx, 1);  
      const index = this.groupsSelected.indexOf(grupo);
      if (index >= 0) {
        this.groupsSelected.splice(idx, 1);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const destination = <FormArray>this.formulario.get('to').value;
    // console.log(event.option.value);
    this.groupsSelected.push(JSON.stringify(event.option.viewValue));
    const emails = <any>JSON.stringify((event.option.value.map( contato => contato.email)));
    destination.push(emails);
    this.grupoInput.nativeElement.value = '';
    this.grupoCtrl.setValue(null);
  }

  private _filter(value: Grupo) {
    const filterValue = value.nome;
    return this.allDestinations.filter((grupo: Grupo) => grupo.nome.indexOf(filterValue) === 0);
  }

  sendEmail() {
    this.formulario.get('ocorrencia').setValue(this.ocorrenciaSelecionada);
    if (typeof this.rteObj !== 'undefined') {
      const checkbox = (this.rteObj as RichTextEditorComponent).element.querySelectorAll('mat-checkbox') as any
      checkbox.forEach(cb => cb.remove())
    }
    this.formulario.get('body').setValue((typeof this.data.allowEditText !== 'undefined' && this.data.allowEditText) ? this.rteObj.getHtml() : this.data.body)
    this.loading = 'on';
    this.card_mail = 'off';
    this.backEnd.send(this.formulario, this.data.link).subscribe((dados: Response) => {
      if (dados.status === 'success') {
        this.loading = 'off';
        this.openSnackBar('Enviado com sucesso!', '');
        this.card_mail = 'on';
        this.dialogRef.close({ invalidSend: false});
      } else {
        this.loading = 'off';
        this.openSnackBar('Falha ao enviar!', '');
        this.card_mail = 'on';
        this.dialogRef.close({ invalidSend: true, value: dados.message});
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 500,
    });
  }
}
