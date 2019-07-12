/**
 * Definicion de variables:
 * "input" elemento del DOM que contiene el numero final de la lista, es ingresado por el ususario.
 * "output" elemento del DOM correspondiente a <p> en donde se mostrara la lista final de numeros.
 */
var input = document.getElementById("input");
var output = document.getElementById("output");

input.addEventListener("keyup",numberList);

/**
 * Definicion de la funcion numberList() que crea la lista de numeros reeplazando
 * los multiplos de 3 y 5 por "fizz-buzz"
 * los multiplos de 3 por "fizz" y
 * los multiplos de 5 por "buzz"
 */
function numberList() {

    let numbers = "";
    output.innerHTML = numbers;
    if (input.value < 1) {
        alert("El número debe ser MAYOR de cero!!!");
    } else {
        for (let index = 1; index <= input.value; index++) {
            if (index % 3 == 0 && index % 5 == 0) {
                numbers = numbers + "fizz-buzz, ";
            } else if (index % 3 == 0) {
                numbers = numbers + "fizz, ";
            } else if(index % 5 == 0) {
                numbers = numbers + "buzz, ";
            } else {
                numbers = numbers + index + ", ";
            }
        }
        numbers = numbers.slice(0,numbers.length-2);
        output.innerHTML = numbers;
    }
}