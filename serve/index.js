const express = require('express');
const cors = require('cors');
const path = require('path');

const ejs = require('ejs');
const config = require('./config/default')

const app = express();

app.use(express.static(__dirname + '/views'));

app.use(cors({
    origin: ['http://localhost:5173','http://10.118.149.55:5173'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));

// app.all('*', function (req, res, next) {
//     // res.header('Access-Control-Allow-Origin', '*');
//     // res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
//     // res.header('Access-Control-Allow-Credentials', true);
//     // res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//     // res.header('X-Powered-By', '3.2.1');
//     // res.header('Content-Type', 'application/json:charset=utf-8');

// 	res.header("Access-Control-Allow-Origin","*");
// 	res.header("Access-Control-Allow-Headers","X-Requested-With");
// 	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("X-Powered-By",' 3.2.1');
//     res.header("Content-Type","*");
//     if (req.method == 'OPTIONS') {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });


app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/index')(app);

app.listen(config.port, () => {
    console.log(`启动端口${config.port}`)
})