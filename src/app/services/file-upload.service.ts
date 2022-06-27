import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const urlLocal = environment.urlLocal;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public base_url: string = urlLocal;
  constructor( private http: HttpClient ) { }

  async insertFile( archivo: File, tipo: 'documentos', id: number, numero: string ) {

    try {

      const url = `${ this.base_url }/api/upload/${ tipo }/${ numero }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      return data;
      
    } catch (error) {
      console.log(error);
      return false;    
    }

  }
  
  delArchivo( numero, id, nombre ): Observable<any>{
    return this.http.delete(`${ this.base_url }/api/upload/documentos/${ numero }/${ id }/${ nombre }`)
  }
}
