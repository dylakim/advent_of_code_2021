const shared = require('../shared');

const data = shared.splitLines(shared.readFile(__dirname));

const getThreeMeasWindow = (data) => {
    let newArr = [];

    for (let i = 0; i < (data.length - 2); i++) {
        newArr.push(data[i] + data[i + 1] + data[i + 2]);
    }

    return newArr;
}

const totalIncreases = (data) => {
    return data.reduce((acc, curr, index, data) => {
        return (index > 0 && ((data[index - 1] - curr) < 0)) ? acc + 1 : acc;
    }, 0);
}

const window = getThreeMeasWindow(data);
const answer = totalIncreases(window);
console.log(answer);
