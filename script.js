let unitCount = 3;
let unitType = "p";
let plainText = false;

function refreshContent() {
  let outputElement = document.getElementById("content");

  outputElement.innerHTML = "";

  if (plainText) {
    if (unitType == "p") {
      for (let i = 0; i < unitCount; i++) {
        outputElement.innerHTML += "<p>" + randomFakeParagraph() + "</p>";
      }
    } else if (unitType == "s") {
      let text = "";
      for (let i = 0; i < unitCount; i++) {
        text += randomFakeSentence();
      }
      outputElement.innerHTML = "<p>" + text + "</p>";
    }
  } else {
    if (unitType == "p") {
      for (let i = 0; i < unitCount; i++) {
        outputElement.innerHTML +=
          "&lt;p&gt;<br>" + randomFakeParagraph() + "<br>&lt;/p&gt;<br>";
      }
    } else if (unitType == "s") {
      let text = "";
      for (let i = 0; i < unitCount; i++) {
        text += randomFakeSentence();
      }
      outputElement.innerHTML = "&lt;p&gt;<br>" + text + "<br>&lt;/p&gt;";
    }
  }

  if (!plainText) {
    outputElement.innerHTML = "<code>" + outputElement.innerHTML + "</code>";
  }
}

let btnGenerate = document.getElementById("generate-text");
btnGenerate.addEventListener("click", refreshContent);
fakeTextGeneratorSettings.paragraphMinLength = 10;
fakeTextGeneratorSettings.paragraphMaxLength = 15;
fakeTextGeneratorSettings.sentenceMinLength = 8;
fakeTextGeneratorSettings.sentenceMaxLength = 15;
refreshContent();
