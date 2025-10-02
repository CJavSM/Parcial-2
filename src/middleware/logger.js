// Middleware de logging: imprime método, ruta y código de estado
module.exports = (req, res, next) => {
  // Capturamos el método original res.json para interceptar el status
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);
  
  // Override res.json
  res.json = function(data) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    return originalJson(data);
  };
  
  // Override res.send
  res.send = function(data) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    return originalSend(data);
  };
  
  next();
};