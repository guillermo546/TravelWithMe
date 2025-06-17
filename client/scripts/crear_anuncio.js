const boton = document.querySelector('#boton-add');

boton.onclick = function(){
    const titulo = localStorage.getItem('titulo');
    console.log(titulo);
    const descripcion = localStorage.getItem('descripcion');
    const idUsuario = JSON.parse(localStorage.getItem("id_usuario"));

    const fecha_inicio = localStorage.getItem('fecha1');
    const fecha1 = new Date(fecha_inicio);

    const fecha_fin = localStorage.getItem('fecha2');
    const fecha2 = new Date(fecha_fin);

    let nombre_imagen = localStorage.getItem('imagen_nombre');
    

    if(fecha1 > fecha2){
        alert('La fecha de inicio no puede ser superior a la de fin');
    }else{
            fetch('http://localhost:5000/insert' , {
                headers:{
                    'Content-type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    titulo: titulo,
                    idUsuario: idUsuario,
                    imagen:nombre_imagen,
                    descripcion:descripcion,
                    fecha_inicio:fecha_inicio,
                    fecha_fin:fecha_fin})
            }).then(response => response.json()).then(data => {
                const texto = document.getElementById('texto');
                if(data instanceof Object){
                    texto.innerHTML = 'Anuncio creado correctamente';
                    document.getElementById('texto').style.color = 'green';
                }else{
                    texto.innerHTML = 'Error al crear el anuncio';
                    document.getElementById('texto').style.color = 'red';
                }
            });
    }
}

const botonAñadir = document.querySelector('.volver');
botonAñadir.onclick = function(){
   
    window.location.href = '../html/pagina_principal_anuncios.html';
}

const botonAjustes = document.querySelector('.ajustes');

botonAjustes.onclick = function(){
    window.location.href = '../html/ajustes_perfil.html';
}