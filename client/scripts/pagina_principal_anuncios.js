document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/getAll').then(response => response.json())
   .then(data => cargarTablaAnuncios(data['data']));
});

function cargarTablaAnuncios(data){
    let anunciosHTML = '';
    const tabla = document.querySelector('#tabla-anuncios');
    let i = 0;
    if(data.length === 0){
        tabla.innerHTML = "No hay anuncios que mostrar";
        return;
    }
    data.forEach((anuncio) => {
      
        anunciosHTML += `
          <style>  .anuncio-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border: 2px dotted black;
  border-radius: 5px;
  width: 100%;
}

.anuncio {
  flex: 1 1 300px;
  max-width: 350px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fdfdfd;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.anuncio div {
  font-family: Roboto, Arial;
  font-size: 14px;
  color: #333;
}

.imagen-anuncio {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.iniciar-conversacion {
  margin-top: 10px;
  padding: 8px;
  background-color: #111;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.icono-iniciar-conversacion {
  width: 20px;
  height: 20px;
  background-color: none;
}
  .iniciar-conversacion{
        background-color:white;
  }

.nombre_autor{
      color: blue;
      text-decoration: underline;
      cursor: pointer;
}
.idUsuario{
      display:none;
}
    </style>
    
        <div class="anuncio-container">
            <div class="anuncio">
             <div class="idUsuario">${anuncio.IdUsuario}</div>
             <div class="idAnuncio">
                <h3>Id:</h3> ${anuncio.id}
            </div>
             <div class="titulo-anuncio">
                <h3>Título:</h3> ${anuncio.titulo}
            </div>
             <div class="nombreUsuario">
               <h3>Nombre del autor:</h3> <a href="../html/ver_perfil.html" class="nombre_autor" data-idusuario="${anuncio.IdUsuario}">${anuncio.nombre}</a>
            </div>
            <div class="descripcion">
                <h3>Descripción:</h3> ${anuncio.descripcion}
            </div>
            <div class="fecha-inicio">
            <h3>Fecha de inicio:</h3> ${new Date(anuncio.fecha_inicio).toLocaleDateString()}
            </div>
            <div class="fecha-fin">
                <h3>Fecha de fin:</h3>${new Date(anuncio.fecha_fin).toLocaleDateString()}
            </div>
                    
            </div>
                <div class="icono-iniciar-conversacion">
           
            <a href="../html/chat.html" class="iniciar_conversacion" data-idusuario="${anuncio.IdUsuario}" data-nombreusuario="${anuncio.nombre}">
               
               <img class="icono-iniciar-conversacion" src="../imagenes/escribir.png">
                    
            </a>
               

                </div>
                <br>
                <div class="contenedor-imagen-anuncio">
                <img class="imagen-anuncio" src="../imagenes/${anuncio.imagen}">
                </div> 
             <div class="separador-anuncio">
             
             </div>
             
             </div>
        `;
      });
 
    tabla.innerHTML = anunciosHTML;
    const x = document.querySelector('#tabla-anuncios');
   
    const enlaces = x.querySelectorAll('.nombre_autor');
    
      enlaces.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
              e.preventDefault();
              const id = e.target.dataset.idusuario;
              localStorage.setItem("id_usuario_perfil", id);
              
              window.location.href = e.target.href;
            });
          });  

      const iniciar_conversaciones = x.querySelectorAll('.iniciar_conversacion');
    
      iniciar_conversaciones.forEach(inicio => {
            inicio.addEventListener('click', (e) => {
           
              e.preventDefault();
              const id = e.currentTarget.dataset.idusuario;
              const nombre_anunciante = e.currentTarget.dataset.nombreusuario;
              
              if(localStorage.getItem('id_usuario') == id){
                alert('No puedes iniciar una conversacion contigo mismo.')
              }else{
                localStorage.setItem("id_usuario_perfil", id);
                localStorage.setItem("nombre_perfil", nombre_anunciante);
             
                window.location.href = e.currentTarget.href;
              }
            });
          });  
        }
const botonAñadir = document.querySelector('.añadir');
botonAñadir.onclick = function(){
   
    window.location.href = 'crear_anuncio.html';
}

const botonAjustes = document.querySelector('.ajustes');

botonAjustes.onclick = function(){
    window.location.href = '../html/ajustes_perfil.html';
}

const botonChats = document.querySelector('.chats');
botonChats.onclick = function(){
    window.location.href = '../html/ver_chats.html';
}