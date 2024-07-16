let blockCount = 3;
let blockMode = "p";
let webPreviewMode = true;
let outputElement = document.getElementById("content");

function regenerateAllContent() {
  let webPreviewModeHistory = webPreviewMode;
  if (!webPreviewMode) {
    toggleFormat();
  }

  if (blockMode == "p") {
    paragraphFill(outputElement, "u", blockCount, [], ["p"]);
  } else if (blockMode == "s") {
    sentenceFill(outputElement, "u", blockCount, ["p"], []);
  }

  if (!webPreviewModeHistory) {
    toggleFormat();
  }
}

function appendContent() {
  let webPreviewModeHistory = webPreviewMode;
  if (!webPreviewMode) {
    toggleFormat();
  }
  if (blockMode == "p") {
    paragraphFill(outputElement, "a", blockCount, [], ["p"]);
  } else if (blockMode == "s") {
    sentenceFill(outputElement, "a", blockCount, ["p"], []);
  }

  if (!webPreviewModeHistory) {
    toggleFormat();
  }
}

function prependContent() {
  let webPreviewModeHistory = webPreviewMode;
  if (!webPreviewMode) {
    toggleFormat();
  }
  if (blockMode == "p") {
    paragraphFill(outputElement, "p", blockCount, [], ["p"]);
  } else if (blockMode == "s") {
    sentenceFill(outputElement, "p", blockCount, ["p"], []);
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
let cbBlockType = document.getElementById("cbBlockType");
cbBlockType.addEventListener("change", () => {
  blockMode = cbBlockType.value;
});
let numBlockCount = document.getElementById("numBlockCount");
numBlockCount.addEventListener("change", () => {
  blockCount = numBlockCount.value;
});

btnRegenerate.addEventListener("click", regenerateAllContent);
btnAppend.addEventListener("click", appendContent);
btnPrepend.addEventListener("click", prependContent);

fakeTextGeneratorSettings.paragraphMinLength = 10;
fakeTextGeneratorSettings.paragraphMaxLength = 15;
fakeTextGeneratorSettings.sentenceMinLength = 8;
fakeTextGeneratorSettings.sentenceMaxLength = 15;
regenerateAllContent();
