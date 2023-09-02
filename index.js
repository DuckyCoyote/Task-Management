const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const routerApi = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

const { sessionHandler } = require('./middleware/auth/auth.handler');
const {
  errorHandler,
  boomErrorHandler,
  logErrors,
  ormErrorHandler,
} = require('./middleware/error.handler');

const app = express();

const PORT = 3000;

const WHITELIST = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (WHITELIST.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));

//Auth Middleware
app.use( sessionHandler );

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, (req, res, next) => {
  console.log('Server listening on port: ' + PORT);
});
