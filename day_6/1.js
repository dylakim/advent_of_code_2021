const { readFile, csvToArray } = require('../utils');

const data = csvToArray(readFile(__dirname, 0));
const days = 80;

for (let i = 0; i < days; i++) {
    data.forEach((fish, index) => {
        if (typeof fish === 'string') fish = parseInt(fish);
        if (!fish) {
            fish = 6;
            data.push(8);
        } else {
            fish -= 1;
        }
        data[index] = fish;
    });
}

const answer = data.length;
console.log(answer);