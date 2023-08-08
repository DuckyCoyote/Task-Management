const express = require('express');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../../database/sequelize');

const validatorHandler = require('../../middleware/validator.handler');
const { loginUser } = require('../../schemas/login.schema');

const router = express.Router();

const error = async (req, res, next) => {
  try {
    req.session.sesion = false;
    const message = 'Email or Password not match';
    //res.status(403).render('index', { status: 403, message });
    Boom.forbidden('User not found');
    res.redirect('/?message=' + encodeURIComponent(message));
  } catch (error) {
    next(error);
  }
};

router.get('/', async (req, res, next) => {
  try {
    const message = req.query.message || '';
    res.status(200).render('login', { message });
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(loginUser, 'body'), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return await error(req, res, next);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      req.session.sesion = true;
      req.session.idUser = user.id;
      res.redirect('/user');
    } else {
      return await error(req, res, next);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

/*
const { email, password } = req.body;    
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      req.session.sesion = false;
      const message = 'Email or Password not match';
      //res.status(403).render('index', { status: 403, message });
      Boom.forbidden('User not found');
      res.redirect('/login?message=' + encodeURIComponent(message));
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      req.session.sesion = true;
      //req.session.email = user.email;
      res.redirect('/inicio');
    } else {
      req.session.sesion = false;
      const message = 'Email or Password not match';
      //res.status(403).render('index', { status: 403, message });
      Boom.forbidden('User not found');
      res.redirect('/login?message=' + encodeURIComponent(message));
*/
