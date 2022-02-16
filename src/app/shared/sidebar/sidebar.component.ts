import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] = [
    { 
      titulo: 'Categoria Mixto', 
      items: 1,
      submenu:[
        { titulo: 'Agregar', url: 'catMixtoFrm' },
        { titulo: 'Listar', url: 'catMixto' },
      ]
    },
    { 
      titulo: 'Categoria Legislativa', 
      items: 1,
      submenu:[
        { titulo: 'Agregar', url: 'catLegFrm' },
        { titulo: 'Listar', url: 'listleg' },
      ]
    },
    { 
      titulo: 'Expedientes', 
      items: 1,
      submenu:[
        { titulo: 'Agregar', url: 'catMixtoFrm' },
        { titulo: 'Listar', url: 'clientes/reporteEvolucion' },
        { titulo: 'Buscar Expediente', url: 'clientes/reporteEvolucion' },
        { titulo: 'Buscar Asunto', url: 'clientes/reporteEvolucion' },
        { titulo: 'Reporte', url: 'clientes/reporteEvolucion' },
      ]
    },
    
  ];
 
  constructor(public sidebarService: SidebarService) { 
    //this.menuItems = this.cambioMenu;
    //console.log('SidebarComponent::', this.cambioMenu);
    //this.sidebar();
 
       
  }

  ngOnInit(): void {
    
  }
  sidebar(){
 

    //this.cambioMenu = this.sidebarService.menu;
  }

}
