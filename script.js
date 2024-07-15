let unitCount = 5;
let unitType = "p";
let plainText = false;

function refreshContent() {
  let outputElement = document.getElementById("content");

  if (unitType == "p") {
    paragraphFill(outputElement, unitCount);
  } else if (unitType == "s") {
    sentenceFill(outputElement, unitCount);
  }
}

let btnGenerate = document.getElementById("generate-text");
btnGenerate.addEventListener("click", refreshContent);
fakeTextGeneratorSettings.paragraphMinLength = 10;
fakeTextGeneratorSettings.paragraphMaxLength = 15;
fakeTextGeneratorSettings.sentenceMinLength = 8;
fakeTextGeneratorSettings.sentenceMaxLength = 15;
refreshContent();
