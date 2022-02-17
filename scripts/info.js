const nameContainer = document.getElementById("nameContainer");
let nameInputs;

function makeNameInputs(quantity) {
  for (let i = 0; i < quantity; i++) {
    makeNameInput();
  }
  nameInputs = nameContainer.children;
}

function makeNameInput() {
  const nameInput = document.createElement("div");
  nameInput.classList.add("nameField");
  nameInput.contentEditable = true;
  nameContainer.appendChild(nameInput);
}

function limitNameLength() {
  [...nameInputs].forEach((nameInput) => {
    const observer = new MutationObserver(() => {
      var len = nameInput.innerHTML.length;
      if (len > 10) {
        nameInput.innerHTML = nameInput.innerHTML.substr(0, len - 1);
      }
    });
    observer.observe(nameInput, { characterData: true, subtree: true });
  });
}

function assignColors() {
  for (let i = 0; i < colors.length; i++) {
    nameInputs[i].style.color = colors[i];
  }
}

function resetNameInputs() {
  [...nameInputs].forEach((nameInput) => {
    nameInput.innerHTML = "";
    nameInput.style.color = "white";
    nameInput.classList.remove("disabledNameInput");
    nameInput.contentEditable = true;
  });
}

function disableNameInputs() {
  [...nameInputs].forEach((nameInput) => {
    nameInput.classList.add("disabledNameInput");
    nameInput.contentEditable = false;
  });
}

function getPlayerNames() {
  const playerNames = [];
  for (let i = 0; i < nameInputs.length; i++) {
    if (nameInputs[i].innerHTML === "") {
      continue;
    }
    playerNames.push(nameInputs[i].innerHTML);
  }
  return playerNames;
}

function validatePlayerNames(names) {
  if (!checkLength(names[0])) {
    return false;
  }
  for (let i = 0; i < names.length; i++) {
    if (names[i].length === 0) {
      continue;
    }
    if (!(checkLength(names[i], i + 1) && checkLetters(names[i], i + 1))) {
      return false;
    }
  }
  return true;
}

function checkLetters(name) {
  const letters = /^[A-Za-z]+$/;
  if (letters.test(name)) {
    return true;
  }
  showError("Someone's name has invalid characters");
  return false;
}

function checkLength(name) {
  if (name.length >= 3) {
    return true;
  }
  showError("Someone's name is too short");
  return false;
}

function getFirstName() {
  return nameInputs[0].innerHTML;
}
