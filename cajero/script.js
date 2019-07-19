
/**
* Asignacion de constantes, variables y eventos.
*/
var cantidadBilletes = 10;
var imagenes = ["images/100.png","images/80.png","images/10.png","images/8.png","images/1.png"];
var caja = [];
caja.push(
    new Billete(100,cantidadBilletes,imagenes[0]),
    new Billete(80,cantidadBilletes,imagenes[1]),
    new Billete(10,cantidadBilletes,imagenes[2]),
    new Billete(8,cantidadBilletes,imagenes[3]),
    new Billete(1,cantidadBilletes,imagenes[4])
    );

var total = 0;
for (const billete of caja) {
    total += billete.contar();
}
var dineroRetiro = parseInt(document.getElementById("dineroRetiro").value);
var salida = document.getElementById("salida");
document.getElementById("retirar").addEventListener("click", retirar);
document.getElementById("dineroRetiro").addEventListener("keyup",inputTeclado);

/**
 * Inicia la aplicacion de retiro de dinero cuando se presiona la tecla ENTER.
 * @param {} params Objeto HTML del input "id=dineroRetiro".
 */
function inputTeclado(params) {
    if (params.keyCode == 13) {
        retirar();
    }
}

/**
* Realiza el proceso de retiro del monto ingresado en "dineroRetiro", y lo devuelve en "salida", teniendo en cuenta que:
* El monto debe ser un número.
* El monto debe ser mayor a cero.
* El monto no supere el total del billetes existentes.
* Devuelve la menor cantidad de billetes posible para el monto del retiro.
*/
function retirar() {
    restaurarValores();
    if (isNaN(dineroRetiro)) {
        salida.innerHTML = "¡Por favor ingresa un valor numerico!";
    } else if (dineroRetiro <= 0){
        salida.innerHTML = "El monto a retirar debe ser mayor a cero.";
    } else if (total < dineroRetiro){
        salida.innerHTML = "No hay suficiente dinero para entregar $" + dineroRetiro + "<br>El disponible es: $" + total;
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
function restaurarValores() {
    caja = [];
    caja.push(
        new Billete(100,cantidadBilletes,imagenes[0]),
        new Billete(80,cantidadBilletes,imagenes[1]),
        new Billete(10,cantidadBilletes,imagenes[2]),
        new Billete(8,cantidadBilletes,imagenes[3]),
        new Billete(1,cantidadBilletes,imagenes[4])
        );
    dineroRetiro = parseInt(document.getElementById("dineroRetiro").value);
    salida.innerHTML = "";
}

/**
* Entrega los billetes de acuerdo con los datos del arreglo "mejorCombinacion", mediante el uso de los objetos Billete.
* @param mejorCombinacion Arreglo bidimensional de cada billete con los atributos: denominacion, cantidad, saldo
*  y el total de billetes requeridos.
*/
function entregarBilletesMejorCombinacion(mejorCombinacion) {
    for (const datos of mejorCombinacion) {
        for (const billete of caja) {
            if (datos.cantidad != 0 && billete.valor == datos.denominacion) {
                dineroRetiro = billete.entregarBilletes(dineroRetiro);
            }
        }
    }
}

/**
* Imprime los atributos de los objetos Billete que fueron entregados para cubrir el retiro.
*/
function imprimirSalida() {
    let cadenaSalida = "";
    for (const billete of caja) {
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
    for (const billete of caja) {
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
    validarMultiplosOchenta();
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
 * Verifica si el valor ingresado se puede descomponer en multiplos de 80 para entregar tantos billetes de 80 como sea
 *  posible y así minimizar el número de billetes totales a entregar.
 */
function validarMultiplosOchenta() {
    if (3 <= dineroRetiro/100 && 20 <= dineroRetiro%100 && dineroRetiro%100 <= 39) {
        dineroRetiro = caja[1].entregarBilletes(dineroRetiro, 4);
    } else if (2 <= dineroRetiro/100 && 40 <= dineroRetiro%100 && dineroRetiro%100 <= 59) {
        dineroRetiro = caja[1].entregarBilletes(dineroRetiro, 3);
    } else if (1 <= dineroRetiro/100 && 60 <= dineroRetiro%100 && dineroRetiro%100 <= 79) {
        dineroRetiro = caja[1].entregarBilletes(dineroRetiro, 2);
    }
}

/**
* Itera sobre el arreglo de billetes para calcular el numero de billetes a entregar empezando desde un menor valor cada vez.
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
* Determina el numero de billetes que seria necesario entregar de acuerdo a la cantidad de billetes existente.
* @param {*} arrayBilletes Arreglo de objetos Billete.
* @returns Arreglo bidimensional de cada billete con los atributos: denominacion, cantidad y saldo; y el total de billetes requeridos.
*/
function calcularNumeroBilletes(arrayBilletes) {
    let saldo = dineroRetiro;
    let totales = [];
    let suma = 0;
    for (const billete of arrayBilletes) {
        let datos = [];
        datos = billete.billetesYsobrante(saldo);
        saldo = parseInt(datos.saldo);
        suma += parseInt(datos.cantidad);
        totales.push(datos);
    }
    if (totales[totales.length-1].saldo != 0) {
        totales = []
    } else {
        totales.push(suma);
    }
    return totales;
}
