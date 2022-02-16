import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FrmEmpBuscadorComponent } from './frm-emp-buscador/frm-emp-buscador.component';



@NgModule({
  declarations: [
    FrmEmpBuscadorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports:[
    FrmEmpBuscadorComponent,
  ]
})
export class ComponentsModule { }
