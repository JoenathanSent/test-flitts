const errHandler = (err, req, res, next) => {
  let code = 500;
  let message = err
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
    code = 400;
    message = err.errors.map(el => {
      return el.message
    })
  } else if (err.name === 'Not Found') {
    code = 404;
    message = err.message;
  } else if (err.name === 'JsonWebTokenError') {
    code = 401;
    message = 'Please login first!';
  } else if (err.name === 'Forbidden') {
    code = 403;
    message = err.message;
  } else if (err.name === 'Not Authorized') {
    code = 401;
    message = err.message;
  } else if (err.name === 'Bad Request') {
    code = 400;
    message = err.message;
  } else if (err.name === 'Fail Login') {
    code = 401;
    message = 'Wrong username / password';
  } else if (err.name === 'Invalid Token') {
    code = 404;
    message = 'Invalid Token';
  }
  res.status(code).json({message})
}

module.exports = errHandler