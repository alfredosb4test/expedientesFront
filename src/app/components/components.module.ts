import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FrmEmpBuscadorComponent } from './frm-emp-buscador/frm-emp-buscador.component';
import { FrmExpedienteComponent } from './frm-expediente/frm-expediente.component';



@NgModule({
  declarations: [
    FrmEmpBuscadorComponent,
    FrmExpedienteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports:[
    FrmEmpBuscadorComponent,
    FrmExpedienteComponent,
  ]
})
export class ComponentsModule { }
