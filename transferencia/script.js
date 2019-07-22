
var clienteVerificado = false
var bancosArray = ["Banco BanQ","Banco Super","Banco BanaMama","Banco Competencia"]

function consultar() {
    let cuenta = document.getElementById("cuenta-cliente").value
    let saldo = document.getElementById("saldo-cliente")
    let bancos = document.getElementById("bancos")
    let error = document.getElementById("error")
    let datos = document.getElementById("datos-cliente").style
    if (cuenta == 1234567890) {
        datos.display = "block"
        saldo.innerHTML = currencyFormat(400000)
        error.innerHTML = ""
        clienteVerificado = true
        for (const banco of bancosArray) {
            let option = document.createElement("option")
            option.value = banco
            bancos.appendChild(option)
        }
    } else {
        datos.display = "none"
        saldo.innerHTML = ""
        error.innerHTML = "Numero de cuenta no existe!!! Mira la sugerencia del campo Nro. cuenta del cliente ;)"
        clienteVerificado = false
    }
}

function currencyFormat(num) {
    return 'USD $ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function transferir() {
    let banco = document.getElementById("banco-destino").value
    let cuenta = document.getElementById("cuenta-destino").value
    let valor = document.getElementById("valor-transferencia").value
    if (clienteVerificado) {
        console.log(banco,cuenta,valor);
    }
    let date = new Date()
    let hour = date.getHours()
    let minutes = date.getMinutes()
}