const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    req.session.sesion = false;
    req.session.destroy;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;