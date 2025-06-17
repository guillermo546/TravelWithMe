class Anuncio{
    id;
    titulo;
    idUsuario;
    imagen;
    descripcion;
    fecha_inicio;
    fecha_fin;

    constructor(detallesAnuncio){
        this.id = detallesAnuncio.id;
        this.titulo = detallesAnuncio.titulo;
        this.idUsuario = detallesAnuncio.idUsuario;
        this.imagen = detallesAnuncio.imagen;
        this.descripcion = detallesAnuncio.descripcion;
        this.fecha_inicio = detallesAnuncio.fecha_inicio;
        this.fecha_fin = detallesAnuncio.fecha_fin;
    }

}
export function getAnuncio(anuncioId) {
    let anuncioCorrecto;
  
    anuncios.forEach((anuncio) => {
      if (anuncio.id === anuncioId) {
        anuncioCorrecto = anuncio;
      }
    });
  
    return anuncioCorrecto;
  }

export let anuncios = [];

export function cargarAnunciosIntroducir(){
    const promise = fetch('').then((response) => {
        return response.json();
    }).then((datosAnuncios) => {
        anuncios = datosAnuncios.map((detallesAnuncio) => {
            return new Anuncio(detallesAnuncio);
        });
      
    }).catch((error) => {
        console.log('Error desconocido.');
    });
    return promise;
}

export function cargarAnuncios(fun) {
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
      anuncios = JSON.parse(xhr.response).map((detallesAnuncio) => {
        
        return new Product(detallesAnuncio);
      });
      fun();
    });
  
    xhr.addEventListener('error', (error) => {
      console.log('Unexpected error. Please try again later.');
    });
  
    xhr.open('GET', '');
    xhr.send();
  }