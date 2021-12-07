const fs = require('fs');
const path = require('path');

function readFile (dirname, isTest) {
    return fs.readFileSync(path.join(dirname, isTest ? 'test.txt' : 'input.txt'), 'utf-8');
}

function splitLines (data) {
    return data.split(/\r?\n/);
}

function binaryToDecimal(binary) {
    return parseInt(binary, 2);
}

function findMostCommon (x) {
    return x[0] <= x[1] ? 1 : 0;
}

function findLeastCommon (x) {
    return (x[0] === x[1]) ? 0 : (x[0] < x[1] ? 0 : 1);
}

function csvToArray (string) {
    return string.split(',');
}

module.exports = {
    readFile,
    splitLines,
    binaryToDecimal,
    findMostCommon,
    findLeastCommon,
    csvToArray,
};
