const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const { config } = require('../../config/config');
const salt = parseInt(config.saltRounds);

const { models } = require('../../database/sequelize');


const { updateUser } = require('../../schemas/user.schema');
const validatorHandler = require('../../middleware/validator.handler');

const uploadImage = require('../../middleware/files.upload');

const router = express.Router();

const upload = multer({
  limits: {
    files: 5,
  },
});

router.get('/', async (req, res) => {
  const user = req.session.idUser;
  const userDb = await models.User.findByPk(user);
  userDb.password = '';
  res.render('profile', { page: 'Profile', user: userDb });
});

router.get('/photo/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'assets',
      'public',
      'img',
      filename
    );
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
});

router.patch(
  '/update',
  validatorHandler(updateUser, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const id = req.session.idUser;
      const password = body.password;
      const hash = await bcrypt.hash(password, salt);
      const newUser = await { ...body, password: hash };
      const user = await models.User.findByPk(id);
      await user.update(newUser);
      res.json(200);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/update/photo',
  upload.single('photo'),
  async (req, res, next) => {
    try {
      const file = req.file;
      const id = req.session.idUser;
      const { buffer } = file;
      const fileName = await uploadImage(buffer);
      const user = await models.User.findByPk(id);
      await user.update({ image: fileName });
      res.json(200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
