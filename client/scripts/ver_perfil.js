//ver_perfil.js
const idPerfil2 = localStorage.getItem("id_usuario_perfil");

  fetch('http://localhost:5000/obtenerComentarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idReceptor:parseInt(idPerfil2) })
        }).then(response => response.json()).then(data => {
        
            cargarTablaComentarios(data.data);
        });

function cargarTablaComentarios(data){
    let comentariosHTML = '';
    const tabla = document.querySelector('#tabla-comentarios');
    
    if(data.length === 0){
        tabla.innerHTML = "No hay comentarios.";
        return;
    }
    data.forEach((comentario) => {
        
        comentariosHTML += `
        <style> .idEscritor {
        color: #020200;
        margin: 0;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }</style>
        <div class="anuncio-container">
            <div class="anuncio">
             <div class="idEscritor">
                ${comentario.nombre}: ${comentario.contenido}
            </div>
            </div>
             <div class="separador-comentario"></div></div>
        `;     
      });
      tabla.innerHTML = comentariosHTML;
    }

const botonVolver = document.querySelector('.añadir');
botonVolver.onclick = function(){
    window.location.href = 'pagina_principal_anuncios.html';
}

const id = localStorage.getItem('id_usuario_perfil');

    const imagen = document.getElementById('imagen_perfil');
    const idPerfil = document.querySelector('.id');
    idPerfil.innerHTML = id;
    const titulo = document.querySelector('.perfil-titulo');
  const nombre = document.querySelector('.nombre');
  const edad = document.querySelector('.edad');
  const genero = document.querySelector('.genero');
  const lugar_actual = document.querySelector('.lugar_actual');
  const descripcion = document.querySelector('.descripcion');
  const gustos = document.querySelector('.gustos');
 
  fetch('http://localhost:5000/obtenerPerfil', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:id })
        }).then(response => response.json()).then(data => {
           
            if(data.data instanceof Object){
            titulo.innerHTML = '<h2>Perfil de '+ data.data.nombre + '</h2>'; 
                edad.innerHTML = data.data.edad;
                genero.innerHTML = data.data.genero;
                lugar_actual.innerHTML = data.data.lugar_actual;
                descripcion.innerHTML = data.data.descripcion;
                gustos.innerHTML = data.data.aficiones;
                imagen.innerHTML = `<img class="imagen_perfil" src='../imagenes/${data.data.imagen}'>`;
            }
            else{
                edad.innerHTML = 0;
                genero.innerHTML = 'Sin definir';
                lugar_actual.innerHTML = 'Sin definir';
                descripcion.innerHTML = 'Sin definir';
               gustos.innerHTML = 'Sin definir';
            }
        });

        const comentarBtn = document.querySelector('.comentar');
        comentarBtn.onclick = function(){
            const divComentar = document.querySelector('.boton-comentar');
            divComentar.innerHTML = '<label>Deja aquí tu comentario: <label><input class="comentario"><button class="enviar">Enviar</button><button class="cancelar">Cancelar</button>';
            const enviarBtn = document.querySelector('.enviar');
            enviarBtn.onclick = function(){
                const comentario = document.querySelector('.comentario');
                const comentarioContenido = comentario.value;
                 fetch('http://localhost:5000/insert/comentar' , {
                headers:{
                    'Content-type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    idEscritor:localStorage.getItem("id_usuario"),
                    idReceptor:localStorage.getItem("id_usuario_perfil"),
                    contenido:comentarioContenido
                })
                })
                    .then(response => response.json()).then(data => {
                        location.reload();
                    })

            }
        }