const { splitLines, readFile } = require('../utils');

const data = splitLines(readFile(__dirname));

let horizPos = 0;
let depth = 0;

data.forEach((step) => {
    [direction, units] = step.split(' ');
    const number = parseInt(units);
    if (direction === 'forward') horizPos += number;
    if (direction === 'up') depth -= number;
    if (direction === 'down') depth += number;
});

console.log('horiz: ', horizPos, 'depth: ', depth);
console.log(horizPos * depth);