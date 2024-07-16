let generationMode = "normal";
let generationSubMode = "paragraphs";
let generationSettings = {
  sentenceCount: 5,
  paragraphCount: 3,
  paragraphMinLength: 6,
  paragraphMaxLength: 10,
  sentenceMinLength: 9,
  sentenceMaxLength: 15,
};
let webPreviewMode = true;

// Elements references
let outputElement = document.getElementById("content");
let interface = document.getElementById("interface");
let btnRegenerate = document.getElementById("btnRegenerate");
let btnAppend = document.getElementById("btnAppend");
let btnPrepend = document.getElementById("btnPrepend");
let selGenerationMode = document.getElementById("selGenerationMode");
let divGenerationMode = document.getElementById("divGenerationSubMode");
let subModesSelects = document.querySelectorAll(
  "#interface #divGenerationSubMode select"
);
let inputParagraphCount = document.querySelector(
  "#interface #numParagraphCount"
);
let inputSentenceCount = document.querySelector("#interface #numSentenceCount");
let inputParagraphMinLength = document.querySelector(
  "#interface #numParagraphMinLength"
);
let inputParagraphMaxLength = document.querySelector(
  "#interface #numParagraphMaxLength"
);

let inputSentenceMinLength = document.querySelector(
  "#interface #numSentenceMinLength"
);
let inputSentenceMaxLength = document.querySelector(
  "#interface #numSentenceMaxLength"
);

// Functions
function loadDefaultSettingsUI() {
  let {
    paragraphCount,
    sentenceCount,
    paragraphMinLength,
    paragraphMaxLength,
    sentenceMinLength,
    sentenceMaxLength,
  } = generationSettings;
  // Load default settings into UI
  inputParagraphCount.value = paragraphCount;
  inputSentenceCount.value = sentenceCount;
  inputParagraphMinLength.value = paragraphMinLength;
  inputParagraphMaxLength.value = paragraphMaxLength;
  inputSentenceMinLength.value = sentenceMinLength;
  inputSentenceMaxLength.value = sentenceMaxLength;
}

function detectSettingsFromUI() {
  generationSettings.paragraphCount = inputParagraphCount.value;
  generationSettings.sentenceCount = inputSentenceCount.value;
  generationSettings.paragraphMinLength = inputParagraphMinLength.value;
  generationSettings.paragraphMaxLength = inputParagraphMaxLength.value;
  generationSettings.sentenceMinLength = inputSentenceMinLength.value;
  generationSettings.sentenceMaxLength = inputSentenceMaxLength.value;
}

function generateContent(mode = "u") {
  let webPreviewModeHistory = webPreviewMode;
  if (!webPreviewMode) {
    toggleFormat();
  }

  if (generationMode == "normal") {
    if (generationSubMode == "paragraphs") {
      paragraphFill(
        outputElement,
        mode,
        generationSettings.paragraphCount,
        [],
        ["p"],
        generationSettings
      );
    } else if (generationSubMode == "sentences") {
      console.log(generationSettings.sentenceCount);
      sentenceFill(
        outputElement,
        mode,
        generationSettings.sentenceCount,
        ["p"],
        [],
        generationSettings
      );
    }
  } else if (generationMode == "list") {
    if (generationSubMode == "ol-s") {
      sentenceFill(
        outputElement,
        mode,
        blockCount,
        ["ol"],
        ["li"],
        generationSettings
      );
    } else if (generationSubMode == "ul-s") {
      sentenceFill(
        outputElement,
        mode,
        blockCount,
        ["ul"],
        ["li"],
        generationSettings
      );
    } else if (generationSubMode == "ol-p") {
      paragraphFill(
        outputElement,
        mode,
        blockCount,
        ["ol"],
        ["li", "p"],
        generationSettings
      );
    } else if (generationSubMode == "ul-p") {
      paragraphFill(
        outputElement,
        mode,
        blockCount,
        ["ul"],
        ["li", "p"],
        generationSettings
      );
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

// Event listeners
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

// Intervals
setInterval(detectSettingsFromUI, 250);

// Initial setup
generateContent("u");
loadDefaultSettingsUI();
