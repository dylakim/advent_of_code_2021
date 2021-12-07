const { csvToArray, readFile } = require('../utils');

const data = csvToArray(readFile(__dirname, 0)).map(Number);
const posCount = {};

data.forEach((crab) => {
    if (!posCount[crab]) {
        posCount[crab] = 1
    }
    else {
        posCount[crab] += 1;
    }
});

let fuelUsed = null;
Object.keys(posCount).forEach((pos) => {
    let testFuel = 0;
    for (let i = 0; i < data.length; i++) {
        testFuel += Math.abs(data[i] - pos);
        if (fuelUsed && fuelUsed < testFuel) break;
    }

    if (!fuelUsed || fuelUsed > testFuel) fuelUsed = testFuel;
})

console.log(fuelUsed);
