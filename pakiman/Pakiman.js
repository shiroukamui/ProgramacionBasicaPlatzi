
class Pakiman{

    constructor(nombre, palabra, vida, ataque, rutas){
        this.nombre = nombre;
        this.palabra = palabra;
        this.vida = this.aleatorio(vida[0],vida[1]);
        this.ataque = this.aleatorio(ataque[0],ataque[1]);
        this.imagen = new Image();
        this.imagen.src = rutas.imagen;
        this.audio = new Audio(rutas.audio);
    }

    hablar(){
        alert(this.palabra);
    }

    mostrar() {
        document.write("<hr>");
        document.body.appendChild(this.imagen);
        document.write("<div>");
        document.write("<strong>Nombre: </strong>" + this.nombre + "<br>");
        document.write("<strong>Vida: </strong>" + this.vida + "<br>");
        document.write("<strong>Ataque: </strong>" + this.ataque + "<br>");
        document.write("</div>");
    }

    aleatorio(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
