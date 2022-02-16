import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/service.index';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styles: [
  ]
})
export class BienvenidaComponent implements OnInit {

  constructor(public usuario: LoginService, private menuService: SidebarService) { }

  ngOnInit(): void {
    this.menuService.verMenu();
  }

}
