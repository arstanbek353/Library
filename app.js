require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var debug = require('debug')('express-locallibrary-tutorial:server');
var http = require('http');

var catalogRouter = require('./routes/catalog.js');
var authRouter = require('./routes/auth.js')
var usersRouter = require('./routes/users.js')

var errorMiddleware = require('./middlewares/errorMiddleware')

var app = express();

//Устанавливаем соединение с mongoose
var mongoose = require('mongoose');
var mongoDB = process.env.DATA_BASE_URL || 'mongodb+srv://Arstanbek:akbosogo2022@cluster0.ntfdt.mongodb.net/mozilla?retryWrites=true&w=majority' // remote db
if (process.env.NODE_ENV === 'development') {
    mongoDB = 'mongodb://localhost:27017/mozilla' // local db
}

mongoose.connect(mongoDB);
// Позволим Mongoose использовать глобальную библиотеку промисов
mongoose.Promise = global.Promise;
// Получение подключения по умолчанию
var db = mongoose.connection;
// Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'client', 'build')));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.options(cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL
// }))
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

if (process.env.NODE_ENV === 'development') {
    app.use('/', catalogRouter);
}
app.use('/catalog', catalogRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
if (process.env.NODE_ENV === 'production' || true) {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res, next) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.json({ message: 'непредвиденная ошибка error handler' });
// });
app.use(errorMiddleware)


///////////////////////====================/////////////////////


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '80');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
