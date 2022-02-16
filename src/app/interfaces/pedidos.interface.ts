import { Paises } from "./empleado.interface";

export interface datosRevision{
  con: string;
  clave: string;
  estatusidfk: string;
  refaccionidfk: string;
  solicitud_refaccionidfk: string;
  sql: boolean;
  update: string;
  paginator?: any;
}
export interface pedidosUpdate{
  queryUpdate: string;
  estado: boolean;
}
export interface dialogData{
  confirmar: boolean;
  paises: Paises[];
}