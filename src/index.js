// Punto de entrada: levanta el servidor HTTP
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API de Libros ejecutándose en http://localhost:${PORT}`);
  console.log(`Endpoints disponibles:`);
  console.log(`   GET    /api/libros       - Lista todos los libros`);
  console.log(`   GET    /api/libros/:id   - Obtiene un libro por ID`);
  console.log(`   POST   /api/libros       - Crea un nuevo libro`);
  console.log(`   DELETE /api/libros/:id   - Elimina un libro`);
});
