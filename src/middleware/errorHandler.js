// Manejo centralizado de errores
module.exports = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  
  // Log del error en consola
  console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${status}: ${message}`);
  
  // Respuesta JSON estandarizada
  res.status(status).json({
    error: message
  });
};