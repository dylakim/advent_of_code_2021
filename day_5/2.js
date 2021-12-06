const { splitLines, readFile } = require('../utils');

const data = splitLines(readFile(__dirname, 0));

const vents = data.map(line => line.split(' -> ').map(coord => coord.split(',')));
// const filteredVents = vents.filter(v => (v[0][0] === v[1][0] || v[0][1] === v[1][1]));
const diagram = {};

// For each vent
vents.forEach(vent => {
    // find the direction of movement from start to end points
    // options: horiz, vert, diag
        
    console.log(vent);
    const x1 = parseInt(vent[0][0]);
    const x2 = parseInt(vent[1][0]);
    const y1 = parseInt(vent[0][1]);
    const y2 = parseInt(vent[1][1]);
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;
    // const hasMatch = x1 === x2 || y1 === y2;
    console.log('x diff', xDiff);
    console.log('y diff', yDiff);

    const ventLength = xDiff !== 0 ? Math.abs(xDiff) : Math.abs(yDiff);
    console.log('vent length', ventLength);

    for (let i = 0; i <= ventLength; i++) {
        let coord;
        if (!xDiff) {
            // vert
            coord = [x1, yDiff > 0 ? y1 - i : y1 + i];
        }
        else if (!yDiff) {
            // horiz
            coord = [xDiff > 0 ? x1 - i : x1 + i, y1];
        }
        else {
            // diag
            coord = [xDiff > 0 ? x1 - i : x1 + i , yDiff > 0 ? y1 - i : y1 + i]
        }

        diagram[coord] ? diagram[coord] += 1 : diagram[coord] = 1;
    }
});

// console.log('diagram', diagram);

const answer = Object.values(diagram).reduce((acc, curr) => {
    if (curr >= 2) acc += 1;
    return acc;
}, 0);

console.log('answer', answer);
