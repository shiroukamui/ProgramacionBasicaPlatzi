
class Billete {

    constructor (valor, existencia) {
        this.valor = parseInt(valor);
        this.existencia = parseInt(existencia);
        this.entregado = 0;
    }

    /**
     * Devuelve el la cantidad de dinero que hay a partir del numero de billetes existentes.
     * @returns Cantidad de dinero que hay.
     */
    contar () {
        return this.valor * this.existencia;
    }

    /**
     * Entrega el numero de billetes necesario para cubrir el valor del retiro dejando dicho numero
     *  en el atributo "entregado" de la clase.
     * @param {*} retiro El valor a retirar
     * @returns El saldo del valor si existe o cero en su lugar.
     */
    entregarBilletes (retiro) {
        if (this.existencia != 0) {
            while (this.valor <= retiro) {
                retiro = retiro - this.valor;
                this.entregado++;
                this.existencia--;
                if (this.existencia == 0) {
                    break;
                }
            }
        }
        return retiro;
    }

    /**
     * Calcula el numero de billetes que se puede entregar para el valor del retiro
     * y el sobrante del retiro que no se puede cubrir con el billete por ser un valor mas pequeño.
     * @param {*} retiro Valor del retiro.
     * @returns Arreglo con los atributos: denominacion, cantidad y saldo.
     */
    billetesYsobrante (retiro) {
        let result = [];
        result.denominacion = this.valor;
        result.cantidad = Math.floor(retiro / this.valor);
        result.saldo = retiro % this.valor;
        return result;
    }

    /**
     * Devuelve el string que se mostrara en pantalla indicando el numero de billetes recibidos y su denominacion.
     * @returns String con el numero de billetes y su denominacion.
     */
    mostrar () {
        let salida = "";
        if (this.entregado != 0) {
            salida = "Recibiste " + this.entregado + " billetes de $" + this.valor;
        }
        return salida;
    }
}