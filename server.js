var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function(req, res) {
  res.redirect("index.html");
});

server.listen(3007);
matrix = [];

var side = 50;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < side; i++) {
  matrix[i] = [];
  for (let j = 0; j < side; j++) {
    matrix[i][j] = Math.floor(rand(0, 6));
  }
}
io.sockets.emit("send matrix", matrix);

grassArr = [];
grassEaterArr = [];
predatorArr = [];
bombArr = [];
humanArr = [];
magArr = [];

let Grass = require("./classes/Grass");
let GrassEater = require("./classes/GrassEater");
let Predator = require("./classes/Predator");
let Bomb = require("./classes/Bomb");
let Human = require("./classes/Human");
let Mag = require("./classes/Mag");

function createObject() {
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
      } else if (matrix[y][x] == 5) {
        var newHuman = new Human(x, y, 5);
        humanArr.push(newHuman);
      }
      else if (matrix[y][x] == 6) {
        var newMag = new Mag(x, y, 6);
        magArr.push(newMag);
      }
    }
  }

  io.sockets.emit("send matrix", matrix);
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

  for (var i in bombArr) {
    bombArr[i].eat();
  }

  for (var i in humanArr) {
    humanArr[i].eat();
  }

  for (var i in magArr) {
    magArr[i].change();
  }
  io.sockets.emit("send matrix", matrix);
}
setInterval(game, 300);

function kill() {
  grassArr = [];
  grassEaterArr = [];
  predatorArr = [];
  bombArr = [];
  humanArr = [];
  magArr = [];
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addGrass() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1;
      grassArr.push(new Grass(x, y, 1));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      grassEaterArr.push(new GrassEater(x, y, 2));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addPredator() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3;
      predatorArr.push(new Predator(x, y, 3));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addHuman() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 5;
      humanArr.push(new Human(x, y, 5));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

io.on("connection", function(socket) {
  createObject();
  socket.on("kill", kill);
  socket.on("add grass", addGrass);
  socket.on("add grassEater", addGrassEater);
  socket.on("add predator", addPredator);
  socket.on("add human", addHuman);
});

var statistics = {};

setInterval(function() {
  statistics.grass = grassArr.length;
  statistics.grassEater = grassEaterArr.length;
  statistics.predator = predatorArr.length;
  statistics.human = humanArr.length;
  fs.writeFile("statistics.json", JSON.stringify(statistics), function() {
    console.log("send");
  });
}, 1000);
