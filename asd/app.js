var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If the trip is not possible without making extra stops, the output should be null. For example, the first problem means to start at station A, then travel directly to station B (a distance of 5), then directly to station C (a distance of 4).

const routesInfo = ["AB5", "BC4", "CD8", "DC8", "DE6", "AD5", "CE2", "EB3", "AE7"]

// question 1-3
app.get('/calc-distance', function (req,res) {
  /*
  const stop1 = req.query.first,
  stop2 = req.query.second,
  stop3 = req.query.third,
  stop4 = req.query.fourth,
  stop5 = req.query.fifth
    */
  const stop1 = 'A',
  stop2 = 'B',
  stop3 = 'C',
  stop4 = '',
  stop5 = ''

  var trip1dist = 0,
    trip2dist = 0,
    trip3dist = 0,
    trip4dist = 0,
    dist = 0

  // for 3 stations
  if (stop1 && stop2 && stop3 && (!stop4) && (!stop5)) {
    var foundFirst = false,
    foundSecond = false
    for (var i = 0; i<routesInfo.length;i++) {
      var origin = routesInfo[i].charAt(0),
      destination = routesInfo[i].charAt(1)
      if (origin == stop1 && destination == stop2) {
        distance = routesInfo[i].charAt(2)
        trip1dist = distance
        foundFirst = true
      }
      if (origin == stop2 && destination == stop3) {
        distance = routesInfo[i].charAt(2)
        trip2dist = distance
        foundSecond = true
      }
    }
    // REFACTOR CHECKING FOR IMPOSSIBLE ROUTE
    if (foundFirst && !foundSecond) {
      console.log(null)
    }
    if (!foundFirst && foundSecond) {
      console.log(null)
    }
    if (!foundFirst && !foundSecond) {
      console.log(null)
    }
    var total = Number(trip1dist) + Number(trip2dist)
    console.log('The distance of the trip was: '+total)
  }

  // for 5 stations
  if (stop1 && stop2 && stop3 && stop4 && stop5) {
    for (var i = 0; i<routesInfo.length;i++) {
      var origin = routesInfo[i].charAt(0),
      destination = routesInfo[i].charAt(1)
      if (origin == stop1 && destination == stop2) {
        distance = routesInfo[i].charAt(2)
        trip1dist = distance
      }
      if (origin == stop2 && destination == stop3) {
        distance = routesInfo[i].charAt(2)
        trip2dist = distance
      }
      if (origin == stop3 && destination == stop4) {
        distance = routesInfo[i].charAt(2)
        trip3dist = distance
      }
      if (origin == stop4 && destination == stop5) {
        distance = routesInfo[i].charAt(2)
        trip4dist = distance
      }
    }
    // CHECK FOR IMPOSSIBLE ROUTE
    var total = Number(trip1dist) + Number(trip2dist) + Number(trip3dist) + Number(trip4dist)
    console.log('The distance of the trip was: '+total)
  }
})

// question 4
app.get('/trips-5-stops-from-a-to-c', function (req, res) {
  //The number of trips starting at A and ending at C making exactly 4 stops (5 stations including the origin). In the input data above, there are three such trips A-B-C-D-C, A-D-C-D-C and A-D-E-B-C.
    //A-B-C-D-C, A-D-C-D-C and A-D-E-B-C.
})

// question 5
app.get('/shortest-from-b-to-b', function (req, res) {
  var trip1,
    trip2,
    trip3,
    trip4,
    trip5,
    trip6,
    trip7,
    trip8
  
  for(var i = 0; i<routesInfo.length; i++) {
    if (routesInfo[i].charAt(0) == 'B') {
      trip1 = routesInfo[i].charAt(2)    
    }
  }
  
})

// question 6
app.get('/routes-from-c-to-c', function (req, res) {
// return number of different routes from C to C, with distance of less than 30
  
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
