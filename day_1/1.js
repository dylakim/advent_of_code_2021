const shared = require('../shared');

const data = shared.splitLines(shared.readFile(__dirname));

const answer = data.reduce((reducer, curr, index, arr) => {
    if (index > 0 && ((arr[index-1] - curr) < 0)) return reducer + 1;
    return reducer;
}, 0);

console.log(answer);
