import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
 
const urlLocal = environment.urlLocal;
@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  public base_url: string = urlLocal;
  constructor( private http: HttpClient) { }
  
  insertarExpediente( expediente ): Observable<any>{
    return this.http.post(`${ this.base_url }/api/expedientes/insertarExpediente/`, expediente)
  }
  getExpedientes( pag: number = 1, pageSize: number = 10): Observable<any>{
    const token = localStorage.getItem('token') || ''; 
 
    return this.http.get(`${ this.base_url }/api/expedientes/getExpedientes/${pag}/${pageSize}`).pipe(
      map( (items:any) => {          
          items.catExp = items.catExp.filter( (expe, index, arr)=>  ( expe.id_expediente != arr[index - 1]?.id_expediente ) ? expe : null );
          return items;
      }),
      map( (items:any) =>{
        for (const clave in items.catExp) {          
          items.catExp[clave].periodo2  = ( items.catExp[clave].periodo  == 1 ) ? 'Primer Periodo' : 'Segundo Periodo';
          //items.catExp[clave].aprueba2  = ( items.catExp[clave].aprueba  == '0000-00-00' ) ? "<strong>ENTRADA:</strong> "+items.catExp[clave].entrada : "<strong>ENTRADA:</strong> "+items.catExp[clave].entrada+"<br><strong>APROBADO:</strong> ";
          switch (items.catExp[clave].tipoperiodo) {
            case "1": items.catExp[clave].tipoperiodo2 = 'Ordinario'; break;
            case "2": items.catExp[clave].tipoperiodo2 = 'de Receso Comisión Permanente'; break;
            case "3": items.catExp[clave].tipoperiodo2 = 'Extraordinario'; break;
          }
          switch (items.catExp[clave].legislatura) {
            case 60: items.catExp[clave].legislatura2 = 'LXI Legislatura'; break;
            case 61: items.catExp[clave].legislatura2 = 'LX Legislatura';  break;
          }          
          switch (items.catExp[clave].annus) {
            case 1: items.catExp[clave].annus2 = 'Primer Año'; break;
            case 2: items.catExp[clave].annus2 = 'Segundo Año'; break;
            case 3: items.catExp[clave].annus2 = 'Tercer Año'; break;
          }          
        }
        return items;
      }),          
    );
  } 
  // obtener los datos del expediente para editarlo
  getExpediente( id_expediente ): Observable<any>{
    const token = localStorage.getItem('token') || ''; 
 
    return this.http.get(`${ this.base_url }/api/expedientes/getExpediente/${id_expediente}`);
  } 

  buscarExpediente( buscar: string ): Observable<any>{
    return this.http.get(`${ this.base_url }/api/expedientes/buscaExpediente/${buscar}`)
    .pipe(
      catchError( error => {
        // manejo de error
        console.log(error)
        return of([])
      }),
      map( (items:any) => {        
          // elimina los expedientes repetidos 
          items.catExp = items.catExp.filter( (expe, index, arr)=>  ( expe.id_exp != arr[index - 1]?.id_expediente ) ? expe : null );
          // console.log(items.catExp);
          
          return items;
      }),
      map( (items:any) =>{
        for (const clave in items.catExp) {          
          items.catExp[clave].periodo2  = ( items.catExp[clave].periodo  == 1 ) ? 'Primer Periodo' : 'Segundo Periodo';
          //items.catExp[clave].aprueba2  = ( items.catExp[clave].aprueba  == '0000-00-00' ) ? "<strong>ENTRADA:</strong> "+items.catExp[clave].entrada : "<strong>ENTRADA:</strong> "+items.catExp[clave].entrada+"<br><strong>APROBADO:</strong> ";
          switch (items.catExp[clave].tipoperiodo) {
            case "1": items.catExp[clave].tipoperiodo2 = 'Ordinario'; break;
            case "2": items.catExp[clave].tipoperiodo2 = 'de Receso Comisión Permanente'; break;
            case "3": items.catExp[clave].tipoperiodo2 = 'Extraordinario'; break;
          }
          switch (items.catExp[clave].legislatura) {
            case 60: items.catExp[clave].legislatura2 = 'LXI Legislatura'; break;
            case 61: items.catExp[clave].legislatura2 = 'LX Legislatura';  break;
          }          
          switch (items.catExp[clave].annus) {
            case 1: items.catExp[clave].annus2 = 'Primer Año'; break;
            case 2: items.catExp[clave].annus2 = 'Segundo Año'; break;
            case 3: items.catExp[clave].annus2 = 'Tercer Año'; break;
          }          
        }
        return items;
      }),
    );
  }
  editExpediente( expediente ){
    return this.http.put(`${ this.base_url }/api/expedientes/editExpediente`,  expediente )
  }
  delExpediente( id_expediente, numero ): Observable<any>{
    return this.http.delete(`${ this.base_url }/api/expedientes/delExpediente/${ id_expediente }/${ numero }`)
  }

  buscarExpedienteDocs( id_expediente: number ): Observable<any>{
    return this.http.get(`${ this.base_url }/api/documentos/buscaDoc/${id_expediente}`).pipe(
      catchError( error => { 
        return of([])
      }),
    )
  }
  catAutores( ): Observable<any>{
    return this.http.get(`${ this.base_url }/api/categorias/catAutores`)
  }
  catPrimeraSegComision( ): Observable<any>{
    return this.http.get(`${ this.base_url }/api/categorias/catPrimeraSegComision`)
  }

  insertarDoc( documento ): Observable<any>{
    return this.http.post(`${ this.base_url }/api/documentos/insertDoc/`, documento)
  }
  actualizaDoc( documento ): Observable<any>{
    return this.http.put(`${ this.base_url }/api/documentos/editDoc/`,  documento )
  }
  delDocumento( id, numero ): Observable<any>{
    return this.http.delete(`${ this.base_url }/api/documentos/delDocumento/${ id }/${ numero }`)
  }
  duplicaDoc( id_documento ): Observable<any>{
    return this.http.post(`${ this.base_url }/api/documentos/duplicaDoc/${id_documento}`, {})
  }
  getSenadoresSelect( id_docto ): Observable<any>{
    return this.http.get(`${ this.base_url }/api/documentos/getSenadoresSelect/${id_docto}` )
  }
  getProcesosLeg( id_documento, id_expediente ): Observable<any>{
    return this.http.get(`${ this.base_url }/api/documentos/getProcesosLeg/${id_documento}/${id_expediente}` )
  }

  actualizaHisto( historial ){
    return this.http.put(`${ this.base_url }/api/documentos/editHistorial/`,  historial )
  }
  insertHistorial( historial ): Observable<any>{
    return this.http.post(`${ this.base_url }/api/documentos/insertHistorial/`, historial)
  }
  deltHistorial( id ): Observable<any>{
    return this.http.delete(`${ this.base_url }/api/documentos/delHistorial/${ id }`)
  }
  getArchivos( id_documento ): Observable<any>{
    return this.http.get(`${ this.base_url }/api/upload/${id_documento}` )
  }
  delArchivo( tipo, expe, id, archivo ): Observable<any>{
    return this.http.delete(`${ this.base_url }/api/upload/${tipo}/${expe}/${id}/${archivo}` )
  }
  buscarReporte( datos, page ): Observable<any>{
    console.log( datos );
    console.log( page );
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id_categoria", datos.id_categoria);
    queryParams = queryParams.append("legislatura", datos.legislatura);
    queryParams = queryParams.append("annus", datos.annus);
    queryParams = queryParams.append("asunto", datos.asunto);
    queryParams = queryParams.append("periodo", datos.periodo);
    queryParams = queryParams.append("tipoperiodo", datos.tipoperiodo);
    queryParams = queryParams.append("desp_desch", datos.desp_desch);
    queryParams = queryParams.append("desch", datos.desch);
    queryParams = queryParams.append("desa", datos.desa);
    queryParams = queryParams.append("fraccion", datos.fraccion); 
    queryParams = queryParams.append("pagina", page);

    return this.http.get(`${ this.base_url }/api/expedientes/getExpedientesReporte`, { params: queryParams } ).pipe(
      map( (items:any) =>{
        for (const clave in items.rows) {          
          items.rows[clave].periodo2  = ( items.rows[clave].periodo  == 1 ) ? 'Primer Periodo' : 'Segundo Periodo';
          //items.rows[clave].aprueba2  = ( items.rows[clave].aprueba  == '0000-00-00' ) ? "<strong>ENTRADA:</strong> "+items.rows[clave].entrada : "<strong>ENTRADA:</strong> "+items.rows[clave].entrada+"<br><strong>APROBADO:</strong> ";
          switch (items.rows[clave].tipoperiodo) {
            case "1": items.rows[clave].tipoperiodo2 = 'Ordinario'; break;
            case "2": items.rows[clave].tipoperiodo2 = 'de Receso Comisión Permanente'; break;
            case "3": items.rows[clave].tipoperiodo2 = 'Extraordinario'; break;
          }
          switch (items.rows[clave].legislatura) {
            case 60: items.rows[clave].legislatura2 = 'LXI Legislatura'; break;
            case 61: items.rows[clave].legislatura2 = 'LX Legislatura';  break;
          }          
          switch (items.rows[clave].annus) {
            case 1: items.rows[clave].annus2 = 'Primer Año'; break;
            case 2: items.rows[clave].annus2 = 'Segundo Año'; break;
            case 3: items.rows[clave].annus2 = 'Tercer Año'; break;
          }          
        }
        return items;
      }),
    )
  }
}

