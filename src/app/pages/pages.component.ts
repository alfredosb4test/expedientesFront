import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

import { CatalogosService } from 'src/app/services/catalogos.service';
 
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(public sidebarService: SidebarService,               
              public settingsServ: SettingsService, 
              private route: ActivatedRoute,
              private eleRef: ElementRef,
              ) { 
 
  }
  ngOnInit(): void {
    const theme = localStorage.getItem('theme');    
    this.settingsServ.cargarAjustes();
  }
}
