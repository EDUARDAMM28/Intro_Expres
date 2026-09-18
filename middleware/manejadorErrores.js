const manejadorErrores = (error, req, res, next)=>{
    const codigoError = error.statusCode || 500
    const mensajeError = error.menssage || "Error inesperado!!"
    //mostrar error por consola
    console.error(`[Manejador Errores] - ${new Date().toISOString} - ${codigoError} - ${mensajeError}`)
    //validar mas mensajes de errores, detalles
    if(error.stack){
        console.error(error.stack)
    }
    //mensaje para el usuario
    res.json({Error: "ManejadorErrores", 
        codigoError, 
        mensajeError, 
        //validar .env si estamos 
        ...(process.env.NODE_ENV === "development" && {
            stack : error.stack})
        })
}

module.exports = manejadorErrores