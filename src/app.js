// Configuración de Express: JSON, rutas y manejo de errores
const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const peliculasRoutes = require('./routes/libros');

const app = express();

// Middleware de logging
app.use(logger);

// Parsear JSON del body
app.use(express.json());

// Rutas de la API
app.use('/api', peliculasRoutes);

// 404 para rutas no definidas
app.use((req, res, next) => {
  const error = new Error('Recurso no encontrado');
  error.status = 404;
  next(error);
});

// Manejador centralizado de errores (debe ir al final)
app.use(errorHandler);

module.exports = app;