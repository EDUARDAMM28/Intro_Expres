const express = require('express');
const app = express();
require('dotenv/config')
const port = process.env.port || 3000;
//configuracion para la lectura de archivos 
const sistemaArchivo = require('fs')
const ruta = require('path')
const rutaArchivoJson = ruta.join(__dirname, "datos.json");
//importar libreria para subir archivos
const multer = require("multer")

//millwear
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//endpoin raiz
app.get("/", function(req, res){
  res.send('API - REST APRENDICES')
})


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

//endpoin para ver los datos del archivo
app.post("/api/aprendices", (req, res)=> {
  const nuevoAprendiz = req.body
  //datos viene del archivo
  sistemaArchivo.readFile(rutaArchivoJson, 'utf-8', (error, datos)=>{
    if(error){
      return res.json({Error:"no se puede leer los datos"})
    }
    const listaAprendices = JSON.parse(datos)
    //agregar el nuevo aprendiz
    listaAprendices.push(nuevoAprendiz)
    //escribir en el archivo
    sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), (error) => {
      if (error) {
        res.status(500).json({Error: "Nose puede registrar el aprendiz"})
      }
      res.status(201).json({Mensaje:"Aprendiz agregado correctamente"})
    })
  })
}) 

app.listen(port, function(){
  console.log(`Servidor en funcionamiento en el puerto: http://localhost:${port}`);
});