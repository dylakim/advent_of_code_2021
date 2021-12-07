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

const biggestNumber = data.reduce((acc, curr) => {
    if (acc < curr) return curr;
    return acc;
});

let fuelUsed = null;
for (let x = 0; x < biggestNumber; x++) {
    let testFuel = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 1; j <= Math.abs(data[i] - x); j++) {
            testFuel += j;
        }
        if (fuelUsed && fuelUsed < testFuel) break;
    }
    if (!fuelUsed || fuelUsed > testFuel) fuelUsed = testFuel;
}

console.log(fuelUsed);
