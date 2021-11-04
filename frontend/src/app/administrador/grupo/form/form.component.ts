import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { GrupoAcesso } from '../model/grupo-acesso.model';
import { GrupoService } from '../service/back-end.service';
import { Acesso } from '../model/acesso.module';
import { AplicacaoService } from '../../aplicacao/service/back-end.service';

@Component({
  selector: 'app-form-grupo',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormGrupoComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  gruposAcesso: Array<GrupoAcesso>;
  aplicacoes: Array<any> = [];
  membros: any;
  acessos: Acesso[];

  constructor(
    private formBuilde: FormBuilder,
    private grupoService: GrupoService,
    private aplicacaoService: AplicacaoService
  ) { }

  ngOnInit() {
    this.aplicacaoService.allAplicacoes.subscribe(app => this.aplicacoes = app);
    this.grupoService.allGrupos.subscribe((grupos: any) => this.gruposAcesso = grupos);
    this.formulario = this.formBuilde.group({
      id_grupoacesso: [null],
      permissoes: this.formBuilde.array([])
    });
  }

  ngOnDestroy() {
  }
  /**
   * Recebe o id do grupo selecionado do componente grupos
   * @param id_grupoacesso <ID> do grupo selecionado
   */
  getGrupo(id_grupoacesso: string) {
    // Inserindo no formulario o id do grupo de acesso.
    this.formulario.get('id_grupoacesso').setValue(id_grupoacesso);

    const currentGrupo = this.gruposAcesso.filter(grupo => grupo.id_grupoacesso === id_grupoacesso);
    this.membros = currentGrupo[0].membros;
    this.acessos = currentGrupo[0].acessos;
  }

  receiveItens(formulario: FormArray) {
    const form = this.formulario.get('permissoes').value;
    form.splice(0, (form.length));
    form.push(formulario.value);
  }

  show() {
    console.log(this.formulario)
  }
  onSubmite() {
    const per = this.formulario.value.permissoes[0];
    const full = {
      'id_grupoacesso': this.formulario.value.id_grupoacesso,
      'modulos': []
    };
    per.forEach(modulo => {
      const response = full.modulos.indexOf(item => item.id_module === modulo.id_module);
      if (response === -1) {
        full.modulos.push({
          'id_modulo': modulo.id_modulo,
          'id_modulosub': modulo.id_submodulo,
          'permissoes': modulo.permission
        });
      }
    });
    const form: any = this.formulario;
    this.grupoService.save(full).subscribe((dados: any) => {
      if (dados.status === 'success') {
        // this.subFormClose = false;
        // if (!this.formEdit) {
        //   this.cleanForm(form);
        // } else {
        //   this.openDialog();
        // }
      }
    });
  }
}
