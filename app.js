var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var aboutRouter = require('./routes/about');
var contactUsRouter = require('./routes/contactUs');
var usersManagementRouter = require('./routes/usersManagement');
var getUsersRouter = require('./routes/getUsers');
var deleteUserRouter = require('./routes/deleteUser');
var updateUserRouter = require('./routes/updateUser');
var addUserRouter = require('./routes/addUser');
var usersRouter = require('./routes/users');
var Error404Router = require('./routes/Error404');
var catalogRouter = require('./routes/catalog');
var getcatalogRouter = require('./routes/getcatalog');
var branchManagementRouter = require('./routes/branchManagement');
var getBranchesRouter = require('./routes/getBranches');
*/



var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var flowerRoute = require('./routes/flowerRoute');
var loginRoute = require('./routes/loginRoute');
var branchRoure = require('./routes/branchRoure');
var usersRoute = require('./routes/userRout');
var aboutRouter = require('./routes/aboutRout');
var Error404Router = require('./routes/Error404Rout');
var homeRouter = require('./routes/homeRout');
var contactUsRouter = require('./routes/contactUsRout');
app.use(flowerRoute);
app.use(loginRoute);
app.use(branchRoure);
app.use(usersRoute);
app.use(aboutRouter);
app.use(Error404Router);
app.use(homeRouter);
app.use(contactUsRouter);

/*
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/index', indexRouter);
app.use('/contactUs', contactUsRouter);
app.use('/usersManagement', usersManagementRouter);
app.use('/about', aboutRouter);
app.use('/getUsers', getUsersRouter);
app.use('/deleteUser', deleteUserRouter);
app.use('/updateUser', updateUserRouter);
app.use('/addUser', addUserRouter);
app.use('/users', usersRouter);
app.use('/Error404', Error404Router);
app.use('/catalog', catalogRouter);
app.use('/getcatalog', getcatalogRouter);
app.use('/branchManagement', branchManagementRouter);
app.use('/getBranches', getBranchesRouter);
*/

app.get('/', function (req, res) {
  res.render('index');
 });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

