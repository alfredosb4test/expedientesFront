import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] = [];
  public indexMenu:number = 0;
  cambioMenu:boolean = false;
  public nav: boolean = true;

 
  constructor() { 

  }

  setSideBar( menu:any ){
    this.cambioMenu = true;
    this.menu = menu;
    //menuFunctions()

  }
  

  verMenu(){ 
    var menu = document.getElementById('layoutSidenav_nav');
    var contenido = document.getElementById('layoutSidenav_content');
    menu.classList.remove('ocultarMenu2');
    menu.classList.add('verMenu2');
    contenido.classList.remove('sinMenu');
    contenido.classList.add('conMenu');
    this.nav=true;
    console.log('verMenu');
    
  }
  ocultaMenu(){ 
    var menu = document.getElementById('layoutSidenav_nav');
    var contenido = document.getElementById('layoutSidenav_content');
    menu.classList.remove('verMenu2');
    menu.classList.add('ocultarMenu2');
    contenido.classList.remove('conMenu');
    contenido.classList.add('sinMenu');
    this.nav=false;
    console.log('ocultaMenu');
  }
}