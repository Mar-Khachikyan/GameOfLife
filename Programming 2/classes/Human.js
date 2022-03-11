class Human {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.energy = 12;
        this.getNewCoordinates();
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell() {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }


    move() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (this.energy > 0 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.id;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
        this.die();
    }


    eat() {
        var emptyCells = this.chooseCell();

        for (var i in emptyCells) {
            var newX = emptyCells[i][0];
            var newY = emptyCells[i][1];

            if (matrix[newY][newX] == 1) {
                this.deleteObject(grassArr, newX, newY);
                matrix[newY][newX] = 0;
                this.energy++;
            } else if (matrix[newY][newX] == 2) {
                this.deleteObject(grassEaterArr, newX, newY);
                matrix[newY][newX] = 0;
                this.energy++;
            } else if (this.energy >= 8 && matrix[newY][newX] == 3) {
                this.deleteObject(predatorArr, newX, newY);
                matrix[newY][newX] = 0;
                this.energy++;
            }
           
        }
        this.move();
        
    }

    deleteObject(arr, x, y) {
        for (var i in arr) {
            if (arr[i].x == x && arr[i].y == y) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in humanArr) {
                if (humanArr[i].x == this.x && humanArr[i].y == this.y) {
                    humanArr.splice(i, 1);
                    break;
                }
            }
        }
    }

}