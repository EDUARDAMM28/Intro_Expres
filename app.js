const express = require('express');
const app = express();
require("dotenv/config")
const port = process.env.PUERTO || 3000;
//configuracion para lectura del archivo
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")
const multer = require("multer")

//validacion 
// PASO 3: Importar funciones de validación y generación de ID
const { validarNombre, validarCorreo, generarId } = require("./utilidades/validacion");

//configurar almacenamiento
const almacenamiento = multer.diskStorage(
    {
        destination: (req, file, cb)=>{
            cb(null, "misImagenes/")
        },
        filename: (req, file, cb)=>{
            const extensionArchivo = ruta.extname(file.originalname)
            cb(null, `${Date.now()}${extensionArchivo}`)
        }
    }
)
const subirArchivo = multer({storage: almacenamiento})


//middlewre body-parse, formatea los datos enviados
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//endpoint raiz
app.get("/", function(req, res){
    res.send("Hola aprendiento express")
})

// endpoint para ver datos del archivo
app.get("/api/aprendices", (req, res)=>{
    //datos vienen del archivo
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
        //si hay error 
        if(error){
            return res.json({Error: "No se puede leer los datos." })
        }
        //parse --> trasformar
        const listaAprendices = JSON.parse(datos)
        res.json(listaAprendices)
    })
    
})


// endpoint para ver datos del archivo
app.post("/api/aprendices", subirArchivo.single("imagen1"), (req, res)=>{
    const nuevoAprendiz = req.body
    nuevoAprendiz.imagen = req.file? `/misImagenes/${req.file.filename}`: "sin imagen"
    //Utilizamos la lectura del archivo
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
        //si hay error 
        if(error){
            return res.json({Error: "No se puede leer los datos." })
        }
        //parse --> trasformar
        const listaAprendices = JSON.parse(datos)
        //agregar el nuevo aprendiz
        listaAprendices.push(nuevoAprendiz)
        //escribir en el archivo
        sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), 
                (error) => {
                if(error){
                    res.status(500).json({Error: "No se puede registrar el aprendiz."})
                }
                res.status(201).json({mensaje: "Aprendiz creado con exito."})
            }

        )
            
    })
    
})



//El servidor en funcionamiento
app.listen(port, function(){
    console.log(`Servidor http://localhost:${port}`);
});
