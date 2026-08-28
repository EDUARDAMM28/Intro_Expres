const express = require('express');
const app = express();
require('dotenv/config')
const port = process.env.port || 3000;
//configuracion para la lectura de archivos 
const sistemaArchivo = require('fs')
const ruta = require('path')
const rutaArchivoJson = ruta.join(__dirname, "datos.json");
//endpoin raiz
app.get("/", function(req, res){
  res.send('API - REST APRENDICES');
})

//endpoin para ver los datos del archivo
app.get("/api/aprendices", (req, res)=> {
  //datos viene del archivo
  sistemaArchivo.readFile(rutaArchivoJson, 'utf-8', (error, datos)=>{
    if(error){
      return res.json({Error:"no se puede leer los datos"})
    }
    const listaAprendices = JSON.parse(datos)
    res.json(listaAprendices)
  })
}) 

//endpoin para crear aprendices
app.post("/api/aprendices",(res, req)=>{
  res.json({Mensaje: "trabajando en el endpoin"})
})

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${port}`);
});