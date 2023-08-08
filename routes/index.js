const express = require('express');
const { requireSession } = require('../middleware/auth/auth.handler');

const SignIn = require('./auth/signin.router');
const SignUp = require('./auth/signup.router.js');
const TaskRouter = require('./tasks/task.router');
const ListRouter = require('./lists/list.router');
const UserRouter = require('./users/user.router');
const SignOut = require('./auth/signout.router.js');

const public = require('./public');

function routerApi(app) {
  const router = express.Router();
  app.use(router);
  router.use('/', SignIn);
  router.use('/signup', SignUp);
  router.use('/img', public);
  router.use(requireSession);
  router.use('/task', TaskRouter);
  router.use('/list', ListRouter);
  router.use('/user', UserRouter);
  router.use('/signout', SignOut);
}

module.exports = routerApi;
