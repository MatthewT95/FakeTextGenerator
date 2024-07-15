let unitCount = 5;
let unitType = "s";
let webPreviewMode = true;
let outputElement = document.getElementById("content");

function regenerateAllContent() {
  let webPreviewModeHistory = webPreviewMode;
  if (!webPreviewMode) {
    toggleFormat();
  }

  if (unitType == "p") {
    paragraphFill(outputElement, "u", unitCount, [], ["p"]);
  } else if (unitType == "s") {
    sentenceFill(outputElement, "u", unitCount, ["p"], []);
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
  if (unitType == "p") {
    paragraphFill(outputElement, "a", unitCount, [], ["p"]);
  } else if (unitType == "s") {
    sentenceFill(outputElement, "a", unitCount, ["p"], []);
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
  if (unitType == "p") {
    paragraphFill(outputElement, "p", unitCount, [], ["p"]);
  } else if (unitType == "s") {
    sentenceFill(outputElement, "p", unitCount, ["p"], []);
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

btnRegenerate.addEventListener("click", regenerateAllContent);
btnAppend.addEventListener("click", appendContent);
btnPrepend.addEventListener("click", prependContent);

fakeTextGeneratorSettings.paragraphMinLength = 10;
fakeTextGeneratorSettings.paragraphMaxLength = 15;
fakeTextGeneratorSettings.sentenceMinLength = 8;
fakeTextGeneratorSettings.sentenceMaxLength = 15;
regenerateAllContent();
