// Globals
let minWordLength = 1;
let maxWordLength = 9;
let wordLengthFrequencies = {
  1: 1,
  2: 3,
  3: 4,
  4: 8,
  5: 6,
  6: 3,
  7: 2,
  8: 1,
  9: 1,
};

let wordLengthDistributed = [];
let randomWordLengthIndex = 0;

// Functions
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

function generateWordLengthDistributed() {
  // loop over all word lengths
  for (let i = minWordLength; i <= maxWordLength; i++) {
    // add word length value to disturbed array 4 times the frequency
    for (let j = 0; j < wordLengthFrequencies[i.toString()] * 4; j++) {
      wordLengthDistributed.push(i);
    }
  }
  shuffle(wordLengthDistributed);
}

function randomWordLength() {
  let length = wordLengthDistributed[randomWordLengthIndex];
  randomWordLengthIndex++;
  if (randomWordLengthIndex >= wordLengthDistributed.length) {
    randomWordLengthIndex = 0;
    shuffle(wordLengthDistributed);
  }
  return length;
}

// Main code
generateWordLengthDistributed();
