const mysql = require('mysql');
const dotenv = require('dotenv');
const { response } = require('express');
let instance = null;
dotenv.config();
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData(){
       try{
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT u.id as IdUsuario, a.id, a.titulo, u.nombre, a.descripcion, a.fecha_inicio, a.fecha_fin,a.imagen FROM anuncios a JOIN usuarios u on a.idUsuario = u.id;';
                connection.query(query,(err, results) => {
                    if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
          
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async obtenerUsuarios(){
       try{
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT * FROM usuarios;';
                connection.query(query,(err, results) => {
                    if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
          
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
 async obtenerUsuario(nombre, contraseña){
       try{
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT * FROM usuarios WHERE nombre like ? and contraseña like ?;';
                connection.query(query,[nombre , contraseña],(err, results) => {         
                    if(err){
                        reject(new Error(err.message));
                        return;
                    }
                    if(results.length > 0){
                        resolve({success:true, usuario: results[0]});                      
                    }
                    else{
                        resolve({success:false});
                    }
                    
                })
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
    async insertarAnuncio(titulo, idUsuario, imagen, descripcion, fecha_inicio, fecha_fin){
      try{
            const insertId = await new Promise((resolve, reject) =>{
                const query  = 'INSERT INTO anuncios (id, titulo, idUsuario, imagen, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?,?,?,?,?,?);';
                connection.query(query,[0 , titulo, idUsuario, imagen, descripcion, fecha_inicio, fecha_fin],(err, result) => {
                    if (err) reject (new Error(err.message));
                    resolve(result.insertId);
                })
            });
    
           return {
            id:insertId,
            titulo: titulo,
            idUsuario: idUsuario,
            imagen:imagen,
            descripcion:descripcion,
            fecha_inicio:fecha_inicio,
            fecha_fin:fecha_fin
           };
      }catch(error){
        console.log(error);
      }
    }

     async insertarUsuario(nombre, correo, contraseña){
      try{
            const insertId = await new Promise((resolve, reject) =>{
                const query  = 'INSERT INTO usuarios (id, nombre, correo, contraseña) VALUES (?, ?,?,?)';
                connection.query(query,[0 , nombre, correo, contraseña],(err, result) => {
                    if (err) reject (new Error(err.message));
                   
                    resolve(result.insertId);
                })
            });
           
           return {
            id:insertId,
            nombre:nombre,
            correo:correo,
            contraseña:contraseña
           };
      }catch(error){
        console.log(error);
      }

    }

 async insertarMensaje(idUsuario1, idUsuario2, mensaje1, mensaje2){
      try{
            const insertId = await new Promise((resolve, reject) =>{
                const query  = 'INSERT INTO chats (id, idUsuario1, idUsuario2, mensaje1, mensaje2) VALUES (?,?, ?,?,?)';
                connection.query(query,[0 , idUsuario1, idUsuario2, mensaje1, mensaje2],(err, result) => {
                    if (err) reject (new Error(err.message));
                   
                    resolve(result.insertId);
                })
            });
           
           return {
            id:insertId,
            idUsuario1:idUsuario1,
            idUsuario2:idUsuario2,
            mensaje1:mensaje1,
            mensaje2:mensaje2
           };
      }catch(error){
        console.log(error);
      }

    }

 async comentar(idEscritor, idReceptor, contenido){
      try{
            const insertId = await new Promise((resolve, reject) =>{
                const query  = 'INSERT INTO comentarios (id, idEscritor, idReceptor, contenido) VALUES (?, ?,?,?)';
                connection.query(query,[0 , idEscritor, idReceptor, contenido],(err, result) => {
                    if (err) reject (new Error(err.message));
                   
                    resolve(result.insertId);
                })
            });
           
           return {
            id:insertId,
            idEscritor:idEscritor,
            idReceptor:idReceptor,
            contenido:contenido
           };
      }catch(error){
        console.log(error);
      }

    }
     async obtenerComentarios(idReceptor){
      try{
        const idUsuario2 = parseInt(idReceptor);
       
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT u.nombre as nombre, c.id, c.contenido FROM comentarios c JOIN usuarios u on (u.id = c.idEscritor) WHERE c.idReceptor = ?';
                connection.query(query,[idUsuario2],(err, results) => {
                    if (err) reject (new Error(err.message));
                   
                    resolve(results);
                })
            });
           
            return response;
      }catch(error){
        console.log(error);
      }

    }
    async obtenerChat(idUsuario1, idUsuario2){
      try{
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT * FROM chats WHERE idUsuario1 = ? AND idUsuario2 = ? OR idUsuario1 = ? AND idUsuario2 = ?';
                connection.query(query,[idUsuario1, idUsuario2, idUsuario2, idUsuario1],(err, results) => {
                    if (err) reject (new Error(err.message));
                    
                    resolve(results);
                })
            });
           
            return response;
      }catch(error){
        console.log(error);
      }

    }
        async obtenerChats(idUsuario){
      try{
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT c.id, c.idUsuario1, c.idUsuario2, c.mensaje1, u.nombre FROM chats c JOIN usuarios u on (c.idUsuario2 = u.id) WHERE idUsuario1 = ? OR idUsuario2 = ?';
                connection.query(query,[idUsuario, idUsuario],(err, results) => {
                    if (err) reject (new Error(err.message));
                   
                    resolve(results);
                })
            });
           
            return response;
      }catch(error){
        console.log(error);
      }

    }
    async obtenerNombrePorId(id){
      try{
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT nombre FROM usuarios WHERE id = ?';
                connection.query(query,[id],(err, results) => {
                    if (err) reject (new Error(err.message));
                    
                    resolve(results);
                })
            });
           
            return response;
      }catch(error){
        console.log(error);
      }

    }

     async crearPerfil(id){
      try{
           
            if (!id) {
            throw new Error("ID de usuario no válido para crear perfil");
            }

            const insertId = await new Promise((resolve, reject) =>{
            const query  = 'INSERT INTO perfiles (idUsuario) VALUES (?);';
            connection.query(query, [id], (err, result) => {
            if (err) {
                console.error(err.message);
                reject(new Error(err.message));
                return;
            }

            resolve(result.insertId);
            });

            });
           
      }catch(error){
        console.log(error);
      }

    }
 async crearChat(idUsuario1, idUsuario2){
      try{
            const insertId = await new Promise((resolve, reject) =>{
            const query  = 'INSERT INTO chats (idUsuario1, idUsuario2) VALUES (?, ?);';
            connection.query(query, [idUsuario1, idUsuario2], (err, result) => {
            if (err) {
                console.error(err.message);
                reject(new Error(err.message));
                return;
            }

            resolve(result.insertId);
            });

            });
           
      }catch(error){
        console.log(error);
      }

    }
async subirImagenAnuncio(formData){
      try{
            const insertId = await new Promise((resolve, reject) =>{
            const query  = 'INSERT INTO anuncios (imagen) VALUES (?);';
            connection.query(query, [formData], (err, result) => {
            if (err) {
                console.error(err.message);
                reject(new Error(err.message));
                return;
            }

            resolve(result.insertId);
            });

            });
           
      }catch(error){
        console.log(error);
      }

    }
   

    async actualizar_perfil(id, edad, genero, lugar_actual, descripcion, gustos, imagen){
      try{
        id = parseInt(id, 10);
          
        const response = await new Promise((resolve, reject) => {
            const query = "UPDATE perfiles SET edad = ?, genero = ?, lugar_actual = ?, descripcion = ?, aficiones = ?, imagen = ? WHERE idUsuario = ?";

            connection.query(query, [edad, genero, lugar_actual, descripcion, gustos, imagen, id] , (err, result) => {
                if (err){
                  reject(new Error(err.message));
                  return;  
                } 
               
                resolve(result.affectedRows);
            });
        });
        return response === 1 ? true : false;
    }catch(err){
        console.log(err); 
        return false;
      }
    }
      async actualizar_anuncio(id,titulo, descripcion,fecha_inicio, fecha_fin,imagen){
      try{
        console.log(fecha_inicio);
        id = parseInt(id, 10);
          
        const response = await new Promise((resolve, reject) => {
            const query = "UPDATE anuncios SET titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, imagen = ? WHERE id = ?";

            connection.query(query, [titulo, descripcion,fecha_inicio, fecha_fin,imagen, id] , (err, result) => {
                if (err){
                  reject(new Error(err.message));
                  return;  
                } 
               
                resolve(result.affectedRows);
            });
        });
        return response === 1 ? true : false;
    }catch(err){
        console.log(err); 
        return false;
      }
    }
 async obtenerAnunciosPorIdUsuario(idUsuario){
       try{
          
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT * FROM anuncios WHERE idUsuario = ?;';
                connection.query(query,[idUsuario],(err, results) => {         
                    if(err){
                        reject(new Error(err.message));
                        return;
                    }
                   
                    resolve (results);
                    
                })
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
 async obtenerPerfil(idUsuario){
       try{
            const id = parseInt(idUsuario);
           
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT u.nombre, p.idUsuario, p.edad, p.genero, p.lugar_actual, p.descripcion, p.aficiones, p.imagen FROM perfiles p JOIN usuarios u on p.idUsuario = u.id WHERE u.id = ?';
                connection.query(query,[id],(err, results) => {         
                    if(err){
                        reject(new Error(err.message));
                        return;
                    }
                    
                    resolve (results);
                    
                })
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
     async comprobarChat(idUsuario1, idUsuario2){
      try{
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT * FROM chats WHERE idUsuario1 = ? AND idUsuario2 = ?';
                connection.query(query,[idUsuario1, idUsuario2],(err, results) => {
                    if (err) reject (new Error(err.message));
                    
                        resolve(results);
                    
                   
                })
            });
           
            return response;
      }catch(error){
        console.log(error);
      }

    }

      async comprobarChat2(idUsuario1, idUsuario2){
      try{
            const response = await new Promise((resolve, reject) =>{
                const query  = 'SELECT * FROM chats WHERE idUsuario1 = ? AND idUsuario2 = ?';
                connection.query(query,[idUsuario2, idUsuario1],(err, results) => {
                    if (err) reject (new Error(err.message));
                   
                        resolve(results);
                    
                   
                })
            });
           
            return response;
      }catch(error){
        console.log(error);
      }

    }

    async eliminar_cuenta(id){
           try{
            console.log(id);
                 const insertId = await new Promise((resolve, reject) =>{
                    const query  = 'DELETE FROM usuarios WHERE id = ?;';
                    connection.query(query,[id],(err, result) => {
                        if (err) reject (new Error(err.message));
                        resolve(result);
                    })
                });
               
        }catch(err){
            throw(err);
        }
    }
    async eliminar_anuncio(id){
           try{

                 const insertId = await new Promise((resolve, reject) =>{
                    const query  = 'DELETE FROM anuncios WHERE id = ?;';
                    connection.query(query,[id],(err, result) => {                
                        if (err) reject(err);
                        else resolve(result);
                    })
                    
                });
               
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async searchByName(name){
        
    }
    
}

module.exports = DbService;