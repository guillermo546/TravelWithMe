//modificar_perfil.js

const eliminar_boton = document.querySelector('.eliminar');
eliminar_boton.onclick = function(){
    fetch('http://localhost:5000/eliminarCuenta/' +localStorage.getItem("id_usuario") , {method: 'DELETE'})
    .then(response => response.json()).then(data => {
           if (data.success) {
                window.location.href = 'inicio_sesion.html';
        } else {
            alert(data.message);
        }
         
    });
}
const link = document.querySelector('.tus_anuncios');
link.onclick = function(){
     window.location.href = 'ver_anuncios_propios.html';
}