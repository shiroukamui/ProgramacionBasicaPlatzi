
var clienteVerificado = false
var bancoVerificado = false
var bancosArray = ["Banco BanQ","Banco Super","Banco BanaMama","Banco Competencia"]
var saldoDisponible = 400000
var error = document.getElementById("error")
var exito = document.getElementById("exito")

function consultar() {
    var saldo = document.getElementById("saldo-cliente")
    let cuenta = document.getElementById("cuenta-cliente").value
    let bancos = document.getElementById("bancos")
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
}

function transferir() {
    let date = new Date()
    let hour = parseInt(date.getHours())
    let minutes = date.getMinutes()
    let banco = document.getElementById("banco-destino").value
    let cuenta = document.getElementById("cuenta-destino").value
    let valor = document.getElementById("valor-transferencia").value
    for (const banc of bancosArray) {
        if (banc == banco && cuenta == 9876543210) {
            if (banco != bancosArray[0]) {
                valor = parseInt(valor) + 100
            }
            bancoVerificado = true
            break
        } else {
            bancoVerificado = false
        }
    }
    error.innerHTML = ""
    exito.innerHTML = ""
    console.log(hour);
    if (20 < hour || hour < 9 || 12 < hour && hour < 15) {
        error.innerHTML = "Importante!!! Recuerde que solo se pueden hacer transferencias en horario de 9 a 12 y de 15 a 20."
    } else if (clienteVerificado && bancoVerificado && valor <= saldoDisponible) {
        exito.innerHTML = "Transferencia realizada exitosamente!!!"
    } else {
        error.innerHTML = "Los datos del banco y/o cuenta destino de la transferencia son invalidos!!! <br> Selecciona uno de los bancos que te sugiere el sistema <br> y Mira la sugerencia del campo Cuenta destino de la transferencia ;)"
    }
}