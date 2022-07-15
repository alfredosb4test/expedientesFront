import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private usuarioService: UsuarioService, 
              private sidebarService: SidebarService,
              private router: Router ) {

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
  buscarExpediente( texto: string){
    texto = texto.trim();
    if ( texto.length === 0 ) {
      return;      
    }
    this.router.navigate(['/dashboard/buscarExp', texto]);
    
  }
}
