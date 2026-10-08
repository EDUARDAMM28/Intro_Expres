// utilidades/validaciones.js

// Validar que el nombre sea un texto y tenga al menos 3 caracteres
const validarNombre = (nombre) => {
    return typeof nombre === 'string' && nombre.trim().length >= 3; // Retorna true si tiene 3 o más letras
};

// Validar formato de correo usando una Expresión Regular (Regex)
const validarCorreo = (correo) => {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Patrón estándar de email (ej: usuario@dominio.com)
    return regexCorreo.test(correo); // Retorna true si el correo cumple con el patrón
};

// Generar un ID único automático basado en la fecha actual en milisegundos
const generarId = () => {
    return Date.now().toString(); // Convierte la marca de tiempo actual a texto para usarlo como ID
};

// Exportar las 3 funciones para poder utilizarlas en otros archivos (app.js)
module.exports = {
    validarNombre,
    validarCorreo,
    generarId
};