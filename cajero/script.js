
/**
* Asignacion de constantes, variables y eventos.
*/
var cantidadBilletes = 100;
var B1 = new Billete(1,cantidadBilletes);
var B2 = new Billete(8,cantidadBilletes);
var B3 = new Billete(10,cantidadBilletes);
var B4 = new Billete(80,cantidadBilletes);
var B5 = new Billete(100,cantidadBilletes);
var billetes = [B5, B4, B3, B2, B1];

var total = 0;
for (const billete of billetes) {
    total += billete.contar();
}
var entrada = parseInt(document.getElementById("entrada").value);
var salida = document.getElementById("salida");
document.getElementById("retirar").addEventListener("click", retirar);
document.getElementById("entrada").addEventListener("keyup",inputTeclado);

/**
 * Inicia la aplicacion de retiro de dinero cuando se presiona la tecla ENTER.
 * @param {} params Objeto HTML del input "id=entrada".
 */
function inputTeclado(params) {
    if (params.keyCode == 13) {
        retirar();
    }
}

/**
* Realiza el proceso de retiro del monto ingresado en "entrada", y lo devuelve en "salida", teniendo en cuenta que:
* El monto debe ser mayor a cero.
* El monto no supere el total del billetes existentes.
* Devuelve la menor cantidad de billetes posible para el monto del retiro.
*/
function retirar() {
    cleanData();
    if (entrada <= 0){
        salida.innerHTML = "El monto a retirar debe ser mayor a cero.";
    } else if (total < entrada){
        salida.innerHTML = "No hay suficiente dinero para entregar $" + entrada + "<br>El disponible es: $" + total;
    } else {
        let arrayBilletes = construirArregloBilletes();
        let mejorCombinacion = determinarMejorCombinacion(arrayBilletes);
        entregarBilletesMejorCombinacion(mejorCombinacion);
        imprimirSalida();
    }
}

/**
 * Limpia y re asigna variables y elementos DOM a sus valores iniciales para poder volver a usar la aplicacion.
 */
function cleanData() {
    B1 = new Billete(1,cantidadBilletes);
    B2 = new Billete(8,cantidadBilletes);
    B3 = new Billete(10,cantidadBilletes);
    B4 = new Billete(80,cantidadBilletes);
    B5 = new Billete(100,cantidadBilletes);
    billetes = [B5, B4, B3, B2, B1];
    entrada = parseInt(document.getElementById("entrada").value);
    salida.innerHTML = "";
}

/**
* Entrega los billetes de acuerdo con los datos del arreglo "mejorCombinacion", mediante el uso de los objetos Billete.
* @param mejorCombinacion Arreglo bidimensional de cada billete con los atributos: denominacion, cantidad, saldo
*  y el total de billetes requeridos.
*/
function entregarBilletesMejorCombinacion(mejorCombinacion) {
    for (const datos of mejorCombinacion) {
        for (const billete of billetes) {
            if (datos.cantidad != 0 && billete.valor == datos.denominacion) {
                entrada = billete.entregarBilletes(entrada);
            }
        }
    }
}

/**
* Imprime los atributos de los objetos Billete que fueron entregados para cubrir el retiro.
*/
function imprimirSalida() {
    let cadenaSalida = "";
    for (const billete of billetes) {
        if (billete.mostrar() != "") {
            cadenaSalida += billete.mostrar() + "<br>";
        }
    }
    salida.innerHTML = cadenaSalida;
}

/**
* Crea un nuevo arreglo de billetes para poder hacer operaciones sobre el.
* @returns Arreglo de objetos Billete.
*/
function construirArregloBilletes() {
    let arrayBilletes = [];
    for (const billete of billetes) {
        arrayBilletes.push(billete);
    }
    return arrayBilletes;
}

/**
* Determina cual combinacion de billetes del arreglo tridimensional devuelto por "arregloTotales()"
*  es la que menor cantidad de billetes devuelve para cubrir el monto del retiro.
* @param {*} arrayBilletes Arreglo de objetos Billete.
* @returns Arreglo bidimensional de cada billete que entrega el menor numero de billetes posible.
*/
function determinarMejorCombinacion(arrayBilletes) {
    let totales = arregloTotales(arrayBilletes);
    let mejorCombinacion;
    let menor;
    for (const key in totales) {
        if (key == 0) {
            menor = parseInt(totales[key].slice(-1));
            mejorCombinacion = totales[key];
        } else if (parseInt(totales[key].slice(-1)) < menor) {
            menor = parseInt(totales[key].slice(-1));
            mejorCombinacion = totales[key];
        }
    }
    return mejorCombinacion;
}

/**
* Itera sobre el arreglo de Billetes para calcular el numero de billetes a entregar empezando desde un menor valor cada vez.
* Primero calcula desde 100 hacia abajo, luego desde 80 hacia abajo, luego desde 10 hacia abajo, etc.
* @param {*} arrayBilletes Arreglo de objetos Billete.
* @returns Arreglo tridimensional con los resultados de la funcion "calcularNumeroBilletes()" para cada grupo de billetes.
*/
function arregloTotales(arrayBilletes) {
    let totales = [];
    while (arrayBilletes.length != 0) {
        totales.push(calcularNumeroBilletes(arrayBilletes));
        arrayBilletes.shift();
    }
    return totales;
}

/**
* Determina el numero de billetes que seria necesario entregar de acuerdo a la cantidad de Billetes existente.
* @param {*} arrayBilletes Arreglo de objetos Billete.
* @returns Arreglo bidimensional de cada billete con los atributos: denominacion, cantidad y saldo; y el total de billetes requeridos.
*/
function calcularNumeroBilletes(arrayBilletes) {
    let saldo = entrada;
    let totales = [];
    let suma = 0;
    for (const billete of arrayBilletes) {
        let datos = [];
        datos = billete.billetesYsobrante(saldo);
        saldo = parseInt(datos.saldo);
        suma += parseInt(datos.cantidad);
        totales.push(datos);
    }
    totales.push(suma);
    return totales;
}
