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
  divGenerationMode.dataset.genmode = selGenerationMode.value;
  let query = "#interface #divGenerationSubMode";
  if (generationMode == "normal") {
    generationSubMode = document.querySelector(
      query + " #selNormalSubMode"
    ).value;
  } else {
    generationSubMode = "";
  }
});

subModesSelects.forEach((subModeSelect) => {
  console.log(subModeSelect);
  subModeSelect.addEventListener("change", (e) => {
    generationSubMode = e.target.value;
    console.log("e");
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
