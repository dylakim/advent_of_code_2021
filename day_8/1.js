const { csvToArray, readFile } = require('../utils');

const data = csvToArray(readFile(__dirname, 0)).map(Number);
