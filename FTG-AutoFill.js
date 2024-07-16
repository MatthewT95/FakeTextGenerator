function paragraphFill(
  targetElement,
  mode,
  count = 3,
  tagWrappingsRoot = [],
  tagWrappings = ["p"],
  genSettings = {}
) {
  let openingWrappingRoot = "";
  let closingWrappingRoot = "";
  let openingWrapping = "";
  let closingWrapping = "";

  // Build root opening tags
  for (let i = 0; i < tagWrappingsRoot.length; i++) {
    openingWrappingRoot += "<" + tagWrappingsRoot[i] + ">";
  }

  // Build root closing tags
  for (let i = tagWrappingsRoot.length - 1; i >= 0; i--) {
    closingWrappingRoot += "</" + tagWrappingsRoot[i] + ">";
  }

  // Build opening tags
  for (let i = 0; i < tagWrappings.length; i++) {
    openingWrapping += "<" + tagWrappings[i] + ">";
  }

  // Build closing tags
  for (let i = tagWrappings.length - 1; i >= 0; i--) {
    closingWrapping += "</" + tagWrappings[i] + ">";
  }

  let generatedHTML = "";

  let {
    paragraphMinLength,
    paragraphMaxLength,
    sentenceMinLength,
    sentenceMaxLength,
  } = genSettings;
  console.log(
    paragraphMinLength,
    paragraphMaxLength,
    sentenceMinLength,
    sentenceMaxLength
  );
  // Generate paragraphs in html
  for (let i = 0; i < count; i++) {
    generatedHTML +=
      openingWrapping +
      generateFakeParagraph(
        paragraphMinLength,
        paragraphMaxLength,
        sentenceMinLength,
        sentenceMaxLength
      ) +
      closingWrapping;
  }

  // output generated html embedded in root tags
  if (mode == "u") {
    targetElement.innerHTML =
      openingWrappingRoot + generatedHTML + closingWrappingRoot;
  } else if (mode == "a") {
    targetElement.innerHTML +=
      openingWrappingRoot + generatedHTML + closingWrappingRoot;
  } else if (mode == "p") {
    targetElement.innerHTML =
      openingWrappingRoot +
      generatedHTML +
      closingWrappingRoot +
      targetElement.innerHTML;
  }
}

function sentenceFill(
  targetElement,
  mode,
  count = 6,
  tagWrappingsRoot = ["p"],
  tagWrappings = [],
  genSettings = {}
) {
  let openingWrappingRoot = "";
  let closingWrappingRoot = "";
  let openingWrapping = "";
  let closingWrapping = "";
  let { sentenceMinLength, sentenceMaxLength } = genSettings;

  // Build root opening tags
  for (let i = 0; i < tagWrappingsRoot.length; i++) {
    openingWrappingRoot += "<" + tagWrappingsRoot[i] + ">";
  }

  // Build root closing tags
  for (let i = tagWrappingsRoot.length - 1; i >= 0; i--) {
    closingWrappingRoot += "</" + tagWrappingsRoot[i] + ">";
  }

  // Build opening tags
  for (let i = 0; i < tagWrappings.length; i++) {
    openingWrapping += "<" + tagWrappings[i] + ">";
  }

  // Build closing tags
  for (let i = tagWrappings.length - 1; i >= 0; i--) {
    closingWrapping += "</" + tagWrappings[i] + ">";
  }

  // Generate sentences in html
  let generatedHTML = "";
  for (let i = 0; i < count; i++) {
    generatedHTML +=
      openingWrapping +
      generateFakeSentence(sentenceMinLength, sentenceMaxLength) +
      closingWrapping;
  }

  // output generated html embedded in root tags
  if (mode == "u") {
    targetElement.innerHTML =
      openingWrappingRoot + generatedHTML + closingWrappingRoot;
  } else if (mode == "a") {
    targetElement.innerHTML +=
      openingWrappingRoot + generatedHTML + closingWrappingRoot;
  } else if (mode == "p") {
    targetElement.innerHTML =
      openingWrappingRoot +
      generatedHTML +
      closingWrappingRoot +
      targetElement.innerHTML;
  }
}
