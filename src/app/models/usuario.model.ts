import { environment } from '../../environments/environment';

const base_url = environment.urlLocal;
export class Usuario{
    constructor(
        public activo?: string,
        public clave?: string,
        public id?: string,
        public n_acceso?: number,
        public usuario?: string,
        public imagen?: string,
    ){}

    get imagenUrl(){
        
        if( this.imagen)
            return `${base_url}/api/upload/usuario/${this.imagen}`;
        else    
            return `${base_url}/api/upload/usuario/imagen-no-disponible`;
        
    }
}