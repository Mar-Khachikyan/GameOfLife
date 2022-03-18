var matrix = [];

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var bombArr = [];
var humanArr = [];

var side = 20;

function setup() {
    matrix = generateMatrix(30);
    creatObjects();
    
    frameRate(5);
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
}


function creatObjects() {
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
}


function generateMatrix(size) {
    var newMatrix = [];
    for (var y = 0; y < size; y++) {
        newMatrix[y] = [];
        for (var x = 0; x < size; x++) {
            var randomId = random(100);
            if (randomId < 30) {
                newMatrix[y][x] = 1;
            } else if (randomId < 40) {
                newMatrix[y][x] = 2;
            } else if (randomId < 50) {
                newMatrix[y][x] = 3;
            } else if (randomId < 60) {
                newMatrix[y][x] = 4;
            } else if (randomId < 70) {
                newMatrix[y][x] = 5;
            } else {
                newMatrix[y][x] = 0;
            }
        }
    }
    return newMatrix;
}

