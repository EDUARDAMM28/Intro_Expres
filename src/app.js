require("dotenv").config()
const express = require('express')

const miApp = express()

//mi aplicacion utiliza los middleware
miApp.use(express.json())
miApp.use(express.urlencoded({ extended: true }))
//importar middleware propios

//ruta principal de la aplicacion
miApp.get('/', (req, res) => {
    res.send('Mi api rest ficha : 3407181.')
})

module.exports = miApp 