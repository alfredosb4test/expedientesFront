import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 
import { environment } from 'src/environments/environment';
import { Cempleado, Ctecnico, Cusuario, Paises } from 'src/app/interfaces/empleado.interface';
import { LoginForm, recuperaPWD } from 'src/app/interfaces/login.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { tap } from 'rxjs/operators';


interface PaisesResp {
  paises: Paises[];
  estado: boolean;
}
const urlLocal = environment.urlLocal;
const urlPruebas = environment.urlPruebas;
const urlProd = environment.urlProd;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  public usuario: Usuario = new Usuario();
  public base_url: string = '';
  public colorClassUrl: string = '';

  constructor(private http: HttpClient) { 
    this.base_url = urlLocal;
    this.colorClassUrl = 'amarillo';
  }
 
  login( formData: LoginForm ){
    return this.http.post(`${ this.base_url }/api/login`, formData)
      .pipe(
        tap( (resp:any)=>{ 
          localStorage.setItem('token', resp.token )
        })
      );

  }
  
  // recuperaPWD( formData: recuperaPWD ){
  //   return this.http.post(`${ this.base_url }/api/sistemas/crm_sistemas.php`, formData)
  // }




  // buscarCempleado( buscar:string, tabla: string, campo: string ){
  //   const data = {
  //     "buscaUser": true,
  //     tabla,
  //     campo,
  //     buscar
  //   };
  //   //console.log("service this.base_url:", this.base_url);
  //   return this.http.post(`${ this.base_url }/api/sistemas/crm_sistemas.php`, data);
  // }

  // getPaises(){
  //   const data = {
  //     "getPaises": true,      
  //   };
  //   //console.log("service getPaises:",data);
  //   return this.http.get<PaisesResp>(`${ this.base_url }/api/sistemas/crm_sistemas.php?getPaises=true`);
  // }

  // updateCempleado( empleado: Cempleado){
  //   const data = {
  //     "updateEmpleado": true,
  //     empleado
  //   };
  //   //console.log("servicio::", data);
  //   return this.http.post(`${ this.base_url }/api/sistemas/crm_sistemas.php`, data);
  // }
  // updateCtecnico( tecnico: Ctecnico){
  //   const data = {
  //     "updateTecnico": true,
  //     tecnico
  //   };
  //   console.log("servicio::", data);
    
  //   return this.http.post(`${ this.base_url }/api/sistemas/crm_sistemas.php`, data);
  // }
  // updateCusuario( usuario: Cusuario){
  //   const data = {
  //     "updateUsuario": true,
  //     usuario
  //   };
  //   console.log("servicio::", data);
    
  //   return this.http.post(`${ this.base_url }/api/sistemas/crm_sistemas.php`, data);
  // }

  // nuevoCempleado( empleado: Cempleado){
  //   const data = {
  //     "nuevoEmpleado": true,
  //     empleado
  //   };
  //   console.log("servicio nuevoEmpleado::", data);
    
  //   return this.http.post(`${ this.base_url }/api/sistemas/crm_sistemas.php`, data);
  // }
  // nuevoCtecnico( empleado: Ctecnico){
  //   const data = {
  //     "nuevoTecnico": true,
  //     empleado
  //   };
  //   console.log("servicio nuevoEmpleado::", data);
    
  //   return this.http.post(`${ this.base_url }/api/sistemas/crm_sistemas.php`, data);
  // }
  // nuevoCusuario( empleado: Cusuario){
  //   const data = {
  //     "nuevoUsuario": true,
  //     empleado
  //   };
  //   console.log("servicio nuevoUsuario::", data);
    
  //   return this.http.post(`${ this.base_url }/api/sistemas/crm_sistemas.php`, data);
  // }
  // alias( alias: string, tabla:string){
  //   const data = {
  //     "buscarAlias": true,
  //     tabla,
  //     alias
  //   };
  //   console.log("servicio alias::", data);
    
  //   return this.http.post(`${ this.base_url }/api/sistemas/crm_sistemas.php`, data);
  // }
  

}
