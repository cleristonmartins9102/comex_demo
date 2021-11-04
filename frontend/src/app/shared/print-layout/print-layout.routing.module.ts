import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { PrintLayoutComponent } from './print-layout.component';
import { BodyEspelhoFaturaComponent } from 'src/app/financeiro/fatura/print/body/body.component';



const routes: Routes = [
    { path: 'print', component: PrintLayoutComponent,
        children: [
            { path: 'fatura/:id', component: BodyEspelhoFaturaComponent
        },
            // { path: 'fatura/:id', component: PrintFaturaArmComponent },
            // { path: 'editar/:id', component: FormLiberacaoComponent },
            // { path: 'lista', component: ListaLiberacaoComponent },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrintLayoutRoutingModule {}



