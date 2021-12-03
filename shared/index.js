const fs = require('fs');
const path = require('path');

function readFile (dirname, isTest) {
    return fs.readFileSync(path.join(dirname, isTest ? 'test.txt' : 'input.txt'), 'utf-8');
}

function splitLines (data) {
    return data.split(/\r?\n/);
}

module.exports = {
    readFile,
    splitLines,
};
