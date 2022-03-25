let LivingCreature = require('./LivingCreature');

module.exports = class Grass extends LivingCreature{

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