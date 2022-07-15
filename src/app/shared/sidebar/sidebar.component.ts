import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuAdmin = [
    {titulo: 'Categoria Mixto', items: 1, submenu:[ { titulo: 'Agregar', url: 'catMixtoFrm' },{ titulo: 'Listar', url: 'catMixto' }]},
    {titulo: 'Categoria Legislativa', items: 1,submenu:[ {titulo: 'Agregar', url: 'catLegFrm' }, { titulo: 'Listar', url: 'listleg' }]},
    {titulo: 'Expedientes', items: 1,submenu:[ {titulo: 'Agregar', url: 'formularioExperiente' }, { titulo: 'Listar', url: 'expedientes' },{ titulo: 'Reporte', url: 'reporte' }]}
  ]
  menuUser = [
    {titulo: 'Categoria Mixto', url: 'catMixto'},
    {titulo: 'Categoria Legislativa', url: 'listleg'},
    {titulo: 'Expedientes', items: 1,submenu:[ { titulo: 'Listar', url: 'expedientes' },{ titulo: 'Reporte', url: 'reporte' }]}
  ]
  public menuItems = []
 
  constructor(public userService: UsuarioService) { 
    //this.menuItems = this.cambioMenu;
    //console.log('SidebarComponent::', this.cambioMenu);
    //this.sidebar();
 
       
  }

  ngOnInit(): void {
    const acceso = this.userService.getAcceso();
    
    if( acceso == 5 )
      this.menuItems = this.menuAdmin;
    else
      this.menuItems = this.menuUser;
  }
  sidebar(){
 

    //this.cambioMenu = this.sidebarService.menu;
  }

}
