
var clienteVerificado = false
var bancoVerificado = false
var bancosArray = ["Banco BanQ","Banco Super","Banco BanaMama","Banco Competencia"]
var saldoDisponible = 100000
var valorCosto = 0
var error = document.getElementById("error")
var exito = document.getElementById("exito")
var saldo = document.getElementById("saldo-cliente")
var costoTransferencia = document.getElementById("costo-transferencia")
var bancos = document.getElementById("bancos")
var bloqueCostoTransferencia = document.getElementById("bloque-costo-transferencia").style
bloqueCostoTransferencia.display = "none"

function consultar() {
    let cuenta = document.getElementById("cuenta-cliente").value
    let datos = document.getElementById("datos-cliente").style
    if (cuenta == 1234567890) {
        datos.display = "block"
        saldo.innerHTML = currencyFormat(saldoDisponible)
        error.innerHTML = ""
        clienteVerificado = true
        for (const banco of bancosArray) {
            let option = document.createElement("option")
            option.value = banco
            bancos.appendChild(option)
        }
    } else {
        datos.display = "none"
        error.innerHTML = "Numero de cuenta no existe!!! Mira la sugerencia del campo Nro. cuenta del cliente ;)"
        clienteVerificado = false
    }
}

function currencyFormat(num) {
    return 'USD $ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function limpiarBancoDestino() {
    document.getElementById("banco-destino").value = ""
    bloqueCostoTransferencia.display = "none"
}

function costo() {
    let bancoDestino = document.getElementById("banco-destino").value
    if (bancoDestino == bancosArray[0]) {
        valorCosto = 0
    } else {
        valorCosto = 100
    }
    costoTransferencia.innerHTML = valorCosto
    bloqueCostoTransferencia.display = "block"
}

function transferir() {
    let date = new Date()
    let hour = parseInt(date.getHours())
    let minutes = parseInt(date.getMinutes())
    let cuenta = document.getElementById("cuenta-destino").value
    let valor = document.getElementById("valor-transferencia").value
    let bancoDestino = document.getElementById("banco-destino").value
    for (const banc of bancosArray) {
        if (banc == bancoDestino && cuenta == 9876543210) {
            valor = parseInt(valor) + valorCosto
            bancoVerificado = true
            break
        } else {
            bancoVerificado = false
        }
    }
    error.innerHTML = ""
    exito.innerHTML = ""
    if (20 <= hour || hour < 9 || 12 <= hour && hour < 15) {
        error.innerHTML = "Importante!!! Recuerde que solo se pueden hacer transferencias en horario de 9 a 12 y de 15 a 20. Hora Actual: " + hour + ":" + minutes
    } else if (clienteVerificado && bancoVerificado && valor <= saldoDisponible) {
        exito.innerHTML = "Transferencia realizada exitosamente!!!"
        saldoDisponible -= valor
        saldo.innerHTML = currencyFormat(saldoDisponible)
    } else {
        error.innerHTML = "Los datos son invalidos!!! <ul><li> Revisa el banco y cuenta destino de la transferencia </li><li> Selecciona uno de los bancos que te sugiere el sistema </li><li> Mira la sugerencia del campo Cuenta destino de la transferencia ;) </li><li> Verifica que el saldo de tu cuenta es suficiente para hacer la transferencia </li></ul>"
    }
}