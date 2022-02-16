import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefCotizacionesComponent } from './ref-cotizaciones/ref-cotizaciones.component';
import { RefSolicitudesComponent } from './ref-solicitudes/ref-solicitudes.component';
import { VentaDeRefaccionComponent } from './venta-de-refaccion/venta-de-refaccion.component';

const routes2: Routes = [
  { path: '', component: VentaDeRefaccionComponent, data:{ titulo: 'Venta de Refacción'}   },  
  { path: 'refSolicitudes', component: RefSolicitudesComponent , data:{ titulo: 'Venta de Refacción > Solicitudes'}  },
  { path: 'refCotizaciones', component: RefCotizacionesComponent , data:{ titulo: 'Venta de Refacción > Cotizaciones'}  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes2)],
  exports: [RouterModule]
})
export class VentaDeRefaccionRoutingModule { }
