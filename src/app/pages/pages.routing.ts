import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component'; 
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SettingsComponent } from './settings/settings.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { BlankComponent } from './blank.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatMixtoComponent } from './cat-mixto/cat-mixto.component';
import { CatLegislativoComponent } from './cat-legislativo/cat-legislativo.component';
import { CatLegislativoAddComponent } from './cat-legislativo-add/cat-legislativo-add.component';
import { CatMixtoAddComponent } from './cat-mixto-add/cat-mixto-add.component';
import { ListExpedienteComponent } from './expediente/list-expediente/list-expediente.component';
import { BuscaExpComponent } from './expediente/busca-exp/busca-exp.component';
import { BuscaDocsComponent } from './expediente/busca-docs/busca-docs.component';
import { FrmDocComponent } from './expediente/frm-doc/frm-doc.component';
import { NuevoExpComponent } from './expediente/nuevo-exp/nuevo-exp.component';
import { FrmExpedienteComponent } from '../components/frm-expediente/frm-expediente.component';
import { ReporteExpedienteComponent } from './expediente/reporte-expediente/reporte-expediente.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
   { 
      path: 'dashboard', 
      component: PagesComponent,
      canActivate:[ AuthGuard ],
      children:[
         { path: '', component: DashboardComponent },  
         { path: 'bienvenido', component: BienvenidaComponent, data:{ titulo: '> Bienvenid@'}  },
         { path: 'settings', component: SettingsComponent, data:{ titulo: '> Bienvenid@'}  }, 
         { path: 'perfil', component: PerfilComponent, data:{ titulo: '> Perfil'}  },         
         { path: 'catMixto', component: CatMixtoComponent, data:{ titulo: '> Categoria Mixto'}  },          
         { path: 'catMixtoFrm', canActivate: [ AdminGuard ], component: CatMixtoAddComponent, data:{ titulo: '> Nueva Categoria Mixto'}  },          
         { path: 'listleg', component: CatLegislativoComponent, data:{ titulo: '> Categoria Legislativa'}  },   
         { path: 'catLegFrm', canActivate: [ AdminGuard ], component: CatLegislativoAddComponent, data:{ titulo: '> Nueva Categoria Legislativa'}  }, 
         
         { path: 'expedientes', component: ListExpedienteComponent, data:{ titulo: '> Listar Expedientes'}  },
         { path: 'formularioExperiente', canActivate: [ AdminGuard ], component: NuevoExpComponent, data:{ titulo: '> Nuevo Expediente'}  },
         { path: 'buscarExp/:texto', component: BuscaExpComponent, data:{ titulo: '> Buscar Expediente'}  },
         { path: 'buscarDocs/:id_expediente/:numero', component: BuscaDocsComponent, data:{ titulo: '> Buscar Documentos'}  },
         { path: 'insertDoc', canActivate: [ AdminGuard ], component: FrmDocComponent, data:{ titulo: '> Nuevo Documento'}  },
         { path: 'editDoc', component: FrmDocComponent, data:{ titulo: '> Editar Documento'}  },
         { path: 'reporte', component: ReporteExpedienteComponent, data:{ titulo: '> Reporte Expedientes'}  },

         { path: 'pageblank', component: BlankComponent, data:{ titulo: '> '}  },          
   
      ] 
   },
   { path: '**', component: NopagefoundComponent }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
