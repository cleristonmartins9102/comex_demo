import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() modulo: any;
  @Input() option: boolean;
  @Output() sendItem = new EventEmitter;
  @Output() removeItem = new EventEmitter;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id_modulo: [null],
      id_submodulo: [null],
      permission: this.formBuilder.array([])
    });
  }


  permission(value: string) {
    const perValue = this.formulario.get('permission').value;
    const per = (<string[]>perValue).indexOf(value);
    if (per === -1) {
      perValue.push(value);
      this.setValueForm();
    } else {
      perValue.splice(per, 1);
    }


    if (perValue.length > 0 && perValue.length === 1) {
      this.sendItem.emit(this.formulario);
      this.setValueForm();
    } else {
    }
    if (perValue.length === 0) {
      this.removeItem.emit(this.formulario);
    }
  }

  private setValueForm() {
    this.formulario.patchValue({
      id_modulo: this.modulo.id_modulo,
      id_submodulo: this.modulo.id_modulosub,
    }
    );
  }
}
