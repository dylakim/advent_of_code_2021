const { splitLines, readFile } = require('../utils');

const data = splitLines(readFile(__dirname));

const answer = totalIncreases(getThreeMeasWindow(data));
console.log(answer);


function getThreeMeasWindow (data) {
    let newArr = [];

    for (let i = 0; i < (data.length - 2); i++) {
        newArr.push(data[i] + data[i + 1] + data[i + 2]);
    }

    return newArr;
}

function totalIncreases (data) {
    return data.reduce((acc, curr, i, data) => ((i > 0 && ((data[i - 1] - curr) < 0)) ? acc + 1 : acc), 0);
}
