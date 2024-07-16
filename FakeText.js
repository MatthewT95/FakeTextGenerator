// Globals
let minWordLength = 1;
let maxWordLength = 9;
let wordLengthFrequencies = {
  1: 1,
  2: 3,
  3: 3,
  4: 9,
  5: 7,
  6: 4,
  7: 2,
  8: 1,
  9: 1,
};

let firstLetterASCII = 97;
let lastLetterASCII = 122;
let letterFrequencies = {
  a: 12,
  b: 4,
  c: 5,
  d: 3,
  e: 3,
  f: 4,
  g: 2,
  h: 4,
  i: 7,
  j: 1,
  k: 1,
  l: 2,
  m: 4,
  n: 2,
  o: 8,
  p: 4,
  q: 1,
  r: 3,
  s: 7,
  t: 16,
  u: 1,
  v: 1,
  w: 6,
  x: 1,
  y: 1,
  z: 1,
};

let wordBank = [];
let fakeTextGeneratorSettings = {
  wordBankSize: 350,
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
  if (print) console.log("minV", minV);
  let out = Math.floor(Math.random() * (maxV - minV + 1) + minV);
  if (print)
    console.log(
      "v",
      out,
      Math.floor(0 * (maxV - minV + 1) + minV),
      Math.floor(1 * (maxV - minV + 1) + minV)
    );
  if (out > maxV) console.log("k");
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

function generateFakeSentence(sentenceMinLength = 10, sentenceMaxLength = 16) {
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
  sentence += ". ";
  return sentence;
}

function generateFakeParagraph(
  paragraphMinLength = 6,
  paragraphMaxLength = 9,
  sentenceMinLength = 10,
  sentenceMaxLength = 16
) {
  let paragraph = "";
  //console.log(paragraphMinLength, paragraphMaxLength);
  let sentenceCount = getRandomIntInclusive(
    paragraphMinLength,
    paragraphMaxLength
  );
  console.log("b", sentenceCount);
  for (let i = 0; i < sentenceCount; i++) {
    paragraph += generateFakeSentence(sentenceMinLength, sentenceMaxLength);
  }
  return paragraph;
}
// Main code
generateWordLengthDistributed();
generateLetterDistributed();
generateWordBank();
