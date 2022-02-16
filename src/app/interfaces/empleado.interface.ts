export interface Cempleado{
    empleadoid: number;
    nombre: string;
    estatusidfk: number;
    departamentoidfk: number;
    numEmpleado: number;
    cuidad: string;
    region: string;
    puesto: string;
    direccion: string;
    area: string;
    fechaIngreso: string;
    servicioComedor: string;
    primerNombre: string;
    segundoNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    comedor: string;
    sincB2: number;
    sincB5: number;
    usuarioidfk: number;
    tecnicoidfk: number;
    fechaNacimiento: string;
    emailPersonal: string;
    telefonoPersonal: string;
    telefonoEmergencia: string;
    talla: string;
    peso: string;
    telefonoTrabajo: string;
    vpn: string;
    sexo: string;
    numEnVivienda: string;
    usuario: string;
    contrasenia: string;
}

export interface Ctecnico{
    tecnicoid: number;
    supervisoridfk: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    primer_nombre: string;
    segundo_nombre: string;
    email: string;
    telefono: string;
    alias: string;
    regionidfk: number;
    estadoidfk: number;
    estatusidfk: number;
    password: string;
    servicio: number;
    Hora_Activo: string;
    Hora_Inactivo: string;
    direccion: string;
    radio: string;
    ciudad: string;
    no_empleado: number;
    estatus_en_serv: string;
    salaidfk: number;
    folio?: string;
    token_id?: string;

}

export interface Cusuario{
    usuarioid: number;
    usuario: string;
    nombre: string;
    apellido_paterno: string;
    contrasena: string;
    area: string;
    estatusidfk: number;
    correo: string;
    departamento: string;
    Idioma: number;
    telefono: string;
    no_empleado: number;
    regionComercial: number;
}
export interface Paises{
    paisid: number;
    nombre: string;
    imagen: string;
    prefijo: string;
}