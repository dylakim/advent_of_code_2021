const shared = require('../shared');

const data = shared.splitLines(shared.readFile(__dirname));

const decodeArray = [];
let gammaRateBinary = '';
let epsilonRateBinary = '';

data.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
        const currBitArr = decodeArray[i];
        if (!currBitArr) decodeArray.push([]);
        const bit = line.charAt(i);
        decodeArray[i].push(bit);
    }
});

decodeArray.forEach((bitArr) => {
    const numOfZeros = bitArr.reduce((acc, curr) => {
        if (curr === '0') acc += 1;
        return acc;
    }, 0);

    gammaRateBinary += (bitArr.length / 2) > numOfZeros ? 1 : 0;
    epsilonRateBinary += (bitArr.length / 2) < numOfZeros ? 1 : 0;
});

const gammaRateDecimal = shared.convertBinaryToDecimal(gammaRateBinary);
const epsilonRateDecimal = shared.convertBinaryToDecimal(epsilonRateBinary);

const powerConsumption = gammaRateDecimal * epsilonRateDecimal;
console.log(powerConsumption);
