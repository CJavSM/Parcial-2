// Envuelve controladores async/síncronos y propaga errores
module.exports = (fn) => (req, res, next) => {
  try {
    const result = fn(req, res, next);
    if (result && typeof result.catch === 'function') {
      result.catch(next);
    }
  } catch (error) {
    next(error);
  }
};