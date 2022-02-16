import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private usuarioService: UsuarioService,
               private router: Router ){

  }
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log("canActivate");

    //return true;

      return this.usuarioService.validarToken()
        .pipe(
          tap( estaAutenticado =>{
            if( !estaAutenticado ){
              this.router.navigateByUrl('/login')
            }
          })
        );
  }
  
}