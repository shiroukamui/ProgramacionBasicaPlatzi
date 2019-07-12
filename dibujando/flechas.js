/*
Captura de eventos y definicion de constantes
*/
document.addEventListener("keydown",dibujarTeclado);
const areaDibujo = document.getElementById("areaDibujo");
const canvas = areaDibujo.getContext("2d");
const color = "lightgreen"
const mov = 1;
var x = 150;
var y = 150;

/*
Dibuja el canvas usando las flechas del teclado
*/
function dibujarTeclado(evento) {

    const KEYS = {
        LEFT: 65, //a
        UP: 87, //w
        RIGHT: 68, //d
        DOWN: 83, //s
        CLEAR: 32
    };

    switch (evento.keyCode) {
        case KEYS.UP:
            dibujar(color,[x,y,x,y-mov]);
            y = y - mov;
            break;
        case KEYS.DOWN:
            dibujar(color,[x,y,x,y+mov]);
            y = y + mov;
            break;
        case KEYS.LEFT:
            dibujar(color,[x,y,x-mov,y]);
            x = x - mov;
            break;
        case KEYS.RIGHT:
            dibujar(color,[x,y,x+mov,y]);
            x = x + mov;
            break;
        case KEYS.CLEAR:
            console.log("clear");
            break;
        default:
            console.log("wrong key");
            break;
    }
}

/*
Definicion de la funcion dibujar()
*/
function dibujar(color, coordinates){

    canvas.beginPath();
    canvas.lineWidth = 3;
    canvas.strokeStyle = color;
    canvas.moveTo(coordinates[0],coordinates[1]);
    canvas.lineTo(coordinates[2],coordinates[3]);
    canvas.stroke();
    canvas.closePath();
}