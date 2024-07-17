function tableFill(targetElement, mode, genSettings = {}) {
  let generatedHTML = "";

  let {
    sentenceMinLength,
    sentenceMaxLength,
    tableRowCount,
    tableColumnCount,
    tableHeadersOn,
  } = genSettings;

  generatedHTML += "<table>";
  if (tableHeadersOn) {
    generatedHTML += "<tr>";
    for (let j = 0; j < tableColumnCount; j++) {
      generatedHTML += "<th>" + generateFakeSentence(1, 3, false) + "</th>";
    }
    generatedHTML += "</tr>";
  }
  // Generate table rows and cells in html
  for (let i = 0; i < tableRowCount; i++) {
    generatedHTML += "<tr>";
    for (let j = 0; j < tableColumnCount; j++) {
      generatedHTML +=
        "<td>" +
        generateFakeSentence(sentenceMinLength, sentenceMaxLength) +
        "</td>";
    }
    generatedHTML += "</tr>";
  }
  generatedHTML += "</table>";

  // output generated html embedded in root tags
  if (mode == "u") {
    targetElement.innerHTML = generatedHTML;
  } else if (mode == "a") {
    targetElement.innerHTML += generatedHTML;
  } else if (mode == "p") {
    targetElement.innerHTML = generatedHTML + targetElement.innerHTML;
  }
}
