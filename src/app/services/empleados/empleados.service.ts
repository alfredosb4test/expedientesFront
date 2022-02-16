import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import { Cempleado, Ctecnico, Cusuario, Paises } from 'src/app/interfaces/empleado.interface';

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
export class EmpleadosService {
  public base_url: string = '';
  public colorClassUrl: string = '';

  constructor(private http: HttpClient) { 
    this.setUrl('');
  }

  setUrl(url:string){
    switch (url) {
      case 'localhost':
        this.base_url = urlLocal;
        this.colorClassUrl = 'verde';
        break;
      case 'pruebas':
        this.base_url = urlPruebas;
        this.colorClassUrl = 'amarillo';
        break;
      case 'produccion':
        this.base_url = urlProd;
        this.colorClassUrl = 'rojo';
        break;      
      default:
        this.base_url = urlLocal;
        this.colorClassUrl = 'verde';
        break;
    }
  }
  getUrl(){
    return this.base_url;
  }
  getcolorClassUrl(){
    return this.colorClassUrl;
  }

  buscarCempleado( buscar:string, tabla: string, campo: string ){
    const data = {
      "buscaUser": true,
      tabla,
      campo,
      buscar
    };
    //console.log("service this.base_url:", this.base_url);
    return this.http.post(`${ this.base_url }/api/sistemas/sistemas.php`, data);
  }

  getCatalogos( tabla: string ){
    const data = {
      "buscaDeptos": true,
      tabla
    };
    //console.log("service:",data);
    return this.http.post(`${ this.base_url }/api/sistemas/sistemas.php`, data);
  }
  
  getPaises(){
    const data = {
      "getPaises": true,      
    };
    //console.log("service getPaises:",data);
    return this.http.get<PaisesResp>(`${ this.base_url }/api/sistemas/sistemas.php?getPaises=true`);
  }

  updateCempleado( empleado: Cempleado){
    const data = {
      "updateEmpleado": true,
      empleado
    };
    //console.log("servicio::", data);
    return this.http.post(`${ this.base_url }/api/sistemas/sistemas.php`, data);
  }
  updateCtecnico( tecnico: Ctecnico){
    const data = {
      "updateTecnico": true,
      tecnico
    };
    console.log("servicio::", data);
    
    return this.http.post(`${ this.base_url }/api/sistemas/sistemas.php`, data);
  }
  updateCusuario( usuario: Cusuario){
    const data = {
      "updateUsuario": true,
      usuario
    };
    console.log("servicio::", data);
    
    return this.http.post(`${ this.base_url }/api/sistemas/sistemas.php`, data);
  }

  nuevoCempleado( empleado: Cempleado){
    const data = {
      "nuevoEmpleado": true,
      empleado
    };
    console.log("servicio nuevoEmpleado::", data);
    
    return this.http.post(`${ this.base_url }/api/sistemas/sistemas.php`, data);
  }
  nuevoCtecnico( empleado: Ctecnico){
    const data = {
      "nuevoTecnico": true,
      empleado
    };
    console.log("servicio nuevoEmpleado::", data);
    
    return this.http.post(`${ this.base_url }/api/sistemas/sistemas.php`, data);
  }
  nuevoCusuario( empleado: Cusuario){
    const data = {
      "nuevoUsuario": true,
      empleado
    };
    console.log("servicio nuevoUsuario::", data);
    
    return this.http.post(`${ this.base_url }/api/sistemas/sistemas.php`, data);
  }
  alias( alias: string, tabla:string){
    const data = {
      "buscarAlias": true,
      tabla,
      alias
    };
    console.log("servicio alias::", data);
    
    return this.http.post(`${ this.base_url }/api/sistemas/sistemas.php`, data);
  }
  

}
