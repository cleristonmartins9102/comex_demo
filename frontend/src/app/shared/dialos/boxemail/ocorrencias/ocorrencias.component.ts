import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ocorrencias',
  templateUrl: './ocorrencias.component.html',
  styleUrls: ['./ocorrencias.component.css']
})
export class OcorrenciasComponent {
  @Input() ocorrencias: any[];
  @Output('ocorrenciaSelecionada') ocorrenciaSelecionada = [];
  hasOcorrencia: boolean = false

  ngOnInit(): void {
    this.hasOcorrencia = typeof this.ocorrencias !== 'undefined' && this.ocorrencias.length > 0
    console.log(this.ocorrencias, this.hasOcorrencia)
  }

  add(target) {
    if ( !target.checked ) {
      this.ocorrenciaSelecionada.push(target.id);
    } else {
      const idx = this.ocorrenciaSelecionada.indexOf( target.id );
      if ( idx !== -1) this.ocorrenciaSelecionada.splice( idx, 1)
    }
  }
}
