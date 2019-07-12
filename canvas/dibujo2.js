/*
Definicion y asignacion de variables y constantes
*/
const wrapper = document.getElementById("canvas1");
const canvas = wrapper.getContext("2d");
const lineas = document.getElementById("lineas");
const salida = document.getElementById("salida");
const boton = document.getElementById("pintar").addEventListener("click", dibujarClick);
const borrar = document.getElementById("borrar").addEventListener("click", borrarClick);

/*
Definicion de la fucion dibujarClick, que dibuja cuando se hace click en el boton
*/
function dibujarClick() {

    let limite = parseInt(lineas.value);
    let tamañoCanvas = wrapper.width;
    let espacio = tamañoCanvas / limite;
    let coordinates;
    let linea;
    salida.innerHTML = limite;
    lineas.value = "";

    /*
    Dibuja la figura en la parte inferior izquierda
    */
    linea = 0;
    while (linea < limite) {
        let yInicial = espacio * linea;
        let xFinal = espacio * (linea + 1);
        coordinates = [0,yInicial,xFinal,tamañoCanvas];
        dibujar("lightyellow", 1, coordinates);
        linea += 1;
    }

    /*
    Dibuja la figura en la parte inferior derecha
    */
    linea = 0;
    do {
        let yInicial = tamañoCanvas - (linea + 1) * espacio;
        let xFinal = linea * espacio;
        coordinates = [tamañoCanvas,yInicial,xFinal,tamañoCanvas];
        dibujar("lightseagreen", 1, coordinates);
        linea += 1;
    } while (linea < limite);

    /*
    Dibuja la figura en la parte superior izquierda
    */
    for (let index = 0; index < limite; index++) {
        let xInicial = tamañoCanvas - (index * espacio);
        let yFinal = (index + 1) * espacio;
        coordinates = [xInicial,0,0,yFinal];
        dibujar("lightgreen", 1, coordinates);
    }

    /*
    Dibuja la figura en la parte superior derecha
    */
    for (let index = 1; index < limite; index++) {
        let xInicial = tamañoCanvas - (index * espacio);
        let yFinal = tamañoCanvas + 1 - (index * espacio);
        coordinates = [xInicial,0,tamañoCanvas,yFinal];
        dibujar("lightcoral", 1, coordinates);
    }

    /*
    Dibuja los limites del canvas
    */
    let color = "white";
    coordinates = [1,1,1,tamañoCanvas-1];
    dibujar(color, 1, coordinates);
    coordinates = [tamañoCanvas-1,1,tamañoCanvas-1,tamañoCanvas-1];
    dibujar(color, 1, coordinates);
    coordinates = [1,tamañoCanvas-1,tamañoCanvas-1,tamañoCanvas-1];
    dibujar(color, 1, coordinates);
    coordinates = [1,1,tamañoCanvas-1,1];
    dibujar(color, 1, coordinates);
}

function borrarClick() {
    canvas.clearRect(0,0,wrapper.width,wrapper.height);
    salida.innerHTML = "?";
}

/*
Definicion de la funcion dibujar()
*/
function dibujar(color, lineWidth, coordinates){

    canvas.beginPath();
    canvas.lineWidth = lineWidth;
    canvas.strokeStyle = color;
    canvas.moveTo(coordinates[0],coordinates[1]);
    canvas.lineTo(coordinates[2],coordinates[3]);
    canvas.stroke();
    canvas.closePath();
}
