import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Predicado } from '../../servico/form-servico/model/predicado.model';
import { GetServicos } from '../../service/get-servicos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from '../../servico/form-servico/model/servico.model';
import { PredicadoService } from './service/backend.service';
import { SaveResponse } from 'src/app/shared/model/save-response.model';
import { DialogComponent } from 'src/app/shared/dialos/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { BackPropostaService } from 'src/app/comercial/proposta/proposta/service/back-proposta.service';
import { BackendService } from 'src/app/shared/service/backend.service';
import { Regime } from '../../../../shared/model/regime.model';
import { AccessType } from 'src/app/shared/report/security/acess-type';

@Component({
  selector: 'app-form-predicado',
  templateUrl: './form-predicado.component.html',
  styleUrls: ['./form-predicado.component.css']
})
export class FormPredicadoComponent extends AccessType implements OnInit {
  formulario: FormGroup;
  predicado: Observable<Predicado>;
  servicos: Observable<Servico>;
  regimes: Regime;
  formEdit: boolean = false;
  constructor(
    private backGeral: BackendService,
    private formBuilder: FormBuilder,
    private bkservico: GetServicos,
    private sendForm: PredicadoService,
    private routerAct: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { 
    super('comercial', 'servico', 'lista de predicados');
  }

  ngOnInit() {
    this.backGeral.getRegimeAll().subscribe( (regime: Regime) => {
      this.regimes = regime;
    });
    this.formulario = this.formBuilder.group({
      id_servico: [null, Validators.required],
      id_predicado: [null, Validators.required],
      predicado: [null, Validators.required],
      descricao: [null, Validators.required],
      id_regime: [null, Validators.required],
    });
    const id: string = this.routerAct.snapshot.paramMap.get('id');
    this.bkservico.getPredicadosById(id).subscribe(d => this.populate(d));
    this.servicos = this.bkservico.getServicoAll();
    this.formEdit = this.isLocked();
  }

  backPage() {
    this.router.navigate(['comercial/servico/predicado/lista']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Predicado salvo com sucesso!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.backPage();
    });
  }

  populate(dados: Predicado) {
    this.formulario.patchValue({
      id_regime: typeof(dados.id_regime) !== 'undefined' ? dados.id_regime : null,
      id_servico: typeof(dados.id_servico) !== 'undefined' ? dados.id_servico : null,
      id_predicado: typeof(dados.id_predicado) !== 'undefined' ? dados.id_predicado : null,
      predicado: typeof(dados.nome) !== 'undefined' ? dados.nome : null,
      descricao: typeof(dados.descricao) !== 'undefined' ? dados.descricao : null,
    });
  }

  onSubmite() {
    this.sendForm.save(this.formulario).subscribe((dados: SaveResponse) => {
      if (dados.status === 'success') {
        this.openDialog();
      }
    });
  }
}
