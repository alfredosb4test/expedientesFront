import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  @Output() menuCambio: EventEmitter<any> = new EventEmitter();

  public imgUrl = '';

 // public nav: boolean = true;


  constructor(private usuarioService: UsuarioService, private sidebarService: SidebarService) {

  }


  ngOnInit(): void {
    //this.imgUrl = this.usuarioService.usuario.imagenUrl;
    this.imgUrl ='assets/images/users/1.jpg';
  }

  menutoogle(){
    if(this.sidebarService.nav){
      this.sidebarService.ocultaMenu();
    }
    else{
      this.sidebarService.verMenu();
    }
  }

  logout(){
    this.usuarioService.logout();
  }
}
