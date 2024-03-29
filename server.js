const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/'));

const dbo = require("./backend/configs/db");
const bodyParser = require("body-parser")
const PORT = require("./backend/configs/environment").PORT;

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Cors
const cors = require("cors");

var corsOptions = {
  origin: ["http://localhost:4200", "https://m1p9mean-finoana.herokuapp.com/"]
};

app.use(cors(corsOptions));
app.use(express.static('backend/public'));

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  
    // Make sure you place body-parser before your CRUD handlers
    app.use(bodyParser.urlencoded({extended: true}, {limit: '25mb'}))

    // Pour que le serveur accepte des datas JSON 
    app.use(bodyParser.json({limit: '25mb'}))

    //app.use(logger('dev'));
    app.use(express.json({limit: '25mb'}));
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }, {limit: '25mb'}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    // // view engine setup
    app.set('views', path.join(__dirname, 'backend/views'));
    app.set('view engine', 'jade');


    // // Ajouter des routeurs
    var indexRouter = require('./backend/src/routes/index');
    var usersRouter = require('./backend/src/routes/users');
    var restoRouter = require('./backend/src/routes/restaurant');
    var comRouter = require('./backend/src/routes/commande');
    var platRouter = require('./backend/src/routes/plat');

    // // Utiliser les routeurs api
    app.use('/api/', indexRouter);
    app.use('/api/utilisateurs', usersRouter);
    app.use('/api/restaurants', restoRouter);
    app.use('/api/commandes', comRouter);
    app.use('/api/plats', platRouter);

    app.get('/*', function(req,res) {
      res.sendFile(path.join(__dirname+ '/dist/index.html'));
    });


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
    next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
         //set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

         //render the error page
        res.status(err.status || 500);
       res.send({message: err.message})
    });

    //app.use(express.static('public'));
    // app.listen(PORT, function(){

    // });
    app.listen(process.env.PORT || 8080);
  // start the Express server
});



