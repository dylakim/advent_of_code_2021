const util = require('util');
const { splitLines, readFile } = require('../utils');

const data = splitLines(readFile(__dirname, 0));
class BingoCard {
    constructor (rows) {
        this.rows = rows;
        this.rowMatches = {};
        this.columnMatches = {};
        this.winningBingoBall = null;
        this.turnsToWin = null;
    }
}

const bingoBalls = csvToArray(data.splice(0, 1));
const bingoCards = getBingoCards(data);
let cardWithSlowestWin = null;


// loop through each bingo card
Object.values(bingoCards).forEach(({ rows }, cardIndex) => {
    // for each bingo ball
    // play bingo balls until there is a bingo
    for (const [ballIndex, ball] of bingoBalls.entries()) {
        let bingo = false;
        for (const [rowIndex, row] of rows.entries()) {
            // check if there is a match in each row array. 
            const matchIndex = row.indexOf(ball);
            // if there is, record the row number and column number
                // rowMatches: { 1: [2, 3] }
                // columnMatches: {2: [1], 3: [1]}
            if (matchIndex >= 0) {
                let currRowMatches = bingoCards[cardIndex].rowMatches[rowIndex] || [];
                currRowMatches.push(matchIndex);
                bingoCards[cardIndex].rowMatches[rowIndex] = currRowMatches;
                
                let currColumnMatches = bingoCards[cardIndex].columnMatches[matchIndex] || [];
                currColumnMatches.push(rowIndex);
                bingoCards[cardIndex].columnMatches[matchIndex] = currColumnMatches;

                // when recording a match, check the total number of matches in that row and column to see if the current bingo ball produced a bingo win
                if (currRowMatches.length === 5 || currColumnMatches.length === 5) {
                    bingo = true;
                }
                break;
            }
        }

        // record the current bingo ball index to get number of turns to win
        if (bingo) {
            bingoCards[cardIndex].winningBingoBall = ball;
            bingoCards[cardIndex].turnsToWin = ballIndex;
            
            if (cardWithSlowestWin === null || bingoCards[cardWithSlowestWin].turnsToWin < bingoCards[cardIndex].turnsToWin) {
                cardWithSlowestWin = cardIndex;
            }
            break;
        }
    }
});

// after all bingo cards have been played, find the card with the lowest number of turns to win
// take the winning card. loop (reduce) through each row sum up numbers not in the rowMatches array
// sum all rows sums to get total sum
const winningCard = bingoCards[cardWithSlowestWin];
let sumOfNonMatchedNums = 0;

winningCard.rows.forEach((row, rowIndex) => {
    sumOfNonMatchedNums += row.reduce((acc, curr, index) => {
        if (winningCard.rowMatches[rowIndex]?.indexOf(index) === undefined || winningCard.rowMatches[rowIndex].indexOf(index) < 0) acc += parseInt(curr);
        return acc;
    }, 0);
});

console.log('answer', sumOfNonMatchedNums * winningCard.winningBingoBall);


// multiply the bingoCard sum with the bingo ball at the winning index for the card
// console.log(util.inspect(bingoCards, false, 100));

function csvToArray (string) {
    return string[0].split(',');
}

function getBingoCards (data) {
    const cards = {};
    while (data.length > 0) {
        let card = data.splice(0, 6);
        card.splice(0,1);
        card = card.map(r => r.split(' ').filter(n => n));
        cards[Object.keys(cards).length] = new BingoCard(card);
    }
    return cards;
}