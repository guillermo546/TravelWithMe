const botonInicio = document.getElementById('iniciar_sesion');

botonInicio.onclick = function(){
    const nombreX = document.querySelector('.nombre1');
    const nombre = nombreX.value;
    const contraseñaX = document.querySelector('.contraseña1');
    const contraseña = contraseñaX.value;

    if(nombre.trim() === '' || contraseña.trim() === ''){
        alert('Por favor, rellene los datos.');
    }
    else{
        fetch('http://localhost:5000/obtenerUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, contraseña })
        }).then(response => response.json()).then(data => {
            const boton = document.getElementById('iniciar_sesion');
            
            
            if(data.data.success === true){
                boton.innerHTML = 'Iniciando Sesión...';
                const id = data.data.usuario.id;
                const nombre = data.data.usuario.nombre;

                localStorage.setItem("id_usuario", id);
                localStorage.setItem("nombre_usuario", nombre);

                window.location.href = 'pagina_principal_anuncios.html';
            }
            else{
                text.innerHTML = 'Datos de Inicio de Sesión Incorrectos';
            }
        });  
        }
    }

    const botonRegistro = document.getElementById('registro');

    botonRegistro.onclick = function(){
        
        const nombreX = document.querySelector('.nombre2');
        const nombre = nombreX.value;
    
        const correoX = document.querySelector('.correo');
        const correo = correoX.value;
    
        const contraseñaX = document.querySelector('.contraseña2');
        const contraseña = contraseñaX.value;
    
        const repetir_contraseñaX = document.querySelector('.repetir_contraseña');
        const repetir_contraseña = repetir_contraseñaX.value;

        
        if(nombre.trim() === '' || contraseña.trim() === '' || correo.trim() === '' || repetir_contraseña.trim() === ''){
            alert('Por favor, rellene los datos.');
        }
        else if(contraseña !== repetir_contraseña){
            alert('Las contraseñas no coinciden.');            
        }
        else{
              nombreX.value = '';
              correoX.value = '';
              contraseñaX.value = '';
              repetir_contraseñaX.value = '';
              
                fetch('http://localhost:5000/insert/registrarUsuario' , {
                headers:{
                    'Content-type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    nombre:nombre,
                    correo:correo,
                    contraseña:contraseña})
                })
                    .then(response => response.json()).then(data => {
                
                id = data.data.id;     
                fetch('http://localhost:5000/insert/crearPerfil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idUsuario:id })
                });
                    })

                
                    const p = document.querySelector('.registro_correcto');
                    p.innerHTML = '<p>Registro correctamente realizado</p>';
                }
    }