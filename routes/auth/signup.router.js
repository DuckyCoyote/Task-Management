const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { config } = require('../../config/config');

const { models } = require('../../database/sequelize');

const salt = parseInt(config.saltRounds);

router.get('/', async (req, res, next) => {
  try {
    const message = req.query.message || '';
    console.log(message)
    res.status(200).render('signup', {message});
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const user = req.body;
    const { email, password } = user;
    const isInDb = await models.User.findOne({ where: { email } });
    if (isInDb) {
      const message = 'Este email ya existe!';
      return res.redirect(`/signup?message=${encodeURIComponent(message)}`);
    }
    const hash = await bcrypt.hash(password, salt);
    const newUser = await { ...user, password: hash };
    await models.User.create(newUser);
    const userDb = await (models.User.findOne({ where: { email } }));
    req.session.sesion = true;
    req.session.idUser = userDb.id;
    return res.redirect('/user');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
