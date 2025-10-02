const { Router } = require('express');
const wrap = require('../middleware/asyncWrap');
const ctrl = require('../controllers/librosController');

const router = Router();

// GET /api/libros - Lista todos los libros
router.get('/libros', wrap(ctrl.listBooks));

// GET /api/libros/:id - Obtiene un libro por ID
router.get('/libros/:id', wrap(ctrl.getBook));

// POST /api/libros - Crea un nuevo libro
router.post('/libros', wrap(ctrl.createBook));

// DELETE /api/libros/:id - Elimina un libro
router.delete('/libros/:id', wrap(ctrl.deleteBook));

module.exports = router;