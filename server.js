const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/'));

app.get('/*', function(req,res) {
	res.sendFile(path.join(__dirname+ '/dist/index.html'));
});

//const dbo = require("./configs/db");
const bodyParser = require("body-parser")

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// JWt token
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// dbo.connectToServer(function (err) {
//   if (err) {
//     console.error(err);
//     process.exit();
//   }
  
    // Make sure you place body-parser before your CRUD handlers
    //app.use(bodyParser.urlencoded({extended: true}))

    // Pour que le serveur accepte des datas JSON 
    //app.use(bodyParser.json())

    //app.use(logger('dev'));
    //app.use(express.json());
    //app.use(express.urlencoded({ extended: false }));
    //app.use(cookieParser());
    //app.use(express.static(path.join(__dirname, 'public')));

    // // view engine setup
    // app.set('views', path.join(__dirname, 'views'));
    // app.set('view engine', 'jade');


    // // Ajouter des routeurs
    // var indexRouter = require('./src/routes/index');
    // var usersRouter = require('./src/routes/users');

    // // Utiliser les routeurs
     //app.use('/api/', indexRouter);
    // app.use('/api/utilisateurs', usersRouter);

    //let pathNoToken = ['/api/utilisateurs/connexion', '/api/utilisateurs/inscription']
    //app.use(expressJwt({secret: 'ekalySecret', algorithms: ["RS256"]}).unless({path: pathNoToken}));

    // catch 404 and forward to error handler
    //app.use(function(req, res, next) {
    //next(createError(404));
    //});

    // error handler
    //app.use(function(err, req, res, next) {
         //set locals, only providing error in development
        //res.locals.message = err.message;
        //res.locals.error = req.app.get('env') === 'development' ? err : {};

         //render the error page
        //res.status(err.status || 500);
        //res.send({message: err.message})
    //});

    //app.use(express.static('public'));

  // start the Express server
// });



app.listen(process.env.PORT || 8080);
