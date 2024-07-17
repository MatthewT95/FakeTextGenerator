function generateFakeHTMLContent(
  dimensions = [3],
  tagWrappings = [["p"]],
  contentTypes = [{ inner: "p" }],
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

      // Generate pre-tag content
      if (typeof contentTypes[0].before !== undefined) {
        if (contentTypes[0].before == "s") {
          generatedHTML += generateFakeSentence(
            sentenceMinLength,
            sentenceMaxLength
          );
        } else if (contentTypes[0].before == "p") {
          generatedHTML += generateFakeParagraph(
            paragraphMinLength,
            paragraphMaxLength,
            sentenceMinLength,
            sentenceMaxLength
          );
        }
      }
      // Generate opening tags
      for (let j = 0; j < currentWarping.length; j++) {
        generatedHTML += "<" + currentWarping[j] + ">";
      }
      // Generate text
      if (contentTypes[0].inner == "p") {
        generatedHTML += generateFakeParagraph(
          paragraphMinLength,
          paragraphMaxLength,
          sentenceMinLength,
          sentenceMaxLength
        );
      } else if (contentTypes[0].inner == "s") {
        generatedHTML += generateFakeSentence(
          sentenceMinLength,
          sentenceMaxLength
        );
      }
      // Generate closing tags
      for (let j = currentWarping.length - 1; j >= 0; j--) {
        generatedHTML += "</" + currentWarping[j] + ">";
      }

      // Generate post-tag content
      if (typeof contentTypes[0].after !== undefined) {
        if (contentTypes[0].after == "s") {
          generatedHTML += generateFakeSentence(
            sentenceMinLength,
            sentenceMaxLength
          );
        } else if (contentTypes[0].after == "p") {
          generatedHTML += generateFakeParagraph(
            paragraphMinLength,
            paragraphMaxLength,
            sentenceMinLength,
            sentenceMaxLength
          );
        }
      }
    }
  } else {
    // Create recursive copy pruning current level
    let dimensionsCopy = dimensions.splice(1, dimensions.length - 1);
    let tagWrappingsCopy = tagWrappings.splice(1, tagWrappings.length - 1);
    let contentTypesCopy = contentTypes.splice(1, contentTypes.length - 1);

    // Recursively generate content
    for (let i = 0; i < dimensions[0]; i++) {
      let currentWarping = tagWrappings[0];
      // Generate pre-tag content
      if (typeof contentTypes[0].before !== undefined) {
        if (contentTypes[0].before == "s") {
          generatedHTML += generateFakeSentence(
            sentenceMinLength,
            sentenceMaxLength
          );
        } else if (contentTypes[0].before == "p") {
          generatedHTML += generateFakeParagraph(
            paragraphMinLength,
            paragraphMaxLength,
            sentenceMinLength,
            sentenceMaxLength
          );
        }
      }

      // Generate opening tags
      for (let j = 0; j < currentWarping.length; j++) {
        generatedHTML += "<" + currentWarping[j] + ">";
      }

      // Generate element header
      if (typeof contentTypes[0].header !== undefined) {
        if (contentTypes[0].header == "s") {
          generatedHTML += generateFakeSentence(
            sentenceMinLength,
            sentenceMaxLength
          );
        } else if (contentTypes[0].header == "p") {
          generatedHTML += generateFakeParagraph(
            paragraphMinLength,
            paragraphMaxLength,
            sentenceMinLength,
            sentenceMaxLength
          );
        }
      }
      generatedHTML += generateFakeHTMLContent(
        dimensionsCopy,
        tagWrappingsCopy,
        contentTypesCopy,
        genSettings
      );

      // Generate element footer
      if (typeof contentTypes[0].footer !== undefined) {
        if (contentTypes[0].footer == "s") {
          generatedHTML += generateFakeSentence(
            sentenceMinLength,
            sentenceMaxLength
          );
        } else if (contentTypes[0].footer == "p") {
          generatedHTML += generateFakeParagraph(
            paragraphMinLength,
            paragraphMaxLength,
            sentenceMinLength,
            sentenceMaxLength
          );
        }
      }

      // Generate closing tags
      for (let j = currentWarping.length - 1; j >= 0; j--) {
        generatedHTML += "</" + currentWarping[j] + ">";
      }

      // Generate post-tag content
      if (typeof contentTypes[0].after !== undefined) {
        if (contentTypes[0].after == "s") {
          generatedHTML += generateFakeSentence(
            sentenceMinLength,
            sentenceMaxLength
          );
        } else if (contentTypes[0].after == "p") {
          generatedHTML += generateFakeParagraph(
            paragraphMinLength,
            paragraphMaxLength,
            sentenceMinLength,
            sentenceMaxLength
          );
        }
      }
    }
  }
  return generatedHTML;
}

function generateFakeHTMLTable(genSettings) {
  let generatedHTML = "";
  let { tableRowCount, tableColumnCount, tableHeadersOn } = genSettings;

  generatedHTML += "<table>";
  if (tableHeadersOn) {
    generatedHTML += generateFakeHTMLContent(
      [1, tableColumnCount],
      [["tr"], ["th"]],
      [{}, { inner: "s" }],
      { sentenceMinLength: 1, sentenceMaxLength: 3 }
    );
  }
  // Generate table rows and cells in html
  generatedHTML += generateFakeHTMLContent(
    [tableRowCount, tableColumnCount],
    [["tr"], ["td"]],
    [{}, { inner: "p" }],
    genSettings
  );
  generatedHTML += "</table>";

  return generatedHTML;
}
