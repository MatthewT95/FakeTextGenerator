const generationModePlainParagraphs = 0;
const generationModePlainSentences = 1;

let generationMode = 0;
let blockCount = 3;
let blockMode = "p";
let webPreviewMode = true;
let outputElement = document.getElementById("content");

function generateContent(mode = "u") {
  let webPreviewModeHistory = webPreviewMode;
  if (!webPreviewMode) {
    toggleFormat();
  }

  if (generationMode == generationModePlainParagraphs) {
    paragraphFill(outputElement, mode, blockCount, [], ["p"]);
  } else if (generationMode == generationModePlainSentences) {
    sentenceFill(outputElement, mode, blockCount, ["p"], []);
  }

  if (!webPreviewModeHistory) {
    toggleFormat();
  }
}

function toggleFormat() {
  if (!webPreviewMode) {
    let htmlVersion = outputElement
      .getElementsByTagName("code")[0]
      .innerHTML.toString();
    htmlVersion = htmlVersion
      .replaceAll("&gt;<br>&lt;", "&gt;&lt;")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">");
    outputElement.innerHTML = htmlVersion;
    webPreviewMode = true;
  } else {
    let HTMLRawVersion = outputElement.innerHTML.toString();
    HTMLRawVersion = HTMLRawVersion.replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("&gt;&lt;", "&gt;<br>&lt;");
    outputElement.innerHTML = "<code>" + HTMLRawVersion + "</code>";
    webPreviewMode = false;
  }
}

let btnRegenerate = document.getElementById("btnRegenerate");
let btnAppend = document.getElementById("btnAppend");
let btnPrepend = document.getElementById("btnPrepend");
let selGenerationMode = document.getElementById("selGenerationMode");
selGenerationMode.addEventListener("change", () => {
  generationMode = selGenerationMode.value;
});

// let cbBlockType = document.getElementById("cbBlockType");
// cbBlockType.addEventListener("change", () => {
//   blockMode = cbBlockType.value;
// });
// let numBlockCount = document.getElementById("numBlockCount");
// numBlockCount.addEventListener("change", () => {
//   blockCount = numBlockCount.value;
// });

btnRegenerate.addEventListener("click", generateContent, "u");
btnAppend.addEventListener("click", generateContent, "a");
btnPrepend.addEventListener("click", generateContent, "p");

fakeTextGeneratorSettings.paragraphMinLength = 10;
fakeTextGeneratorSettings.paragraphMaxLength = 15;
fakeTextGeneratorSettings.sentenceMinLength = 8;
fakeTextGeneratorSettings.sentenceMaxLength = 15;
generateContent("u");
