module.exports = class Bomb extends LivingCreature{

    constructor(x, y, id) {
        super(x,y,id);
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


    eat() {
        var emptyCells = this.chooseCell();
        for (var i in emptyCells) {
            var newX = emptyCells[i][0];
            var newY = emptyCells[i][1];

            if (matrix[newY][newX] == 1) {
                this.deleteObject(grassArr, newX, newY);
            } else if (matrix[newY][newX] == 2) {
                this.deleteObject(grassEaterArr, newX, newY);
            } else if (matrix[newY][newX] == 3) {
                this.deleteObject(predatorArr, newX, newY);
            } else if (matrix[newY][newX] == 4) {
                this.deleteObject(bombArr, newX, newY);
            } else if (matrix[newY][newX] == 5) {
                this.deleteObject(humanArr, newX, newY);
            }
            matrix[newY][newX] = 0;
        }

        this.deleteObject(bombArr, this.x, this.y);
        matrix[this.y][this.x] = 0;
    }

    deleteObject(arr, x, y) {
        for (var i in arr) {
            if (arr[i].x == x && arr[i].y == y) {
                arr.splice(i, 1);
                break;
            }
        }
    }

}