function generateHTMLContent(
  dimensions = [3],
  tagWrappings = [["p"]],
  type = "p",
  genSettings = {}
) {
  let generatedHTML = "";
  if (tagWrappings.length != dimensions.length) {
    console.log(
      "tagWrappings array length does not match dimensions array length"
    );
    return "";
  }

  let {
    paragraphMinLength,
    paragraphMaxLength,
    sentenceMinLength,
    sentenceMaxLength,
  } = genSettings;

  if (tagWrappings.length == 1) {
    for (let i = 0; i < dimensions[0]; i++) {
      let currentWarping = tagWrappings[0];
      // Generate opening tags
      for (let j = 0; j < currentWarping.length; j++) {
        generatedHTML += "<" + currentWarping[j] + ">";
      }
      // Generate text
      if (type == "p") {
        generatedHTML += generateFakeParagraph(
          paragraphMinLength,
          paragraphMaxLength,
          sentenceMinLength,
          sentenceMaxLength
        );
      } else if (type == "s") {
        generatedHTML += generateFakeSentence(
          sentenceMinLength,
          sentenceMaxLength
        );
      }
      // Generate closing tags
      for (let j = currentWarping.length - 1; j >= 0; j--) {
        generatedHTML += "</" + currentWarping[j] + ">";
      }
    }
  } else {
    // Create recursive copy pruning current level
    let dimensionsCopy = dimensions.splice(1, dimensions.length - 1);
    let tagWrappingsCopy = tagWrappings.splice(1, tagWrappings.length - 1);
    console.log(dimensions.length, dimensionsCopy.length);
    // Recursively generate content
    for (let i = 0; i < dimensions[0]; i++) {
      let currentWarping = tagWrappings[0];
      // Generate opening tags
      for (let j = 0; j < currentWarping.length; j++) {
        generatedHTML += "<" + currentWarping[j] + ">";
      }
      generatedHTML += generateHTMLContent(
        dimensionsCopy,
        tagWrappingsCopy,
        type,
        genSettings
      );
      // Generate closing tags
      for (let j = currentWarping.length - 1; j >= 0; j--) {
        generatedHTML += "</" + currentWarping[j] + ">";
      }
    }
  }
  return generatedHTML;
}
