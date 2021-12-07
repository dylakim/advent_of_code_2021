const { readFile, csvToArray } = require('../utils');

const data = csvToArray(readFile(__dirname, 0));
const days = 256;
const fishCounter = [];

for (let i = 0; i <= 8; i++) {
    fishCounter.push(0);
}

data.forEach((fish) => {
    fishCounter[fish] += 1;
});

for (let i = 0; i < days; i++) {
    const producing = fishCounter.shift();
    fishCounter[6] += producing;
    fishCounter.push(producing);
}

answer = fishCounter.reduce((acc, curr) => acc += curr);
console.log('answer', answer);