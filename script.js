function refreshContent() {
  let outputElement = document.getElementById("content");

  outputElement.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    let paragraphElement = document.createElement("p");
    paragraphElement.innerHTML = randomFakeParagraph(7, 18);
    outputElement.append(paragraphElement);
  }
}

let btnGenerate = document.getElementById("generate-text");
btnGenerate.addEventListener("click", refreshContent);
refreshContent();
