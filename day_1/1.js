const { splitLines, readFile } = require('../utils');

const data = splitLines(readFile(__dirname));
const answer = data.reduce((acc, curr, i, arr) => ((i > 0 && ((arr[i - 1] - curr) < 0)) ? acc + 1 : acc), 0);

console.log(answer);
