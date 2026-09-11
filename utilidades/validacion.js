// utilidades/validaciones.js

function validarNombre(nombre) {
    return typeof nombre === 'string' && nombre.trim().length >= 3;
}

function validarCorreo(correo) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
}

function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

module.exports = {
    validarNombre,
    validarCorreo,
    generarId
};