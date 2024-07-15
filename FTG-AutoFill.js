function paragraphFill(
  targetElement,
  count = 3,
  tagWrappingsRoot = [],
  tagWrappings = ["p"]
) {
  let openingWrappingRoot = "";
  let closingWrappingRoot = "";
  let openingWrapping = "";
  let closingWrapping = "";

  // Build root opening tags
  for (let i = 0; i < tagWrappings.length; i++) {
    openingWrappingRoot += "<" + tagWrappingsRoot[i] + ">";
  }

  // Build root closing tags
  for (let i = tagWrappings.length - 1; i >= 0; i--) {
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
  targetElement.innerHTML = "";

  // Generate paragraphs in html
  for (let i = 0; i < unitCount; i++) {
    generatedHTML +=
      openingWrapping + generateFakeParagraph() + closingWrapping;
  }

  // output generated html embedded in root tags
  targetElement.innerHTML =
    openingWrappingRoot + generatedHTML + closingWrappingRoot;
}

function sentenceFill(
  targetElement,
  count = 6,
  tagWrappingsRoot = ["p"],
  tagWrappings = []
) {
  targetElement.innerHTML = "";
  let openingWrappingRoot = "";
  let closingWrappingRoot = "";
  let openingWrapping = "";
  let closingWrapping = "";

  // Build root opening tags
  for (let i = 0; i < tagWrappings.length; i++) {
    openingWrappingRoot += "<" + tagWrappingsRoot[i] + ">";
  }

  // Build root closing tags
  for (let i = tagWrappings.length - 1; i >= 0; i--) {
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
  for (let i = 0; i < unitCount; i++) {
    generatedHTML += openingWrapping + generateFakeSentence() + closingWrapping;
  }

  // output generated html embedded in root tags
  targetElement.innerHTML =
    openingWrappingRoot + generatedHTML + closingWrappingRoot;
}
