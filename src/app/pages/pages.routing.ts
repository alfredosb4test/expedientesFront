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
         { path: 'catMixtoFrm', component: CatMixtoAddComponent, data:{ titulo: '> Nueva Categoria Mixto'}  },          
         { path: 'listleg', component: CatLegislativoComponent, data:{ titulo: '> Categoria Legislativa'}  },   
         { path: 'catLegFrm', component: CatLegislativoAddComponent, data:{ titulo: '> Nueva Categoria Legislativa'}  },               
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
