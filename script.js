var side = 20;
var socket = io()

function setup() {
    creatObjects();
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
 }

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("black")
            } else if (matrix[y][x] == 5) {
                 fill(245, 220, 215);
            } else {
                fill("grey");
            }

            rect(x * side, y * side, side, side);
        }
    }  
}

socket.on('send matrix', draw);

