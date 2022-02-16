import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public imgUrl = '';
  constructor(private usuarioService: UsuarioService) { 
   // this.imgUrl = this.usuarioService.usuario.imagenUrl;
   this.imgUrl ='assets/images/users/1.jpg';
  }

  ngOnInit(): void {
  }

}
