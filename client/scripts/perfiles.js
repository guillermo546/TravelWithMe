class Perfil{
    idUsuario;
    edad;
    genero;
    lugar_actual;
    descripcion;
    aficiones;
    valoracion;

    constructor(detallesPerfil){
        this.idUsuario = detallesPerfil.idUsuario,
        this.edad = detallesPerfil.edad,
        this.genero = detallesPerfil.genero,
        this.lugar_actual = detallesPerfil.lugar_actual,
        this.descripcion = detallesPerfil.descripcion,
        this.aficiones = detallesPerfil.aficiones
        this.valoracion = detallesPerfil.valoracion
    }

    
}