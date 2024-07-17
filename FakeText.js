// Globals
let minWordLength = 1;
let maxWordLength = 12;
let wordLengthFrequencies = {
  1: 11,
  2: 26,
  3: 49,
  4: 71,
  5: 81,
  6: 71,
  7: 49,
  8: 26,
  9: 11,
  10: 4,
  11: 1,
  12: 1,
};

let firstLetterASCII = 97;
let lastLetterASCII = 122;
let letterFrequencies = {
  a: 31,
  b: 8,
  c: 16,
  d: 15,
  e: 44,
  f: 6,
  g: 12,
  h: 9,
  i: 34,
  j: 1,
  k: 4,
  l: 21,
  m: 11,
  n: 29,
  o: 24,
  p: 11,
  q: 1,
  r: 29,
  s: 35,
  t: 27,
  u: 13,
  v: 4,
  w: 4,
  x: 1,
  y: 6,
  z: 2,
};

let wordBank = [];
let fakeTextGeneratorSettings = {
  wordBankSize: 750,
};

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

// Why does this function not work
function randBetween(minV, maxV, print = false) {
  let out = Math.floor(Math.random() * (maxV - minV + 1) + minV);
  return out;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeWord(word) {
  if (word.length == 1) {
    return word.toUpperCase();
  } else {
    return word[0].toUpperCase() + word.slice(1, word.length);
  }
}

let wordLengthDistributed = [];
let randomWordLengthIndex = 0;

function generateWordLengthDistributed() {
  // loop over all word lengths
  for (let i = minWordLength; i <= maxWordLength; i++) {
    // add word length value to disturbed array 4 times the frequency
    for (let j = 0; j < wordLengthFrequencies[i.toString()]; j++) {
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

let lettersDistributed = [];
let randomLetterIndex = 0;

function generateLetterDistributed() {
  // loop over all word lengths
  for (let i = firstLetterASCII; i <= lastLetterASCII; i++) {
    // add word length value to disturbed array 4 times the frequency
    for (
      let j = 0;
      j < Math.ceil(letterFrequencies[String.fromCharCode(i)]);
      j++
    ) {
      lettersDistributed.push(String.fromCharCode(i));
    }
  }
  shuffle(lettersDistributed);
}

function randomLetter() {
  let letter = lettersDistributed[randomLetterIndex];
  randomLetterIndex++;
  if (randomLetterIndex >= lettersDistributed.length) {
    randomLetterIndex = 0;
    shuffle(lettersDistributed);
  }
  return letter;
}

function randomWordFromBank() {
  let index = getRandomIntInclusive(0, wordBank.length - 1);
  return wordBank[index];
}

function generateFakeWord() {
  let wordLength = randomWordLength();
  let word = "";

  for (let i = 0; i < wordLength; i++) {
    word += randomLetter();
  }

  return word;
}

function generateWordBank() {
  let { wordBankSize } = fakeTextGeneratorSettings;
  clearWordBank();
  for (let i = 0; i < wordBankSize; i++) {
    wordBank.push(generateFakeWord());
  }
}

function clearWordBank() {
  wordBank = [];
}

let noisePosition = 0;

function generateFakeSentence(
  sentenceMinLength = 10,
  sentenceMaxLength = 16,
  period = true
) {
  let sentence = "";
  let wordCount = getRandomIntInclusive(sentenceMinLength, sentenceMaxLength);
  for (let i = 0; i < wordCount; i++) {
    let word = randomWordFromBank();
    if (i == 0) {
      word = capitalizeWord(word);
    }
    sentence += word;
    if (i < wordCount - 1) {
      sentence += " ";
    }
  }
  if (period) sentence += ". ";
  return sentence;
}

function generateFakeParagraph(
  paragraphMinLength = 6,
  paragraphMaxLength = 9,
  sentenceMinLength = 10,
  sentenceMaxLength = 16
) {
  let paragraph = "";
  let sentenceCount = getRandomIntInclusive(
    paragraphMinLength,
    paragraphMaxLength
  );
  for (let i = 0; i < sentenceCount; i++) {
    paragraph += generateFakeSentence(sentenceMinLength, sentenceMaxLength);
  }
  return paragraph;
}
// Main code
generateWordLengthDistributed();
generateLetterDistributed();
generateWordBank();
