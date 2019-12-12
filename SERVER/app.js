let http = require('http');
let express = require('express');
let cors = require('cors')
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let FileStore = require('session-file-store');

let membersRouter = require('./routes/members');
let itemsRouter = require('./routes/items');

let app = express();

app.use(cors())// CORS option can be set with cors module
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//session initialize
const {sessionKey} = require('./secrets/sessionKey.js')

app.use(session({
  secret: sessionKey,
  resave: false,
  saveUninitialized: false,
}));

//router
app.use('/members', membersRouter);
app.use('/items', itemsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.message = err.message;
  res.error = err;
  res.status(err.status || 500).send()
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
