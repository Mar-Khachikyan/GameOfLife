var side = 20;
var socket = io();

function setup() {

    createCanvas(50 * side, 50 * side);
    background('grey');
}

function drawing(matrix) {
  noStroke()


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("black");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("black")
            } else if (matrix[y][x] == 5) {
                fill(240, 203, 142);
            } else if (matrix[y][x] == 6) {
              fill("purple")
          }
             else {
                fill("grey");
            }

            ellipse(x * side, y * side, side, side);
        }
    }
}

socket.on('send matrix', drawing);

function kill() {
    socket.emit("kill");
}

function addGrass() {
    socket.emit("add grass");
}

function addGrassEater() {
    socket.emit("add grassEater");
}

function addPredator() {
    socket.emit("add predator");
}

function addHuman() {
    socket.emit("add human");
}
