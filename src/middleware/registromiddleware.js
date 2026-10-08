const registroMiddleware = (req, res, next) => {
    const fecha = new Date().toISOString
    console.log(`[Historial Peticiones] ${fecha}, ${req.mothod}, ${res.url}, ${req.ip}`)

    next()
}

module.exports = registroMiddleware