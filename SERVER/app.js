// mysql connection start
const {sqlConfig} = require('./secrets/sqlconfig')

const mysql      = require('mysql');
const connection = mysql.createConnection(sqlConfig);

connection.connect();
// mysql connection end

let express = require('express');
var cors = require('cors')
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let FileStore = require('session-file-store');


let app = express();

app.use(cors())// CORS option can be set with cors module
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//session initialize
const {sessionKey} = require('./secrets/')

app.use(session({
  secret: sessionKey,
  resave: false,
  saveUninitialized: false,
}));

//router
// app.use('/', indexRouter);
// app.use('/api/items', itemsRouter);
// app.use('/api/reviews', reviewsRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/login', loginRouter);
// app.use('/api/logout', logoutRouter);
// app.use('/api/signup', signupRouter);















connection.query('SELECT * from users', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.', err);
});

connection.end();