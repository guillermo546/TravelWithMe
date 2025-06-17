    const botonVolver = document.querySelector('.volver');
botonVolver.onclick = function(){
    window.location.href = 'pagina_principal_anuncios.html';
}
const id = localStorage.getItem('id_usuario');
    fetch('http://localhost:5000/obtenerChats',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            idUsuario:id
        })
    })
    .then(response => response.json())
    .then(data => {
       
        cargarTablaChats(data['data'])
    })


function cargarTablaChats(data){
    let chatsHTML = '';
    const tabla = document.querySelector('#tabla-chats');
    
    if(data.length === 0){
        tabla.innerHTML = "No tienes ninguna conversación activa.";
        return;
    }
    let a = [];
    
    data.forEach((chat) => {
        let z = chat.idUsuario1;

        let y = chat.idUsuario2;
        if(z != id && !a.includes(z) && y == id){
            fetch('http://localhost:5000/obtenerNombrePorId',{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id:z
                    })
                })
                .then(response => response.json())
                .then(data => {  
                    localStorage.setItem('nombreX', data.data[0].nombre);
                })

            chatsHTML += `
                <div class="chat-container">
                    <div class="chat">
                        <div class="titulo">
                        <a class="enlace-chat"  href="../html/chat.html" data-id="${id}" data-idusuario="${chat.idUsuario1}"> Tu chat con: ${localStorage.getItem('nombreX')}</a>
                        </div>
                    </div>
                </div>     
                    <div class="separador-chat"></div>
                `;
                a.push(z);
        }
       else if(!a.includes(y) && y != id && z == id){
            chatsHTML += `
            
    <div class="chat-container">
         <div class="chat">

            <div class="titulo">
               <a class="enlace-chat" href="../html/chat.html" data-id="${id}" data-idusuario="${chat.idUsuario2}"> Tu chat con: ${chat.nombre}</a>
            </div>
         </div>
         
    </div>     
         <div class="separador-chat"></div>
    `;

    a.push(y);
    
}
tabla.innerHTML = chatsHTML;

const x = document.querySelector('#tabla-chats');

    const enlaces = x.querySelectorAll('.enlace-chat');
  
      enlaces.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
              e.preventDefault();
              const id2 = e.currentTarget.dataset.idusuario;
              localStorage.setItem("id_usuario_perfil", id2);
              
              window.location.href = e.target.href;
            });
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