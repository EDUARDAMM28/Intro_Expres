const express = require('express'); // Importa la librería Express para crear el servidor web
const app = express(); // Inicializa la aplicación de Express
require("dotenv/config"); // Carga las variables de entorno desde el archivo .env
const port = process.env.PUERTO || 3000; // Define el puerto del servidor (usa la variable de entorno o el puerto 3000)

// Configuración para lectura del archivo
const sistemaArchivo = require("fs"); // Importa el módulo 'fs' de Node.js para leer y escribir archivos
const ruta = require("path"); // Importa 'path' para gestionar rutas de archivos de forma segura
const rutaArchivoJson = ruta.join(__dirname, "datos.json"); // Construye la ruta absoluta hacia el archivo 'datos.json'
const multer = require("multer"); // Importa 'multer' para gestionar la subida de imágenes/archivos

// 🔴 IMPORTACIÓN DE LAS VALIDACIONES (Punto 3 de la guía)
const { validarNombre, validarCorreo, generarId } = require("./utilidades/validacion"); // Importa las 3 funciones del archivo validaciones.js
 // importacion de middleware
 const registroMiddleware = require("./middleware/registromiddleware")


// Configurar el almacenamiento de archivos con Multer
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "misImagenes/"); // Define la carpeta destino donde se guardarán las imágenes subidas
    },
    filename: (req, file, cb) => {
        const extensionArchivo = ruta.extname(file.originalname); // Obtiene la extensión original del archivo (.png, .jpg, etc.)
        cb(null, `${Date.now()}${extensionArchivo}`); // Renombra el archivo guardado con un número único basado en la fecha
    }
});
const subirArchivo = multer({ storage: almacenamiento }); // Inicializa el middleware de Multer con la configuración previa


// Middlewares para procesar la información entrante en las peticiones----------------------------------------------------------------
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


// Middleware para registrar la fecha y hora de cada petición
app.use((req, res, next) => {
  console.log(`tiempo milisegundos: ${Date.now()}`);
  console.log(`fecha: ${new Date().toISOString()}`);
  
  // 🔴 VITAL: next() le dice a Express que continúe a la siguiente función/endpoint
  next(); 
});

app.use(registroMiddleware);

// Endpoint GET raíz de prueba--------------------------------------------------------------------------------------------------------
app.get("/", function(req, res) {
    res.send("Hola aprendiendo express"); // Responde un mensaje básico para verificar que el servidor está corriendo
});

// Endpoint GET para consultar los aprendices guardados--------------------------------------------------------------------------------
app.get("/api/aprendices", (req, res) => {
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => { // Lee el contenido de 'datos.json' como texto
        if (error) {
            return res.json({ Error: "No se puede leer los datos." }); // Retorna mensaje de error si el archivo no existe o falla la lectura
        }
        const listaAprendices = JSON.parse(datos); // Convierte el texto JSON leído a un Arreglo de objetos en JavaScript
        res.json(listaAprendices); // Retorna al cliente el arreglo de aprendices en formato JSON
    });
});

//Endpoin Put para modificar al usaurio con id ---------------------------------------------------------------------------------------------------
app.put("/api/aprendices/:id", (req,res)=>{
  res.status(200).json({mensaje : "Endpoind en construccion de modificar"})
})


//Endpoin Delete para eliminar el usuario con id -------------------------------------------------------------------------------------------
app.delete("/api/aprendices/:id", (req,res)=>{
  res.status(200).json({mensaje : "Endpoind en construccion de eliminar"})
})


// Endpoint POST para registrar un nuevo aprendiz con validaciones---------------------------------------------------------------------------
app.post("/api/aprendices", subirArchivo.single("imagen1"), (req, res) => { 
    const { nombre, correo } = req.body;


    if (!validarNombre(nombre)) {
        return res.status(400).json({ Error: "El nombre debe tener al menos 3 letras." });
    }

    if (!validarCorreo(correo)) { 
        return res.status(400).json({ Error: "El correo electrónico no es válido." });
    }
    
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "No se puede leer los datos." }); // Maneja error de lectura de archivo (status 500)
        }
        const listaAprendices = JSON.parse(datos); // Convierte el texto JSON almacenado a una lista/array de JavaScript
        // 🔴 CONSTRUCCIÓN DEL OBJETO CON ID AUTOMÁTICO (Punto 7)
        const nuevoAprendiz = {
            id: generarId(), // Genera y asigna el ID automático importado desde validaciones.js
            nombre: nombre, // Asigna el nombre validado
            correo: correo, // Asigna el correo validado
            ...req.body, // Copia el resto de campos si existen en el formulario
            imagen: req.file ? `/misImagenes/${req.file.filename}` : "sin imagen" // Guarda la ruta de la imagen o un texto por defecto
        };

        listaAprendices.push(nuevoAprendiz); // Agrega el nuevo objeto al arreglo local de aprendices

        sistemaArchivo.writeFile(
            rutaArchivoJson, 
            JSON.stringify(listaAprendices, null, 2), 
            (error) => {
                if (error) {
                    return res.status(500).json({ Error: "No se puede registrar el aprendiz." }); 
                }
                res.status(201).json({ 
                    mensaje: "Aprendiz creado con éxito.",
                    aprendiz: nuevoAprendiz 
                });
            }
        );
    });
});

// Iniciar y poner a escuchar el servidor Express
app.listen(port, function() {
    console.log(`Servidor http://localhost:${port}`); // Muestra en consola la URL del servidor en marcha
});