
/*
Definicion y asignacion de variables
*/
var wrapper = document.getElementById("canvas1");
var canvas = wrapper.getContext("2d");
var coordinates;

/*
Asignacion de las coordenadas de la figura a dibujar.
Y ejecucion de la funcion dibujar().
*/
coordinates = [200,200,150,0,2];
dibujar("yellow", 10, "circle", coordinates);

coordinates = [165,120,165,200];
dibujar("black", 10, "line", coordinates);

coordinates = [235,120,235,200];
dibujar("black", 10, "line", coordinates);

coordinates = [120,220,120,310,270,310,280,220];
dibujar("black", 10, "curve", coordinates);

/*
Definicion de la funcion dibujar()
*/
function dibujar(color, lineWidth, figure, coordinates){
    canvas.beginPath();
    canvas.lineWidth = lineWidth;
    canvas.strokeStyle = color;
    if (figure == "circle") {
        canvas.arc(coordinates[0],coordinates[1],coordinates[2],coordinates[3],coordinates[4] * Math.PI);
    } else if(figure == "line"){
        canvas.moveTo(coordinates[0],coordinates[1]);
        canvas.lineTo(coordinates[2],coordinates[3]);
    } else if(figure == "curve"){
        canvas.moveTo(coordinates[0],coordinates[1]);
        canvas.bezierCurveTo(120,310,270,310,280,220);
    }
    canvas.stroke();
    canvas.closePath();
}
