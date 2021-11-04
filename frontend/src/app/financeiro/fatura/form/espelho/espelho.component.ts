import { Component, OnInit, ViewChild } from '@angular/core';
import { FormFatEspArmComponent } from '../espelhos/armazenagem/form.component';
import { FormEspNotDebAgeComponent } from '../espelhos/nota-agenciamento/form.component';
import { FormEspNotDebTrcComponent } from '../espelhos/nota-debito-trc/form.component';
import { BackEndFatura } from 'src/app/financeiro/fatura/service/back-end.service';
import { MatOption, MatSelect, MatCheckbox } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FaturaModelo } from '../../model/fatura-modelo.model';
import { FormEspExpComponent } from '../espelhos/exportacao/form.component';

@Component({
  selector: 'app-form-fatura',
  templateUrl: './espelho.component.html',
  styleUrls: ['./espelho.component.css']
})
export class FormFaturaComponent implements OnInit {
  modelos: any;
  template: any;
  formEdit: boolean;
  statusFatura: string;
  modeloTipo: string;
  formulario: FormGroup;
  comissaoDespachanteCheckbox: boolean = true;
  nomeDespachante: string;
  @ViewChild('selector') selector;
  @ViewChild(FormFatEspArmComponent) arm: FormFatEspArmComponent;
  @ViewChild(FormEspExpComponent) exp: FormEspExpComponent;
  @ViewChild(FormEspNotDebTrcComponent) notDebTrc: FormEspNotDebTrcComponent;
  @ViewChild(FormEspNotDebAgeComponent) notDebAge: FormEspNotDebAgeComponent;

  constructor(
    private fatura: BackEndFatura,
    private routerAct: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id_faturamodelo: [null],
    });



    this.modelos = this.fatura.getFaturaModeloAllDropDown();

    // Verifica se o formulario é passivel a popular os dados
    if (this.checkIfIsEditForm(this.routerAct)) {
      this.formEdit = true;
      // this.propNumVisible = true;
      // Definindo que o formulário sera apenas para edicão
      const id: string = this.routerAct.snapshot.paramMap.get('id');
      this.fatura.getFaturaById(id).subscribe((dados: FaturaModelo) => {
        if (dados.id_faturastatus === '5') {
          const recalculo: boolean = typeof (dados.recalculo) !== 'undefined' ? (dados.recalculo === 'sim' ? true : false) : true;
          this.ativarRecalculo(recalculo);
        }
        this.formulario.get('id_faturamodelo').setValue(dados.id_faturamodelo);
        this.tipoFatura(dados);
        this.setComissao(dados);
      });
    }

  }

  checkIfIsEditForm(router: ActivatedRoute) {
    // Verifica se tem parametro id e se é um editor
    if (router.snapshot.paramMap.get('id') == null) {
      return false;
    } else {
      return true;
    }
  }

  checkModelo(model) {
    if (model.id_faturamodelo === '1') {
      return true;
    }
  }

  ativarComissao() {
    this.formulario.setControl('comissao_despachante', new FormControl(true));
    this.modeloTipo = 'arm';
  }

  /**
   * Metodo para ativar o recurso de recalculo da fatura
   * @param recalculo boolean
   */
  ativarRecalculo(recalculo: boolean) {
    this.formulario.setControl('recalculo', new FormControl(recalculo)); 
    this.modeloTipo = 'arm';
    this.statusFatura = '5';
  }

  tipoFatura(dados = null) {
    const modelo = parseInt(this.formulario.get('id_faturamodelo').value);
    switch (modelo) {
      case 1:
        this.arm.modelo = 'armazenagem';
        if (dados) {
          this.arm.populateForm(this.arm.formulario, dados);
        }
        this.ativarComissao();
        this.arm.forkComissaoDisable(this.formulario);
        this.arm.forkRecalculoDisable(this.formulario);

        this.template = this.arm.getTemplate();

        // Observando o status da fatura para ver quando vai ser previa e mostrar o botao de recalculo
        this.changeStatusObserver(this.arm);

        break;

      case 2:
        if (dados) {
          this.exp.populateForm(this.exp.formulario, dados);
        }
        this.arm.forkComissaoDisable(this.formulario);
        this.template = this.exp.getTemplate();
        this.ativarComissao();
        this.ativarRecalculo(null);

        break;

      case 3:
        if (dados) {
          this.notDebTrc.populateForm(this.notDebTrc.formulario, dados);
        }
        this.template = this.notDebTrc.getTemplate();
        break;

      case 4:
        if (dados) {
          this.notDebAge.populateForm(this.notDebAge.formulario, dados);
        }
        this.template = this.notDebAge.getTemplate();
        break;

      default:
        break;
    }
  }

  private setComissao(dados) {
    this.nomeDespachante = dados.despachante_nome;
    if (typeof (dados.comissao_despachante) !== 'undefined' && dados.comissao_despachante !== 'des_not_com') {
      this.formulario.get('comissao_despachante').setValue(dados.comissao_despachante);
    } else {
      this.comissaoDespachanteCheckbox = false;
      if (this.formulario.get('comissao_despachante') !== null) {
        this.formulario.get('comissao_despachante').setValue(false);
      }
    }
  }

  /**
   * Metodo para mostrar o checkbox para ativar ou desativar a ação de recalculo
   */
  private showRecalculo() {
    this.ativarRecalculo(true);
    this.arm.forkRecalculoDisable(this.formulario);
  }

  private setRecalculo(dados) {
    if (typeof (dados.recalculo) !== 'undefined') {
      this.formulario.get('recalculo').setValue(dados.recaltulo);
    } 
  }

  /**
   * Metodo para observar as alterações do status
   */
  private changeStatusObserver(component: any) {
    const rec = () => {
      component.forkRecalculoDisable(this.formulario);
      this.cleanValidator(component);
    }

    // if (component.formulario.get('id_status').value === '5') rec();
    (component.formulario.get('id_status') as FormControl).valueChanges.subscribe(status => {
      this.statusFatura = status;
      if (status === '5') {
        rec();
      }
    }
    );
  }

  /**
   * Metodo para cancelar todos os validatos dos custos dos itens
   */
  private cleanValidator(component) {
    let itens = component.formulario.get('itens');
    if (itens && itens.length > 0) {
      itens = itens.controls[0].controls;
      itens.forEach(item => (item.get('valor_custo')).clearValidators())
    }
  }

  /**
  * Metodo para setar todos os validatos dos custos dos itens
  */
  private setValidator(component) {
    let itens = component.formulario.get('itens');
    if (itens.length > 0) {
      itens = itens.controls[0].controls;
      itens.forEach(item => (item.get('valor_custo')).setValidators(Validators.required))
    }
  }

  /**
   * Metodo que remove o control recalculo do formulário
   */
  private removoControlRecalculoForm() {
    this.formulario.removeControl('recalculo');
  }


}
