import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent implements OnInit {

  constructor( private settingService: SettingsService ) { }

  ngOnInit(): void {
  }

  cambioTema( $theme:string ){
    // const $linkTema = document.querySelector("#theme");

    // const menu = document.querySelector('#themeMenu');
    // const theme = document.querySelector('#theme');
   
    // const link = `assets/css/${$theme}Menu.css`;
    // menu?.setAttribute('href', link);

    // const link2 = `assets/css/${$theme}.css`;
    // theme?.setAttribute('href', link2);
    // localStorage.setItem('theme', $theme);

    this.settingService.aplicarTema( $theme );
  }
}
