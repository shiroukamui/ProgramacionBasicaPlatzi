
class Billete {

    constructor (valor, cantidad, imagen) {
        this.valor = parseInt(valor);
        this.cantidad = parseInt(cantidad);
        this.imagen = imagen;
        this.entregado = 0;
    }

    /**
     * Devuelve el la cantidad de dinero que hay a partir del numero de billetes existentes.
     * @returns Cantidad de dinero que hay.
     */
    contar () {
        return this.valor * this.cantidad;
    }

    /**
     * Entrega el numero de billetes necesario para cubrir el valor del retiro dejando dicho numero
     *  en el atributo "entregado" de la clase.
     * @param {*} retiro El valor a retirar
     * @returns El saldo del valor si existe o cero en su lugar.
     */
    entregarBilletes (retiro, numeroBilletes) {
        if (this.cantidad != 0) {
            while (this.valor <= retiro) {
                retiro = retiro - this.valor;
                this.entregado++;
                this.cantidad--;
                if (this.cantidad == 0) {
                    break;
                } else if (1 < numeroBilletes) {
                    numeroBilletes--;
                } else if (1 == numeroBilletes) {
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
        let cantidadRetiro = Math.floor(retiro / this.valor);
        result.denominacion = this.valor;
        if (this.cantidad < cantidadRetiro) {
            result.cantidad = this.cantidad;
            result.saldo = retiro - this.cantidad * this.valor;
        } else {
            result.cantidad = cantidadRetiro;
            result.saldo = retiro % this.valor;
        }
        return result;
    }

    /**
     * Devuelve el string que se mostrara en pantalla indicando el numero de billetes recibidos y su denominacion.
     * @returns String con el numero de billetes y su denominacion.
     */
    mostrar () {
        let salida = "";
        if (this.entregado != 0) {
            salida = "Recibiste " + this.entregado + " billetes de $" + this.valor + " <img src='" + this.imagen + "' class='money'>";
        }
        return salida;
    }
}
