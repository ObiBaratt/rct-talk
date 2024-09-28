function sayHi() {
  console.log("Hello, World!");
  alert("Hello, World!");
}

function getFirstElementByText(text, caseSensitive = true) {
  // returns element or null
  const allElements = document.querySelectorAll("*");
  if (caseSensitive) {
    return allElements.find((element) => element.textContent.trim() === text);
  } else {
    return allElements.find(
      (element) =>
        element.textContent.trim().toLowerCase() === text.toLowerCase()
    );
  }
}

function getAllElementsThatIncludeText(text, caseSenitive = true) {
  const allElements = document.querySelectorAll("*");
  const elements = [];
  for (const element of allElements) {
    if (element.children.length > 0) {
      continue;
    }

    if (caseSenitive) {
      if (element.textContent.trim().includes(text)) {
        elements.push(element);
      }
    } else if (
      element.textContent.trim().toLowerCase().includes(text.toLowerCase())
    ) {
      elements.push(element);
    }
  }
  return elements;
}

function getHiddenImgs() {
  const hiddenImgs = document.getElementsByClassName("section-image");
  return Array.from(hiddenImgs);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function removeClassFromElements(elements, className) {
  elements.forEach((element) => {
    removeClass(element, className);
  });
}

function addClassToElement(element, className) {
  element.classList.add(className);
}

function addClassToElements(elements, className) {
  elements.forEach((element) => {
    addClassToElement(element, className);
  });
}

function getCurrentSelection() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  return range;
}

function createElementAtPosition(position, element) {
  position.insertNode(element);
}

function createNewElement(elementType) {
  return document.createElement(elementType);
}

function appendElementToElement(element, elementToAppend) {
  element.appendChild(elementToAppend);
}

const slideableContent = document.getElementById("slideable-content");
const toggleButton = document.getElementById("toggle-button");

toggleButton.addEventListener("click", () => {
  if (slideableContent.classList.contains("hidden")) {
    slideableContent.classList.remove("hidden");
    // Force a reflow to ensure the 'hidden' removal is rendered
    void slideableContent.offsetWidth;
    slideableContent.classList.add("shown");
    document.body.classList.add("dimmed");
  } else {
    slideableContent.classList.remove("shown");
    document.body.classList.remove("dimmed");
    setTimeout(() => {
      slideableContent.classList.add("hidden");
    }, 300);
  }
});

document.addEventListener("click", (event) => {
  if (
    slideableContent.classList.contains("shown") &&
    !slideableContent.contains(event.target) &&
    event.target !== toggleButton
  ) {
    // Check if the click is NOT on the button
    slideableContent.classList.remove("shown");
    document.body.classList.remove("dimmed");
    setTimeout(() => {
      slideableContent.classList.add("hidden");
    }, 300);
  }
});

function fadeToggle(element, duration = 300) {
  if (element.style.opacity === "1" || element.style.opacity === "") {
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
      opacity -= 0.1;
      element.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(fadeOutInterval);
        element.style.display = "none";
      }
    }, duration / 10);
  } else {
    element.style.display = "block";
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
      opacity += 0.1;
      element.style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(fadeInInterval);
      }
    }, duration / 10);
  }
}

function fade(element, duration = 500) {
  const isVisible =
    element.style.opacity === "1" || element.style.opacity === "";
  element.style.transition = `opacity ${duration}ms ease`;
  if (isVisible) {
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.display = "none";
    }, duration);
  } else {
    element.style.display = "block";
    element.offsetWidth;
    element.style.opacity = 1;
  }
}

const tasks = getAllElementsThatIncludeText("task", false);
