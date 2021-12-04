const { splitLines, readFile, binaryToDecimal, findMostCommon, findLeastCommon } = require('../utils');

const data = splitLines(readFile(__dirname));

const decodeArray = getBitPositions(data);
const { gammaRateBinary, epsilonRateBinary } = calculateRates(decodeArray);
const powerConsumption = binaryToDecimal(gammaRateBinary) * binaryToDecimal(epsilonRateBinary);
console.log(powerConsumption);

function countBits (arr) {
    return arr.reduce((acc, curr) => {
        acc[parseInt(curr)] += 1;
        return acc;
    }, [0, 0]);
}

function getBitPositions (data) {
    const arr = [];
    data.forEach((line) => {
        for (let i = 0; i < line.length; i++) {
            if (!arr[i]) arr.push([]);
            arr[i].push(line.charAt(i));
        }
    });
    return arr;
}

function calculateRates (arr) {
    const rates = {
        gammaRateBinary: '',
        epsilonRateBinary: '',
    };

    arr.forEach((bitArr) => {
        const bitCounts = countBits(bitArr);
        rates.gammaRateBinary += findMostCommon(bitCounts);
        rates.epsilonRateBinary += findLeastCommon(bitCounts)
    });

    return rates;
}
