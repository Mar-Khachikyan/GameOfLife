class Grass {

    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.multiplay = 0;

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

    chooseCell(charecter) {
        var found = [];

        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == charecter) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    mul() {
        this.multiplay++;

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (this.multiplay >= 8 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.id;

            var newGrass = new Grass(newX, newY, this.id);
            grassArr.push(newGrass);

            this.multiplay = 0;
        }
    }



}