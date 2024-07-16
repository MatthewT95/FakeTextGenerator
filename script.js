let generationMode = "normal";
let generationSubMode = "paragraphs";
let blockCount = 3;

let webPreviewMode = true;
let outputElement = document.getElementById("content");

function generateContent(mode = "u") {
  let webPreviewModeHistory = webPreviewMode;
  if (!webPreviewMode) {
    toggleFormat();
  }

  if (generationMode == "normal") {
    if (generationSubMode == "paragraphs") {
      paragraphFill(outputElement, mode, blockCount, [], ["p"]);
    } else if (generationSubMode == "sentences") {
      sentenceFill(outputElement, mode, blockCount, ["p"], []);
    }
  } else if (generationMode == "list") {
    if (generationSubMode == "ol-s") {
      sentenceFill(outputElement, mode, blockCount, ["ol"], ["li"]);
    } else if (generationSubMode == "ul-s") {
      sentenceFill(outputElement, mode, blockCount, ["ul"], ["li"]);
    } else if (generationSubMode == "ol-p") {
      paragraphFill(outputElement, mode, blockCount, ["ol"], ["li", "p"]);
    } else if (generationSubMode == "ul-p") {
      paragraphFill(outputElement, mode, blockCount, ["ul"], ["li", "p"]);
    }
  } else {
    outputElement.innerHTML = "";
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

let interface = document.getElementById("interface");
let btnRegenerate = document.getElementById("btnRegenerate");
let btnAppend = document.getElementById("btnAppend");
let btnPrepend = document.getElementById("btnPrepend");
let selGenerationMode = document.getElementById("selGenerationMode");
let divGenerationMode = document.getElementById("divGenerationSubMode");
let subModesSelects = document.querySelectorAll(
  "#interface #divGenerationSubMode select"
);
selGenerationMode.addEventListener("change", () => {
  generationMode = selGenerationMode.value;
  interface.dataset.genMode = selGenerationMode.value;
  let query = "#interface #divGenerationSubMode";
  if (generationMode == "normal") {
    generationSubMode = document.querySelector(
      query + " #selNormalSubMode"
    ).value;
  } else if (generationMode == "list") {
    generationSubMode = document.querySelector(
      query + " #selListSubMode"
    ).value;
  } else {
    generationSubMode = "";
  }
  interface.dataset.genSubMode = generationSubMode;
});

subModesSelects.forEach((subModeSelect) => {
  subModeSelect.addEventListener("change", (e) => {
    generationSubMode = e.target.value;
    interface.dataset.genSubMode = e.target.value;
  });
});

btnRegenerate.addEventListener("click", () => generateContent("u"));
btnAppend.addEventListener("click", () => generateContent("a"));
btnPrepend.addEventListener("click", () => generateContent("p"));

fakeTextGeneratorSettings.paragraphMinLength = 10;
fakeTextGeneratorSettings.paragraphMaxLength = 15;
fakeTextGeneratorSettings.sentenceMinLength = 8;
fakeTextGeneratorSettings.sentenceMaxLength = 15;
generateContent("u");
