//const express = requiere ("express")
import express from 'express';
//Leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.PUERTO || 3030
//uso de middleware body-parse
app.use(express.json());

app.get("/", (req, res) => {
  res.send('Aprendiendo express, ficha 3407181, ADSO en el SENA 31 julio');
})
//otro endpoint
app.get("/otraruta", (req, res)=>{
//usando template string
res.send(`<h1>Otro ejemplo de ruta</h1
  <h2>End point con res.send</h2>
  `)
})

app.get("/ruta2", (req, res)=>{
  res.json({"Nombre": "Eduard", "Apellido": "Martinez", "Cargo": "Aprendiz"})
})

app.get("/ruta3:aprendiz/:otrodato", (req, res)=>{
  const dato_aprendiz = req.params.aprendiz
  const otro_dato = req.params.otrodato
  res.json({"Nombre": dato_aprendiz, "Apellido": otro_dato})
})

app.get("/ruta4", (req, res)=>{
//capturar la el parametro de consulta query
  const orden = req.query.orden || "sin ordenar"
  const pagina = req.query.pagina || 1
  res.send(`<h1>Listado Aprendices</h1>
  <p>El listado esta en orden ${orden}</p>
  <p>Pagina: ${pagina}</p>
  `)
})

//endpoins para enviar datos
app.post("/ruta2", (req, res)=>{
  const todosDatos = req.body
  const name = req.body.Nombre
  const lastname = req.body.Cargo
  res.status(201).json({Datos: todosDatos, Nombre:name ,
    Cargo: lastname})
}
)

//endpoin para realizar 
app.post("/login", (req, res) => {

    const usuario = req.body.usuario
    const perfil = req.body.perfil
    const contraseña = req.body.contraseña

    // Validar si faltan datos
    if (!usuario, !perfil, !contraseña) {
        return res.status(400).json({
            mensaje: "Faltan datos. Debe enviar usuario, perfil y contraseña"
        })
    }

    // Validar el perfil
    if (perfil === "admin") {
        return res.status(200).json({
            mensaje: `Bienvenido ${usuario}, ha ingresado como administrador`
        })
    }

    if (perfil === "user") {
        return res.status(200).json({
            mensaje: `Bienvenido ${usuario}, ha ingresado como usuario`
        })
    }

    // Si el perfil no es válido
    return res.status(403).json({
        mensaje: "No tiene acceso. El perfil ingresado no es válido"
    })
})
app.listen(port, function(){ 
    console.log( `SERVIDOR: http://localhost:${port}`); 
});


