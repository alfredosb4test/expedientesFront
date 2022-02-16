import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
 
const urlLocal = environment.urlLocal;
@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  public base_url: string = urlLocal;
  constructor( private http: HttpClient) { }

 
  // getClientes(): Observable<any>{
  //   const token = localStorage.getItem('token') || '';  
  //   return this.http.get(`${ this.base_url }/api/catalogos/clientes`, {
  //     headers:{
  //       'x-token': token
  //     }
  //   }).pipe(
  //     map((res:any) => res.clientes),
  //     catchError(error => error.message || error)
  //   );
  // }

 
  getCatMixtas( pag: number = 1, pageSize: number = 10): Observable<any>{
    const token = localStorage.getItem('token') || ''; 
 
    return this.http.get(`${ this.base_url }/api/categorias/getListMix/${pag}/${pageSize}`, {
      headers:{
        'x-token': token
      }
    });
  } 
  getCatLegislativas( pag: number = 1, pageSize: number = 10): Observable<any>{
    const token = localStorage.getItem('token') || ''; 
 
    return this.http.get(`${ this.base_url }/api/categorias/getListLeg/${pag}/${pageSize}`, {
      headers:{
        'x-token': token
      }
    });
  } 

  addCatMixta(categoria){
    const token = localStorage.getItem('token') || ''; 
 
    return this.http.post(`${ this.base_url }/api/categorias/addCatMix`, categoria,{
      headers:{
        'x-token': token
      }
    });
  }
  addCatLegislativa(categoria){
    const token = localStorage.getItem('token') || ''; 
 
    return this.http.post(`${ this.base_url }/api/categorias/addCatLeg`, categoria, {
      headers:{
        'x-token': token
      }
    });
  }
  editCatLegislativa(categoria){
    const token = localStorage.getItem('token') || ''; 
 
    return this.http.put(`${ this.base_url }/api/categorias/editCatLeg`, categoria, {
      headers:{
        'x-token': token
      }
    });
  }
  editCatMixta(categoria){
    const token = localStorage.getItem('token') || ''; 
 
    return this.http.put(`${ this.base_url }/api/categorias/editCatMix`, categoria, {
      headers:{
        'x-token': token
      }
    });
  }  
}

