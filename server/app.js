const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

const multer = require('multer');
const path = require('path');
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));


app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
  destination: function(req, filr, cb) {
    cb(null, '../client/imagenes/')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

//insertar anuncio
app.post('/insert', (request, response) =>{
    
    const { titulo, idUsuario, imagen, descripcion, fecha_inicio, fecha_fin } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertarAnuncio(titulo, idUsuario, imagen, descripcion, fecha_inicio, fecha_fin);
    result.then(data => response.json({data:data}))
    .catch(err => console.log(err));
});
//crear usuario
app.post('/insert/registrarUsuario', (request, response) => {
    
    const { nombre, correo, contraseña } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertarUsuario(nombre, correo,contraseña);
    result.then(data => response.json({data:data}))
    .catch(err => console.log(err));
});
//crear perfil
app.post('/insert/crearPerfil', (request, response) =>{
    
    const { idUsuario } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.crearPerfil(idUsuario);
    result.then(data => response.json({data:data}))
    .catch(err => console.log(err));
});
//dejar comentario
app.post('/insert/comentar', (request, response) =>{
    
    const { idEscritor, idReceptor, contenido } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.comentar(idEscritor, idReceptor, contenido);
    result.then(data => response.json({data:data}))
    .catch(err => console.log(err));
});
//crear conversacion
app.post('/insert/chat', (request, response) =>{
    
    const { idUsuario1, idUsuario2} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.crearChat(idUsuario1, idUsuario2);
    result.then(data => response.json({data:data}))
    .catch(err => console.log(err));
});
//insertar mensaje
app.post('/insert/mensaje', (request, response) =>{
    
    const { idUsuario1, idUsuario2, mensaje1, mensaje2} = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertarMensaje(idUsuario1, idUsuario2, mensaje1, mensaje2);
    result.then(data => response.json({data:data}))
    .catch(err => console.log(err));
});
//Subir imagen
app.post('/subirImagen', upload.single('imagen'), (req, res) => {
  const nombreArchivo = req.file.filename;
  console.log('subiendo imagen '+ nombreArchivo);
  const rutaImagen = `/client/imagenes/${nombreArchivo}`;
  
  res.json({ success: true, file: req.file.filename });
});
//Obtener Anuncios
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result =  db.getAllData();
    
    result.then(data => response.json({data:data})).catch(err => console.log(err));

});
//obtener usuarios
app.get('/obtenerUsuarios', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result =  db.obtenerUsuarios();
    
    result.then(data => response.json({data:data})).catch(err => console.log(err));

});
//obtener comentarios
app.post('/obtenerComentarios', (request, response) => {
  
  const { idReceptor } = request.body;

    const db = dbService.getDbServiceInstance();
    const result =  db.obtenerComentarios(idReceptor);
    
    result.then(data => response.json({data:data})).catch(err => console.log(err));

});
//obtener anuncios por idUsuario
app.post('/obtenerAnunciosPorIdUsuario', (request, response) => {

  const { idUsuario } = request.body;

    const db = dbService.getDbServiceInstance();
    const result =  db.obtenerAnunciosPorIdUsuario(idUsuario);
    
    result.then(data => response.json({data:data})).catch(err => console.log(err));
});
//obtener chat
app.post('/obtenerChat', (request, response) => {
  
  const { idUsuario1, idUsuario2 } = request.body;

    const db = dbService.getDbServiceInstance();
    const result =  db.obtenerChat(idUsuario1, idUsuario2);
    
    result.then(data => response.json({data:data})).catch(err => console.log(err));
});
//obtener chat2
app.post('/obtenerChat2', (request, response) => {
  
  const { idUsuario1, idUsuario2 } = request.body;

    const db = dbService.getDbServiceInstance();
    const result =  db.obtenerChat2(idUsuario1, idUsuario2);
    
    result.then(data => response.json({data:data})).catch(err => console.log(err));
});
//obtener chats
app.post('/obtenerChats', (request, response) => {
  
  const { idUsuario } = request.body;

    const db = dbService.getDbServiceInstance();
    const result =  db.obtenerChats(idUsuario);
    
    result.then(data => response.json({data:data})).catch(err => console.log(err));
});
//obtener nombre por id
app.post('/obtenerNombrePorId', (request, response) => {

  const { id } = request.body;

  const db = dbService.getDbServiceInstance();

  const result = db.obtenerNombrePorId(id);
   
  result.then(data => response.json({data:data})).catch(err => console.log(err));
});
//obtener usuario por id y contraseña
app.post('/obtenerUsuario', (request, response) => {

  const { nombre, contraseña } = request.body;

  const db = dbService.getDbServiceInstance();

  const result = db.obtenerUsuario(nombre, contraseña);
   
  result.then(data => response.json({data:data})).catch(err => console.log(err));
});
//obtener informacion del perfil
app.post('/obtenerPerfil', (request, response) => {

  const { id } = request.body;

  const db = dbService.getDbServiceInstance();

  const result = db.obtenerPerfil(id);
   
  result.then(data => response.json({data:data[0]})).catch(err => console.log(err));
});
//comprobar chat
app.post('/comprobarChat', (request, response) => {

  const { idUsuario1, idUsuario2 } = request.body;

    const db = dbService.getDbServiceInstance();
    const result =  db.comprobarChat(idUsuario1, idUsuario2);
    
    result.then(data => response.json({data:data})).catch(err => console.log(err));

});
//comprobar chat 2
app.post('/comprobarChat2', (request, response) => {

  const { idUsuario1, idUsuario2 } = request.body;

    const db = dbService.getDbServiceInstance();
    const result =  db.comprobarChat2(idUsuario1, idUsuario2);
    
    result.then(data => response.json({data:data})).catch(err => console.log(err));

});
//Actualizar Perfil
app.patch('/actualizar_perfil', (request, response) => {
    const {id, edad, genero, lugar_actual, descripcion, gustos, imagen} = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.actualizar_perfil(id, edad, genero, lugar_actual, descripcion, gustos,imagen);
    result.then(data => response.json({success:data})).catch(err => console.log(err));

});
//Actualizar Anuncio
app.patch('/actualizar_anuncio', (request, response) => {
  
    const {id,titulo, descripcion,fecha_inicio, fecha_fin,imagen} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.actualizar_anuncio(id,titulo, descripcion,fecha_inicio, fecha_fin,imagen);
    result.then(data => response.json({success:data})).catch(err => console.log(err));

});
//update

app.patch('/update', (request, response) => {
    
    const {id,name} = request.body;
    const db = dbService.getDbServiceInstance();
});
//borrar cuenta
app.delete('/eliminarCuenta/:id', (request, response) => {
    const {id} = request.params;
    const db = dbService.getDbServiceInstance();
    console.log(id);
    const result = db.eliminar_cuenta(id);
    result.then(data => response.json({success:data})).catch(err => {
    if (err) {
        response.status(400).json({ success: false, message: 'No se puede eliminar por restricciones de clave foránea.' });
    }
});
});
//borrar anuncio
app.delete('/eliminarAnuncio/:id', (request, response) => {
    const {id} = request.params;
    const db = dbService.getDbServiceInstance();
    
    const result = db.eliminar_anuncio(id);
     result.then(data => response.json({ success: data }))
        .catch(err => {
            console.log(err);
            response.status(500).json({ success: false });
        });
});

app.get('/search/:name', (request, response) => {
    const {name} = request.params;
    const db = dbService.getDbServiceInstance();

    

});

app.listen(process.env.PORT, () => console.log('app running'));