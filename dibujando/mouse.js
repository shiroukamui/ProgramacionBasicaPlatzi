/**
 * Captura de eventos, definicion de constantes y variables
 */
const drawZone = document.getElementById("drawZone");
const canvas = drawZone.getContext("2d");

document.addEventListener("mousedown",mousedown);
document.addEventListener("mousemove",mousemove);
document.addEventListener("mouseup",mouseup);
document.getElementById("clear").addEventListener("click", clearCanvas);
document.getElementById("grid").addEventListener("click", toggleGrid);

var gridShowed;
var color;
var lineWidth;
var mouseClicked;
var x;
var y;

/**
 * Permite saber en donde se inicio a pintar con el mouse asignando las variables globales de control
 * @param {*} params
 */
function mousedown(params) {

    lineWidth = document.getElementById("lineWidth").value;
    color = document.getElementById("color").value;
    mouseClicked = true;
    x = params.layerX;
    y = params.layerY;
}

/**
 * Va ejecutando la funcion de pintar a medida que se mueve el mouse y mientras que el click este presionado
 * @param {*} params
 */
function mousemove(params) {

    if (mouseClicked) {
        draw([x,y,params.layerX,params.layerY]);
        x = params.layerX;
        y = params.layerY;
    }
}

/**
 * Permite saber en donde se termina de pintar con el mouse asignando las variables globales de control
 */
function mouseup() {

    mouseClicked = false;
}

/**
 * Dibuja lineas en el canvas a partir de las coordenadas recibidas
 * @param {*} coordinates
 */
function draw(coordinates){

    canvas.beginPath();
    canvas.lineWidth = lineWidth;
    canvas.strokeStyle = color;
    canvas.moveTo(coordinates[0],coordinates[1]);
    canvas.lineTo(coordinates[2],coordinates[3]);
    canvas.stroke();
    canvas.closePath();
}

/**
 * Limpia el canvas dejandolo listo para pintar
 */
function clearCanvas() {

    canvas.clearRect(0,0,drawZone.width,drawZone.height);
    gridShowed = false;
}

/**
 * Muestra la grilla del canvas
 */
function toggleGrid() {

    if (!gridShowed) {
        gridShowed = true;
        lineWidth = 0.5;
        color = "#90ee90";
        draw([50,0,50,400]);
        draw([100,0,100,400]);
        draw([150,0,150,400]);
        draw([200,0,200,400]);
        draw([250,0,250,400]);
        draw([300,0,300,400]);
        draw([350,0,350,400]);
        draw([0,50,400,50]);
        draw([0,100,400,100]);
        draw([0,150,400,150]);
        draw([0,200,400,200]);
        draw([0,250,400,250]);
        draw([0,300,400,300]);
        draw([0,350,400,350]);
    }
}