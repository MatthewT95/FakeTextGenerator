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

function randomFakeWord(capitalize = false) {
  let wordLength = randomWordLength();
  let word = "";

  for (let i = 0; i < wordLength; i++) {
    word += randomLetter();
  }

  if (capitalize) {
    word = word[0].toUpperCase() + word.slice(1, word.length);
  }

  return word;
}

let noisePosition = 0;

function randomFakeSentence(minWordCount = 10, maxWordCount = 16) {
  let sentence = "";
  let wordCount =
    Math.ceil(Math.random() * (maxWordCount - minWordCount)) + minWordCount;
  for (let i = 0; i < wordCount; i++) {
    sentence += randomFakeWord(i == 0);
    if (i < wordCount - 1) {
      sentence += " ";
    }
  }
  sentence += ". ";
  return sentence;
}

function randomFakeParagraph(minSentenceCount = 6, maxSentenceCount = 9) {
  let paragraph = "";
  let sentenceCount =
    Math.ceil(Math.random() * (minSentenceCount - maxSentenceCount)) +
    maxSentenceCount;
  for (let i = 0; i < sentenceCount; i++) {
    paragraph += randomFakeSentence();
  }
  return paragraph;
}

// Main code
generateWordLengthDistributed();
generateLetterDistributed();

let outputElement = document.getElementById("content");

for (let i = 0; i < 5; i++) {
  let paragraphElement = document.createElement("p");
  paragraphElement.innerText = randomFakeParagraph(7, 18);
  outputElement.append(paragraphElement);
}
