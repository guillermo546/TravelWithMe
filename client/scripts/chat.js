const id1 = localStorage.getItem('id_usuario');
console.log(id1);
const id2 = localStorage.getItem('id_usuario_perfil');
console.log(id2);
fetch('http://localhost:5000/comprobarChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idUsuario1:id1, idUsuario2:id2 })
        }).then(response => response.json()).then(data => {
           
           if(data.data[0] instanceof Object){
                console.log('Ya existe un chat entre estos dos usuarios');
           }
           else{
                        fetch('http://localhost:5000/comprobarChat2', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ idUsuario1:id1, idUsuario2:id2 })
                            }).then(response => response.json()).then(data => {
                                if(data.data[0] instanceof Object){
                                console.log('Ya existe un chat entre estos dos usuarios');
                                    }
                                    else{
                                        fetch('http://localhost:5000/insert/chat', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                        },
                                                body: JSON.stringify({ idUsuario1:id1, idUsuario2:id2 })
                                            }).then(response => response.json()).then(data => {});
                                        }
                                                           
                })
            }
        });
const titulo = document.querySelector('.titulo');
let nombre = '';

fetch('http://localhost:5000/obtenerNombrePorId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    },
            body: JSON.stringify({ id:id2 })
        }).then(response => response.json()).then(data => {nombre = data.data[0].nombre;
            
titulo.innerHTML = `<h2 class="titulo">Tu chat con ${nombre}</h2><br>`;
const nombreOtro = localStorage.getItem("nombre_perfil");
 fetch('http://localhost:5000/obtenerChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idUsuario1:id1, idUsuario2:id2})
        }).then(response => response.json()).then(data => {           
               cargarTablaMensajes(data.data);
        });

function cargarTablaMensajes(data){
    let mensajesHTML = '';
    const tabla = document.querySelector('#tabla-mensajes');
    
    if(data.length === 0){
        tabla.innerHTML = "No hay mensajes.";
        return;
    }
    data.forEach((mensaje) => {
        const msg1 = mensaje.mensaje1;
        const msg2 = mensaje.mensaje2;

        if(mensaje.idUsuario1 == id2){
            if(msg1 !== ''){
            mensajesHTML += `
            <div class="mensajes-container">
            <div class="mensaje">
            <div class="idEscritor">
            ${nombre}: ${mensaje.mensaje1}
            
            </div>
            <div class="separador-mensajes"></div></div>
            `;     
        }
        }else{
            if(msg1 !== ''){
            mensajesHTML += `
            <style>
                .idEscritor{
                   
                    font-family: Roboto, Arial;
                    font-size: 20px;
                }

            </style>
            <div class="mensajes-container">
            <div class="mensaje">
            <div class="idEscritor">
            Tú: ${mensaje.mensaje1}
            </div>
            <div class="separador-mensajes"></div></div>
            `;     
        }     
        }
      });
      tabla.innerHTML = mensajesHTML;
    }


const enviarBtn = document.querySelector('.enviar');
enviarBtn.onclick = function(){
    const input = document.getElementById('mensaje');
   
    const msg = input.value;
   
    if(msg !== ''){
        fetch('http://localhost:5000/insert/mensaje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
                body: JSON.stringify({  idUsuario1:id1, idUsuario2:id2, mensaje1:msg, mensaje2:''})
            }).then(response => response.json()).then(data => {});
        input.value = '';
    }
    location.reload();
} });