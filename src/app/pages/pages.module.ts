import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { CdkDragDrop } from '@angular/cdk/drag-drop';


import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { SettingsComponent } from './settings/settings.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component'; 
 
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { BlankComponent } from './blank.component';
import { CatMixtoComponent } from './cat-mixto/cat-mixto.component';
import { CatLegislativoComponent } from './cat-legislativo/cat-legislativo.component';
import { CatLegislativoAddComponent } from './cat-legislativo-add/cat-legislativo-add.component';
import { CatMixtoAddComponent } from './cat-mixto-add/cat-mixto-add.component';
import { ListExpedienteComponent } from './expediente/list-expediente/list-expediente.component';
import { BuscaExpComponent } from './expediente/busca-exp/busca-exp.component';
import { BuscaDocsComponent } from './expediente/busca-docs/busca-docs.component';
import { FrmDocComponent } from './expediente/frm-doc/frm-doc.component';
 import {DragDropModule} from '@angular/cdk/drag-drop';
import { NuevoExpComponent } from './expediente/nuevo-exp/nuevo-exp.component';
import { ReporteExpedienteComponent } from './expediente/reporte-expediente/reporte-expediente.component';

@NgModule({
  declarations: [
    PagesComponent,
    SettingsComponent,
    BienvenidaComponent,
    PerfilComponent,
    BlankComponent,
    CatMixtoComponent,
    CatLegislativoComponent,
    CatLegislativoAddComponent,
    CatMixtoAddComponent,
    ListExpedienteComponent,
    BuscaExpComponent,
    BuscaDocsComponent,
    FrmDocComponent,
    NuevoExpComponent,
    ReporteExpedienteComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
 
    NgbModule,  
    DragDropModule
  ],
  exports:[
    PagesComponent,
    SettingsComponent,
  ],  
  providers:[DecimalPipe]
})
export class PagesModule { }
