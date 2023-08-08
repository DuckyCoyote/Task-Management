const { ValidationError, UniqueConstraintError } = require('sequelize');

const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  console.log('Middleware Error Handling');
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.json({
    status: errStatus,
    success: false,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.json(output.statusCode, output.payload);
  } else {
    const statusCode = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    res.json(statusCode, message);
    next(err);
  }
};

const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
    res.json(400, {
      status: 400,
      message: 'Error de validacion',
      errors: err.errors,
    });
  } else {
    next(err);
  }
};

module.exports = { errorHandler, logErrors, boomErrorHandler, ormErrorHandler };
