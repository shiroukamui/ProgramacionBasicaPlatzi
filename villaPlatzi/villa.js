/**
* Definicion de las variables, del canvas, de las imagenes y del evento click del boton "Mover Animales"
*/
var villaPlatzi = document.getElementById("villaPlatzi");
var lienzo = villaPlatzi.getContext("2d");
var vacas = document.getElementById("vacas");
var cerdos = document.getElementById("cerdos");
var pollos = document.getElementById("pollos");
var granjeros = document.getElementById("granjeros");

var ocupados = [];
var animales = [5,10];

var tile = new Image();
tile.src = "img/tile.png";
var vaca = new Image();
vaca.src = "img/vaca.png";
vaca.cantidad = aleatorio(animales[0],animales[1]);
var cerdo = new Image();
cerdo.src = "img/cerdo.png";
cerdo.cantidad = aleatorio(animales[0],animales[1]);
var pollo = new Image();
pollo.src = "img/pollo.png";
pollo.cantidad = aleatorio(animales[0],animales[1]);
var granjero = {};
granjero.img = new Image();
granjero.img.src = "img/granjero.png";
granjero.x = 410;
granjero.y = 410;

document.addEventListener("keydown",verificadorTeclado);
document.getElementById("poblarVilla").addEventListener("click",poblarVilla);

/**
* Definicion del metodo que carga y recarga las imagenes del fondo y los animales en diferentes lugares del canvas
*/
function poblarVilla() {

    tile.addEventListener("load", dibujarCargadas);
    vaca.addEventListener("load", dibujarCargadas);
    cerdo.addEventListener("load", dibujarCargadas);
    pollo.addEventListener("load", dibujarCargadas);
    granjero.img.addEventListener("load", dibujarCargadas);
    ocupados = [];
    dibujarCargadas();
}

/**
 * Definicion del metodo que valida si las imagenes fueron cargadas correctamente para poder dibujarlas
 */
function dibujarCargadas() {

    if (tile.complete) {
        lienzo.drawImage(tile, 0, 0);
    }

    if (granjero.img.complete) {
        granjeros.innerHTML = "1";
        lienzo.drawImage(granjero.img, granjero.x, granjero.y);
    }

    if (vaca.complete) {
        vacas.innerHTML = vaca.cantidad;
        dibujar(vaca.cantidad, vaca);
    }

    if (cerdo.complete) {
        cerdos.innerHTML = cerdo.cantidad;
        dibujar(cerdo.cantidad, cerdo);
    }

    if (pollo.complete) {
        pollos.innerHTML = pollo.cantidad;
        dibujar(pollo.cantidad, pollo);
    }
}

/**
 * Definicion del metodo que dibuja las imagenes teniendo en cuenta los lugares ya ocupados por otras imagenes
 * @param {} cantidad Numero de animales a dibujar
 * @param {*} image Objeto Image que sera dibujado en el lienzo (vaca, cerdo, pollo)
 */
function dibujar(cantidad, image) {

    let maximo = 6;
    let anchoImagen = 60;
    let contador = 0;

    while(contador < cantidad){
        let x = aleatorio(maximo,0) * anchoImagen;
        let y = aleatorio(maximo,0) * anchoImagen;
        let match = false;
        if (ocupados.length != 0) {
            ocupados.forEach(element => {
                if (element[0] == x && element[1] == y) {
                    match = true;
                }
            });
        }
        if (!match) {
            ocupados.push([x,y]);
            lienzo.drawImage(image,x,y);
            contador++;
        }
    }
}

/**
* Definicion del metodo que calcula un numero aleatorio dentro de un rango dado
* @param {*} max Numero maximo del rango
* @param {*} min Numero minimo del rango
*/
function aleatorio(max, min) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Dibuja el canvas usando las flechas del teclado
 * @param {*} evento Objeto que contiene toda la estructura del evento del teclado
 */
function verificadorTeclado(evento) {

    const KEYS = {
        LEFT: 65, //a
        UP: 87, //w
        RIGHT: 68, //d
        DOWN: 83 //s
    };
    let mov = 20;

    switch (evento.keyCode) {
        case KEYS.UP:
            granjero.y = granjero.y - mov;
            lienzo.drawImage(granjero.img, granjero.x, granjero.y);
            poblarVilla();
            break;
        case KEYS.DOWN:
            granjero.y = granjero.y + mov;
            lienzo.drawImage(granjero.img, granjero.x, granjero.y);
            poblarVilla();
            break;
        case KEYS.LEFT:
            granjero.x = granjero.x - mov;
            lienzo.drawImage(granjero.img, granjero.x, granjero.y);
            poblarVilla();
            break;
        case KEYS.RIGHT:
            granjero.x = granjero.x + mov;
            lienzo.drawImage(granjero.img, granjero.x, granjero.y);
            poblarVilla();
            break;
        default:
            alert("Tecla incorrecta! Las opciones son:\na = izquierda\nw = arriba\ns = abajo\nd = derecha")
            break;
    }
}