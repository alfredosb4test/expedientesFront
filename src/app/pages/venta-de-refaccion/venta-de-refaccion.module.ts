import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaDeRefaccionRoutingModule } from './venta-de-refaccion.routing.module';
import { VentaDeRefaccionComponent } from './venta-de-refaccion/venta-de-refaccion.component';
import { RefCotizacionesComponent } from './ref-cotizaciones/ref-cotizaciones.component';
import { RefSolicitudesComponent } from './ref-solicitudes/ref-solicitudes.component';


@NgModule({
  declarations: [
    VentaDeRefaccionComponent,
    RefCotizacionesComponent,
    RefSolicitudesComponent
  ],
  imports: [
    CommonModule,
    VentaDeRefaccionRoutingModule
  ]
})
export class VentaDeRefaccionModule { }
