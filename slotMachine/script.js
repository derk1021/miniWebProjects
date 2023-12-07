// 1) Put some money in the slot machine (deposit)
let prompt = require("prompt-sync")(); // Import the module for allowing user prompts

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNTS = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_MULTIPLIER = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

let deposit = () => {
  while (true) {
    let inputDeposit = parseFloat(prompt("Enter your deposit amount: "));

    // Check if the user's input is not a number or <= 0
    if (isNaN(inputDeposit) || inputDeposit <= 0) {
      console.log("Invalid deposit amount, try again!");
    } else {
      return inputDeposit;
    }
  }
};

// 2) Determine the number of lines to bet on (3 rows/lines you can bet on at MAX)
let numLines = () => {
  while (true) {
    let inputLines = parseInt(prompt("Enter the # of lines to bet on (1-3): "));
    if (isNaN(inputLines) || inputLines <= 0 || inputLines > 3) {
      console.log("Invalid # of lines, try again!");
    } else {
      return inputLines;
    }
  }
};

// 3) How much the user is betting on slot machine (collect bet)
let getBet = (balance, getLines) => {
  while (true) {
    let inputBet = parseInt(prompt("Enter your bet per line: "));

    // userInput > balance / getLines because we want to place a correct bet for a SINGLE line
    if (isNaN(inputBet) || inputBet <= 0 || inputBet > balance / getLines) {
      console.log("Invalid bet, try again!");
    } else {
      return inputBet;
    }
  }
};

// 4) Spin the slot machine
/* Idea: 
 Step 1) Generate all the possible symbols based on their counts 
 Step 2) Based on step 1, randomly choose a symbol from all possible symbols 
 Step 3) Store the randomly chosen symbol in each reel and remove it from all possible symbols 
*/
let spin = () => {
  // Step 1
  const symbols = [];

  //   for (const letter in SYMBOL_COUNTS) { // method 1 of iterating through dictionary
  //       for (let i = 0; i < SYMBOL_COUNTS[letter]; i++) {
  for (const [symbol, count] of Object.entries(SYMBOL_COUNTS)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  //   console.log(symbols)

  // Step 2
  reels = [];
  for (let i = 0; i < ROWS; i++) {
    reels.push([]);
    // For each reel (3 total), randomly pick a symbol from a symbols copy
    // We make a copy because upon next iteration, the given reel cannot be duplicated
    // For example: [[A,A,B],[A,A,B],[C,C,C]] -> NOT POSSIBLE
    const reelSymbols = [...symbols];
    for (let j = 0; j < COLS; j++) {
      let reelSymbolIdx = Math.floor(Math.random() * reelSymbols.length);
      const getSymbol = reelSymbols[reelSymbolIdx];
      // Step 3
      reels[i].push(getSymbol);
      // Syntax: array.splice(startIndex, deleteCount), if deleteCount > 1,
      // it means that multiple elements will be removed starting from the specified index
      reelSymbols.splice(reelSymbolIdx, 1);
    }
  }
  //   console.log(reels);
  return reels;
};

// 5) Transpose the columns to rows so we can determine later if rows have all matching symbols
let transpose = (reels) => {
  symbolRows = [];
  for (let i = 0; i < ROWS; i++) {
    symbolRows.push([]);
    for (let j = 0; j < COLS; j++) {
      symbolRows[i].push(reels[j][i]);
    }
  }
  return symbolRows;
};

let printRows = (rows) => {
  for (let row of rows) {
    let rowString = "";
    for (let [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != rows.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// 6) Give the user their winnings
// Checks if there is a winner in every row
let getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  lineCount = 1;
  for (let i = 0; i < rows.length; i++) {
    let sameRow = true;
    for (let j = 0; j < rows[i].length - 1; j++) {
      // Not a winner in the given row
      if (rows[i][j] != rows[i][j + 1]) {
        sameRow = false;
        break;
      }
    }

    // Winner in the given row
    // Add functionality: priority of win amount
    // For example: if we bet 2 lines, but won 3 rows, we get the first 2 greatest amounts as our winnings added
    if (sameRow && lineCount <= lines) {
      winnings += bet * SYMBOL_MULTIPLIER[rows[i][0]];
      lineCount += 1;
    }
  }
  return winnings;
};

let startGame = () => {
  let balance = deposit();
  while (true) {
    console.log("You have have a balance of: $" + balance);
    let amtOfLines = numLines();
    let placeBet = getBet(balance, amtOfLines);
    balance -= placeBet * amtOfLines; // Subtract from balance because we're betting
    let getReels = spin();
    //   console.log(getReels);
    let reelRows = transpose(getReels);
    // let reelRows = transpose([
    //   ["A", "B", "C"],
    //   ["A", "B", "C"],
    //   ["A", "B", "C"],
    // ]);
    printRows(reelRows);
    let profit = getWinnings(reelRows, placeBet, amtOfLines);
    console.log("You won: $" + profit);
    balance += profit; // Add profit to balance

    // 7) Play again
    if (balance <= 0) {
      console.log("You're out of money!");
      break;
    }

    let playAgain = prompt("Do you want to play again? (y/n): ");
    if (playAgain != "y") {
      break;
    }
  }
};

startGame();
