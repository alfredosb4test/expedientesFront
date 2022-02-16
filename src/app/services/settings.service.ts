import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	public tema: string = "stylesNegro";

  constructor( ) { 
  	this.cargarAjustes();
  }

  guardarAjustes(){
  	localStorage.setItem("ajustes", this.tema);
  }

  cargarAjustes(){
  	if( localStorage.getItem('ajustes') ){
  		this.tema = localStorage.getItem("ajustes") || '';
  		this.aplicarTema(this.tema);
  	}
  }

  aplicarTema( tema:string ){
  	let urlTema = `assets/css/${tema}.css`;
		//const menu = document.querySelector('#themeMenu');
    const theme = document.querySelector('#theme');

    //theme?.setAttribute('href', urlTema);
    const headID = document.querySelector('head');
    const link2 = document.createElement('link');
    link2.type = 'text/css';
    link2.rel = 'stylesheet';
    link2.id="theme";
    headID?.appendChild(link2);
    link2.href =`./assets/css/${tema}.css`;
    link2.addEventListener('load', function(){
      theme?.remove();
    });

  	this.tema = tema;
    if( this.tema == 'stylesBlanco'){
      document.body.style.backgroundColor = 'white';
    }else{
      document.body.style.backgroundColor = 'black';
    }
  	this.guardarAjustes();
  }

}

