const { get } = require('../app');
const books = require('../data/libros_1000.json');
const { v4: uuidv4, validate: validateUUID } = require('uuid');

// GET /obtiene todos los libros
function listBooks(req, res) {
  try {
    // Verificar que los datos estén disponibles
    if (!books || !Array.isArray(books)) {
      const error = new Error('Fallo al leer los datos');
      error.status = 500;
      throw error;
    }
    
    // Enviar respuesta exitosa con código 200
    res.status(200).json({
      message: "Lista obtenida correctamente",
      data: books
    });
  } catch (error) {
    // Si es un error que ya tiene status, lo relanzamos
    if (error.status) {
      throw error;
    }
    // Si es cualquier otro error, lo convertimos en error 500
    const serverError = new Error('Fallo al leer los datos');
    serverError.status = 500;
    throw serverError;
  }
}

// GET Obtiene un libro por ID
function getBook(req, res) {
  const { id } = req.params;
  
  // Validar formato UUID
  if (!validateUUID(id)) {
    const error = new Error('ID inválido');
    error.status = 400;
    throw error;
  }
  
  const book = books.find(m => m.id === id);

  if (!book) {
    const error = new Error('Libro no encontrado');
    error.status = 404;
    throw error;
  }
  
  res.status(200).json({
    message: "Libro encontrado",
    data: book
  });
}

// POST /api/libros - Crea un nuevo libro
function createBook(req, res) {
  const { title, author, year } = req.body;
  
  // Validar campos requeridos
  if (!title || !author) {
    const error = new Error('Los campos title y author son requeridos');
    error.status = 400;
    throw error;
  }
  

  if (year !== undefined) {
    if (typeof year !== 'number' || !Number.isInteger(year)) {
      const error = new Error('El año debe ser un número entero');
      error.status = 400;
      throw error;
    }
    
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
      const error = new Error(`El año debe ser menor o igual a ${currentYear}`);
      error.status = 400;
      throw error;
    }
  }
  

  const duplicate = books.find(b => 
    b.title.toLowerCase() === title.toLowerCase() && 
    b.year === year
  );
  
  if (duplicate) {
    const error = new Error('Ya existe un libro con el mismo título y año');
    error.status = 409;
    throw error;
  }
  
  // Crear libro
  const newBook = {
    id: uuidv4(),
    title,
    author,
    year: year || undefined
  };
  
  books.push(newBook);
  res.status(201).json({
    message: "Libro creado",
    data: newBook
  });
}

// DELETE Elimina un libro
function deleteBook(req, res) {
  const { id } = req.params;
  
  // Validar formato UUID
  if (!validateUUID(id)) {
    const error = new Error('Id inválido');
    error.status = 400;
    throw error;
  }

  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    const error = new Error('Libro no existe');
    error.status = 404;
    throw error;
  }
  
  books.splice(index, 1);
  res.status(200).send("Libro eliminado correctamente");
}

module.exports = {
  listBooks,
  getBook,
  createBook,
  deleteBook
};