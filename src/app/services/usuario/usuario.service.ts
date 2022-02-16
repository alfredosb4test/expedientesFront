import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';


const urlLocal = environment.urlLocal;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public base_url: string = '';
  public usuario: Usuario;
  constructor( private http: HttpClient, private router: Router) { }

  validarToken(): Observable<boolean>{
    this.base_url = urlLocal;
    const token = localStorage.getItem('token') || '';
    console.log(this.base_url, '/', token);
    
    return this.http.get(`${ this.base_url }/api/login/renew`, {
      headers:{
        'x-token': token
      }
    }).pipe(
      map( (resp:any)=>{
        const { activo,
          clave,
          id,
          n_acceso,
          usuario,
          imagen } = resp.usuario;
        this.usuario = new Usuario(
          activo,
          clave,
          id,
          n_acceso,
          usuario,
          imagen
        )
        console.log('validarToken this.usuario',this.usuario);
        
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error =>of(false) )
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    document.body.style.backgroundColor = 'white';
  }
}
