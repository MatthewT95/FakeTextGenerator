let unitCount = 7;
let unitType = "p";
let webPreviewMode = true;
let outputElement = document.getElementById("content");

function refreshContent() {
  if (unitType == "p") {
    paragraphFill(outputElement, unitCount, [], ["p"]);
  } else if (unitType == "s") {
    sentenceFill(outputElement, unitCount, ["p"], []);
  }
  webPreviewMode = true;
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

let btnGenerate = document.getElementById("generate-text");
btnGenerate.addEventListener("click", refreshContent);
fakeTextGeneratorSettings.paragraphMinLength = 10;
fakeTextGeneratorSettings.paragraphMaxLength = 15;
fakeTextGeneratorSettings.sentenceMinLength = 8;
fakeTextGeneratorSettings.sentenceMaxLength = 15;
refreshContent();
