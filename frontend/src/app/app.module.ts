import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import {APP_BASE_HREF} from '@angular/common';

import { NgModule, LOCALE_ID } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeBr from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ComercialModule } from './comercial/comercial.module';
import { MovimentacaoModule } from './movimentacao/movimentacao.module';
import { FinanceiroModule } from './financeiro/financeiro.module';
import { SharedModule } from './shared/module/nav.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/module/material.module';
import { LiberacaoModule } from './liberacao/liberacao.module';
import { Address } from './config/address';
import { HomeModule } from './home/home.module';
import { EmpresaModule } from './empresa/empresa.module';
import { PessoaModule } from './shared/form/pessoa/pessoa.module';
import { PrintLayoutModule } from './shared/print-layout/print-layout.module';
import { AdministradorModule } from './administrador/administrador.module';
import { LoginModule } from './login/login.module';
import { LoaderModule } from './shared/loader/loader.module';
import { LoaderInterceptor } from './interceptor';
import { LoaderService } from './shared/loader/loader.service';
import { LoggedModule } from './shared/material/logged/logged.module';
import { AuthService } from './login/service/auth.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentUtcDateAdapter } from './date-picker';
import { FormModule } from './shared/module/form.module';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

registerLocaleData(localeBr, 'pt');
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    PessoaModule,
    EmpresaModule,
    HomeModule,
    LoginModule,
    AdministradorModule,
    ComercialModule,
    MovimentacaoModule,
    LiberacaoModule,
    FinanceiroModule,
    SharedModule,
    PrintLayoutModule,
    AppRoutingModule,
    LoaderModule,
    FormModule,
    RichTextEditorAllModule

  ],
  providers: [
    LoaderService,
AuthService,
    Address,
    {provide: APP_BASE_HREF, useValue: '/'},
    // {provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
