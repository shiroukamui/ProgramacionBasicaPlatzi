
var five = require("johnny-five")
var board = new five.Board()
var conf, cell, bulb, engine
var turno = 0

board.on("ready", function () {
    conf = {pin: "A0", freq: 50}
    cell = new five.Sensor(conf)
    bulb = new five.Led(13)
    bulb.on()
    engine = five.Servo(9)
    engine.to(0)
    ondear()
})

function ondear() {
    if (800 < cell.value) {
        if (turno) {
            turno = 0
            engine.to(70)
        } else {
            turno = 1
            engine.to(110)
        }
    } else {
        engine.to(150)
    }
    setTimeout(ondear, 1000)
}
