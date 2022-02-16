export interface LoginForm{
    usuario: string;
    pwd: string;
    login: boolean;
}
export interface recuperaPWD{
    correo: string; 
    recuperaPwd: boolean;
}

export interface Usuario{
    Idioma: string;
    apellido_paterno: string;
    area: string;
    contrasena: string;
    correo: string;
    departamento: string;
    estatusidfk: string;
    no_empleado: string;
    nombre: string;
    regionComercial: string;
    telefono: string;
    usuario: string;
    usuarioid: string;
}