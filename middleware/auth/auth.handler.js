const session = require('express-session');
const crypto = require('crypto');

const oneDay = 1000 * 24 * 60 * 60;
const sessionHandler = session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: oneDay, httpOnly: true },
});

const requireSession = (req, res, next) => {
  if (req.session && req.session.sesion) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { sessionHandler, requireSession };
