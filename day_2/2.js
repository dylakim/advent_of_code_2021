const { splitLines, readFile } = require('../utils');

const data = splitLines(readFile(__dirname));

let horizPos = 0;
let depth = 0;
let aim = 0;

data.forEach(calculateDirection);

console.log('horiz: ', horizPos, 'depth: ', depth);
console.log(horizPos * depth);

function calculateDirection (step) {
    [direction, units] = step.split(' ');
    const number = parseInt(units);
    if (direction === 'forward') {
        horizPos += number;
        if (aim) depth += aim * number;
    }
    if (direction === 'up') aim -= number;
    if (direction === 'down') aim += number;
}
