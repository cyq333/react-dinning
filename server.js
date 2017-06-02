import express from 'express';
import path from 'path';
//import favicon from 'serve-favicon';
import logger from 'morgan';
//import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import swig from 'swig';
import React from 'react';
import Router from 'react-router';
//import mongoose from 'mongoose';
//import DinningRecords from './models/dinningRecords';
import async from 'async';
import request from 'request';
import routes from './app/routes';

import index from './routes/index';
// import users from './routes/users';
// import routes from './routes/index';

//mongoose.connect('mongodb://115.159.184.71:27017/test');
//mongoose.connection.on('error', function(err) {
  //console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'+err);
//});









let app = express();
const router = express.Router();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// router.post('/api/orderRecords', (req, res) => {
//     console.log(req.body);
// });

var DinningRecords = require('./dinningRecords.js');

app.post('/api/orderRecords', function(req, res, next) {
    console.log(req.body);
    let dishes = JSON.stringify(req.body.dishes),
        totalPrice = req.body.totalPrice,
        remark = req.body.remark;
    console.log(typeof(dishes),typeof(totalPrice),typeof(remark),typeof(Date.now()));
    let orderRecords = new DinningRecords({
        recordId: Date.now(),
        dishes: dishes,
        totalPrice: totalPrice,
        remark: remark
    });
    orderRecords.save(function(err) {
        if (err) {
            console.log("errdata");
        } else {
            res.send("save success");
        }
    });
})

//app.set('port', process.env.PORT || 3000);


// app.use(function (req, res) {
//     Router.run(routes, req.path, function (Handler) {
//         var html = React.renderToString(React.createElement(Handler));
//         var page = swig.renderFile('views/index.html', { html: html });
//         res.send(page);
//     });
// });

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'ejs');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'src')));
// app.use(express.static(path.join(__dirname, 'js')));

app.use('/', index);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
