
const express = require('express')
const app = express()
const port = 5500

app.get('/', home)
app.get('/one', one)

function home(req, res) {
    res.send('<body style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 60px; background-color: lightblue;"><div>¡¡¡Welcome to Express!!!</div></body>')
}

function one(req, res) {
    res.send('<body style="margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); font-size: 60px; background-color: lightblue;"><div>¡¡¡Page ONE Express!!!</div></body>')
}

app.listen(port, () => console.log(`App listening in http://localhost:${port}/`))