const { splitLines, readFile } = require('../utils');

const data = splitLines(readFile(__dirname, 0));

const vents = data.map(line => line.split(' -> ').map(coord => coord.split(',')));
const filteredVents = vents.filter(v => (v[0][0] === v[1][0] || v[0][1] === v[1][1]));
const diagram = {};

// For each vent
filteredVents.forEach(vent => {
    //  find the matching coordinate
    const xIsMatch = parseInt(vent[0][0]) === parseInt(vent[1][0]);
    let matchingCoord = xIsMatch ? vent[0][0] : vent[0][1];
    let matchingCoordAxis = xIsMatch ? 'x' : 'y';
    const nonMatchingCoordPos = xIsMatch ? 1 : 0;
    const startAndEndPoints = [parseInt(vent[0][nonMatchingCoordPos]), parseInt(vent[1][nonMatchingCoordPos])];
    startAndEndPoints.sort((a, b) => a < b ? -1 : b < a ? 1 : 0);

    // loop x times, where x = the distance between non-matching coords
    for (let i = startAndEndPoints[0]; i <= startAndEndPoints[1]; i++) {
        const coord = matchingCoordAxis === 'x' ? `${matchingCoord}, ${i}` : `${i}, ${matchingCoord}`;

        diagram[coord] ? diagram[coord] += 1 : diagram[coord] = 1;
    }
});

const answer = Object.values(diagram).reduce((acc, curr) => {
    if (curr >= 2) acc += 1;
    return acc;
}, 0);

console.log('answer', answer);
