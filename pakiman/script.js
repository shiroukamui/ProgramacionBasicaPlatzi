
var rutas = {
    squirtle: {
        imagen:"img/squirtle.png",
        audio:"sounds/squirtle.mp3"
    },
    bulbasaur: {
        imagen:"img/bulbasaur.png",
        audio:"sounds/bulbasaur.mp3"
    },
    charmander: {
        imagen:"img/charmander.png",
        audio:"sounds/charmander.mp3"
    },
    pikachu: {
        imagen:"img/pikachu.png",
        audio:"sounds/pikachu.mp3"
    },
};

var pakimanes = [];
pakimanes.push(new Pakiman("Squirtle","¡SQUIRTLE SQUIRTLE!", [100,70], [40,10], rutas.squirtle));
pakimanes.push(new Pakiman("Bulbasaur","¡BULBASAUR!", [100,70], [40,10], rutas.bulbasaur));
pakimanes.push(new Pakiman("Charmander","¡CHARMANDER!", [100,70], [40,10], rutas.charmander));
pakimanes.push(new Pakiman("Pikachu","¡PIKA PIKAAA!", [100,70], [40,10], rutas.pikachu));

for (const pakiman of pakimanes) {
    pakiman.imagen.addEventListener("click", function(){
        pakiman.audio.play();
        alert(pakiman.palabra);
    });
    pakiman.mostrar();
}
