var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

var matrix = [];

var side = 20;

function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < side; i++) {
    matrix[i] = [];
    for (let j = 0; j < side; j++) {
        matrix[i][j] = Math.floor(rand(0, 5));
    }  
}
io.sockets.emit('send matrix', matrix);

    var grassArr = [];
    var grassEaterArr = [];
    var predatorArr = [];
    var bombArr = [];
    var humanArr = [];

    let Grass = require("./classes/Grass")
    let GrassEater = require("./classes/GrassEater")

    function createObject(matrix) {
      for (var y = 0; y < matrix.length; y++) {
         for (var x = 0; x < matrix[y].length; x++) {
             if (matrix[y][x] == 1) {
                 var newGrass = new Grass(x, y, 1);
                 grassArr.push(newGrass);
             } else if (matrix[y][x] == 2) {
                 var newGrassEater = new GrassEater(x, y, 2);
                 grassEaterArr.push(newGrassEater);
             } else if (matrix[y][x] == 3) {
                 var newPredator = new Predator(x, y, 3);
                 predatorArr.push(newPredator);
             } else if (matrix[y][x] == 4) {
                 var newBomb = new Bomb(x, y, 4);
                 bombArr.push(newBomb);
             }
             else if (matrix[y][x] == 5) {
                 var newHuman = new Human(x, y, 5);
                 humanArr.push(newHuman);
             }
         }
      }

        io.sockets.emit('send matrix', matrix)

    }

    function game() {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
        
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
        
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
        
        for(var i in bombArr){
            bombArr[i].eat();
        }
        
        for(var i in humanArr){
            humanArr[i].eat();
        }
        io.sockets.emit('send matrix', matrix);
    }

    setInterval(game, 1000)

io.on('connection', function (socket) {
    createObject(matrix)
})
