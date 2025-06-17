class Usuario{
    id;
    nombre;
    contraseña;
    correo;

    constructor(detallesUsuario){
        this.id = detallesUsuario.id,
        this.nombre = detallesUsuario.nombre,
        this.contraseña = detallesUsuario.contraseña,
        this.correo = detallesUsuario.correo
    }

}