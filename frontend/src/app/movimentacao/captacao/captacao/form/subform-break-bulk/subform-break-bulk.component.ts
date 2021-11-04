import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subform-break-bulk',
  templateUrl: './subform-break-bulk.component.html',
  styleUrls: ['./subform-break-bulk.component.css']
})
export class SubformBreakBulkComponent implements OnInit {
  formulario: FormGroup;
  @Input() formReceive: FormGroup;
  @Input() breakBulkData: any;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      pesoBruto: [((typeof (this.breakBulkData) !== 'undefined') ? this.breakBulkData[0].peso : null), Validators.required],
      metroCubico: [((typeof (this.breakBulkData) !== 'undefined') ? this.breakBulkData[0].metro_cubico : null), Validators.required]
    })

    if (typeof (this.formReceive) !== 'undefined') {
      this.formReceive.addControl('break_bulk_info', this.formulario);
    }
  }

  ngOnDestroy(): void {
    this.formReceive.removeControl('break_bulk_info');
  }
}
