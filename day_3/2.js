const shared = require('../shared');

const data = shared.splitLines(shared.readFile(__dirname));

const numOfBits = data[0].length;
let oxygenGeneratorArray = data;
let c02ScrubberArray = data;

for (let i = 0; i < numOfBits; i++) {
    if (oxygenGeneratorArray.length !== 1) oxygenGeneratorArray = findRatingBinary('oxygen', i);
    if (c02ScrubberArray.length !== 1) c02ScrubberArray = findRatingBinary('c02', i);
}

oxygenGenerator = shared.convertBinaryToDecimal(oxygenGeneratorArray);
c02Scrubber = shared.convertBinaryToDecimal(c02ScrubberArray);

console.log(oxygenGenerator * c02Scrubber);

function findRatingBinary (ratingType, i) {
    const decodeArray = [];
    const ratingArray = ratingType === 'oxygen' ? oxygenGeneratorArray : c02ScrubberArray;

    ratingArray.forEach(n => { decodeArray.push(n[i]) });
    const bitCounts = countBits(decodeArray);
    const commonBit = ratingType === 'oxygen' ? findMostCommon(bitCounts) : findLeastCommon(bitCounts);
    return ratingArray.filter(n => n[i] == commonBit);
}


function countBits (arr) {
    return arr.reduce((acc, curr) => {
        acc[parseInt(curr)] += 1;
        return acc;
    }, [0, 0]);
}

function findMostCommon (x) {
    if (x[0] === x[1]) return 1;
    return x[0] > x[1] ? 0 : 1;
}

function findLeastCommon (x) {
    if (x[0] === x[1]) return 0;
    return x[0] < x[1] ? 0 : 1;
}