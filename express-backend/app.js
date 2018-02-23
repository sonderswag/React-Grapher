var express = require('express')
var path = require('path')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
var port = 4200;
var cors = require('cors');

server.listen(port, function(){
  console.log('Server is running on Port:',port);
})

var traceRouter = require('./src/routes/traceRouter');
var fileRouter = require('./src/routes/fileRouter')

//uncomment the line if you want serve the clinet side app
app.use(express.static(path.join(__dirname, '../react-frontend/build')));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/trace', traceRouter)
app.use('/file', fileRouter)

io.on('connection', () => {
  console.log('connected')
})

io.on('test', (value) => {
  console.log('test',value)
})
