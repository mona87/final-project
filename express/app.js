var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var expressLayouts=require("express-ejs-layouts") 
var happyhours = require('./routes/happyhours');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodetest');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ssshhhhh',
  resave: false,
  saveUninitialized: false

}));





app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if('OPTIONS' == req.method){
    res.sendStatus(200);
  }
  else{
  next();
  }
});



app.use('/', routes);
app.get('/users', users.index);
app.post('/users', users.create);
app.delete('/users',users.delete);
app.put('/users',users.update);
app.get('/users/:id', users.show);
app.get('/happyhours', happyhours.index);

var sess;

app.get('/awesome',function(req,res){
    sess=req.session;
    //Session set when user Request our app via URL
    if(sess.email)
    {
    /*
    * This line check Session existence.
    * If it existed will do some action.
    */
    res.redirect('/admin');
    }
    else{
    res.render('index.html');
    }
});

app.post('/login',function(req,res){
      sess=req.session;
      //In this we are assigning email to sess.email variable.
      //email comes from HTML page.
      sess.email=req.body.email;
      res.end('done');
    });

    app.get('/admin',function(req,res){
    sess=req.session;
    if(sess.email)
    {
    res.write('<h1>Hello '+sess.email+'</h1>');
    res.end('<a href="+">Logout</a>');
    }
    else
    {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href="+">Login</a>');
    }

});

app.get('/logout',function(req,res){

    req.session.destroy(function(err){
    if(err){
    console.log(err);
    }
    else
    {
    res.redirect('/');
    console.log('logout');
    }
    });

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
