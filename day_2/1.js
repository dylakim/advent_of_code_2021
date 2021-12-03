const shared = require('../shared');

const data = shared.splitLines(shared.readFile(__dirname));

let horizPos = 0;
let depth = 0;

data.forEach((step) => {
    splitStep = step.split(' ');
    switch (splitStep[0]) {
        case 'forward':
            horizPos += parseInt(splitStep[1]);
            break;
        case 'up':
            depth -= parseInt(splitStep[1]);
            break;
        case 'down':
            depth += parseInt(splitStep[1]);
            break;
        default:
            break;
    }
})

console.log('horiz: ', horizPos, 'depth: ', depth);
console.log(horizPos * depth);