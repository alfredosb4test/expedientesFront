export class NegociacionNueva {
    cliente: string | undefined;
    folio: string | undefined;
    estatus: string | undefined;
    acciones: string | undefined;
    estado: string | undefined;
    expanded: boolean | undefined;
    historico!: Array<any>;
}