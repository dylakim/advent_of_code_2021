const shared = require('../shared');

const data = shared.splitLines(shared.readFile(__dirname));

let horizPos = 0;
let depth = 0;
let aim = 0;

function calculateDirection (step) {
    splitStep = step.split(' ');
    const direction = splitStep[0];
    const x = parseInt(splitStep[1])
    switch (direction) {
        case 'forward':
            horizPos += x;
            if (aim) depth += aim * x;
            break;
        case 'up':
            aim -= x;
            break;
        case 'down':
            aim += x;
            break;
        default:
            break;
    }
}

data.forEach(calculateDirection);

console.log('horiz: ', horizPos, 'depth: ', depth);
console.log(horizPos * depth);
