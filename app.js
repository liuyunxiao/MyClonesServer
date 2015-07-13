var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var session = require('express-session')
var SessionStore = require('connect-mongo')(session);
var store = new SessionStore({
  url: "mongodb://localhost/session",
  interval: 120000
});

var apn = require('apn');
var token = '6fe7fa78a48c7af78bdb65a839402ef1b943121b79a2cdde24d52278227f9a76'; //长度为64的设备Token
var options = { "gateway": "gateway.sandbox.push.apple.com" },
    apnConnection = new apn.Connection(options),
    device = new apn.Device(token),
    note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 60;
note.badge = 3;
note.alert = "动漫驿站 \n点击查看更新的1篇文章";
note.payload = {'messageFrom': 'Caroline'};

apnConnection.pushNotification(note, device);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('fens.me'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.methodOverride());
app.use(session({
  secret : 'fens.me',
  store : store,
  cookie: {maxAge: 900000},
  resave: true,
  saveUninitialized: true,
  name: 'JSESSIONID'
}));

app.use('/', routes);
app.use('/users', users);
app.use('/account', require('./routes/account'));
app.use('/dynamic', require('./routes/dynamic'));
app.use('/self', require('./routes/self'));

var dbCurd = require('./DB/dbcurd');
var saveData = {
  account: 'qqqa77',
  password: '22222'//,
  //salt: 'fdee',
  //hash: 'ssss'
};



app.use(function(req, res, next){
  //res.locals.user = req.session.user;
  console.log("function>>>>>>>>>>");
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
